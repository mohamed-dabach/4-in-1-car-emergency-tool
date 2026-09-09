/**
 * Google Apps Script — يستقبل طلبات لاندينگ بيج "جهاز الطوارئ 4 فـ1"
 * ويكتبهم فـ Google Sheet.
 *
 * ── التركيب (مرة وحدة) ─────────────────────────────────────────────
 * 1. Google Sheet جديد → Extensions → Apps Script
 * 2. مسح Code.gs كامل ولصق هاد الملف كامل
 * 3. Run → setupSheet   (يخلق التاب، العناوين، القائمة ديال الحالة)
 *    أول مرة غادي يطلب Authorization → Review permissions → Allow
 * 4. Deploy → New deployment → Type: Web app
 *      Execute as:      Me
 *      Who has access:  Anyone
 *    → Deploy → كوبي /exec URL
 * 5. (اختياري ولكن مستحسن) Project Settings → Script Properties →
 *    Add property: ORDERS_SECRET = كلمة سر ديالك
 *    من بعد زيد ?key=كلمة_السر فآخر URL
 * 6. حط URL فـ Vercel: Settings → Environment Variables →
 *    VITE_ORDERS_WEBHOOK = https://script.google.com/.../exec?key=...
 *
 * ⚠️ ملي تبدل الكود: Deploy → Manage deployments → ✏️ → Version: New version
 * ماشي "New deployment" — هادي كتعطي URL جديد وكتحبس الطلبات.
 *
 * ⚠️ إلا زدتي شي عمود جديد (بحال 'ts'): شغّل setupSheet مرة أخرى قبل
 * ما تدير New version، بلا هاد الشي العنوان ديال العمود كيبقى خاوي.
 */

var TAB = 'الطلبات';

var HEADERS = [
  'كود الطلب', // A
  'التاريخ', // B
  'الاسم', // C
  'الهاتف', // D
  'المدينة', // E
  'العنوان', // F
  'المنتج', // G
  'العرض', // H
  'الكمية', // I
  'الثمن', // J
  'المصدر', // K
  'الحالة', // L — كتعمرها أنت باليد
  'ملاحظة', // M — كتعمرها أنت باليد
  'ts', // N — الوقت بالميلي ثانية، كنستعملوه باش نعرفو الطلب المكرر
];

var COL_CODE = 1;
var COL_DATE = 2;
var COL_PHONE = 4;
var COL_PRICE = 10;
var COL_STATUS = 12;
var COL_TS = 14;
var COL_COUNT = HEADERS.length;

/** الحالات ديال الطلب — كيبانو كـ dropdown فعمود L */
var STATUSES = ['جديد', 'مؤكد', 'ما جاوبش', 'ملغي', 'متسلّم', 'مرجّع'];

/** ألوان الحالة باش تبان بسرعة فالشيت */
var STATUS_COLORS = {
  'جديد': { bg: '#e8eaed', fg: '#3c4043' },
  'مؤكد': { bg: '#d9ead3', fg: '#274e13' },
  'ما جاوبش': { bg: '#fff2cc', fg: '#7f6000' },
  'ملغي': { bg: '#f4cccc', fg: '#990000' },
  'متسلّم': { bg: '#c9daf8', fg: '#1c4587' },
  'مرجّع': { bg: '#ead1dc', fg: '#741b47' },
};

var DATE_FORMAT = 'dd/MM/yyyy HH:mm';

/** الأعمدة لي خاصهم يبقاو نص — بلا هاد الشي الهاتف كيضيع منو 0 ديال اللول */
var TEXT_COLUMNS = [COL_CODE, COL_PHONE];

var TIMEZONE = 'Africa/Casablanca';

/* ─────────────────────────── helpers ─────────────────────────── */

/**
 * الحماية بكلمة سر فـ ?key=.
 * إلا ما كانتش ORDERS_SECRET محطوطة كيخدم بلا حماية، باش شي deploy قبل ما
 * تحط الكلمة ما يضيّعش الطلبات — ولكن حطها.
 */
function secretOk(e) {
  var want = PropertiesService.getScriptProperties().getProperty('ORDERS_SECRET');
  return !want || (e && e.parameter && e.parameter.key === want);
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function sheetOrNull() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TAB);
}

/** كود الطلب: CET-260909-007 — التاريخ + رقم متسلسل ديال النهار */
function makeOrderCode(sheet, when) {
  var stamp = Utilities.formatDate(when, TIMEZONE, 'yyMMdd');
  var prefix = 'CET-' + stamp + '-';
  var last = sheet.getLastRow();
  var todayCount = 0;

  if (last > 1) {
    var codes = sheet.getRange(2, COL_CODE, last - 1, 1).getValues();
    for (var i = 0; i < codes.length; i++) {
      if (String(codes[i][0]).indexOf(prefix) === 0) todayCount++;
    }
  }

  return prefix + ('00' + (todayCount + 1)).slice(-3);
}

/**
 * نفس الهاتف + نفس الثمن ف آخر 3 دقايق = ضغط جوج مرات على الزر.
 * كنرجعو الكود القديم بلا ما نزيدو صف جديد.
 */
function findRecentDuplicate(sheet, phone, price) {
  var last = sheet.getLastRow();
  if (last < 2) return null;

  var lookback = Math.min(30, last - 1);
  var start = last - lookback + 1;
  var rows = sheet.getRange(start, 1, lookback, COL_COUNT).getValues();
  var cutoff = Date.now() - 3 * 60 * 1000;

  for (var i = rows.length - 1; i >= 0; i--) {
    var row = rows[i];

    /* كنقارنو بـ ts (رقم) ماشي بالتاريخ ديال الخانة: Sheets كيرجع التاريخ
       محوّل لـ timezone ديال المشروع، وإلا كان مختلف على ديال الشيت كيبان
       الصف قديم بساعات وما كيتقارنش أصلاً. الرقم ماعندو timezone. */
    var ts = Number(row[COL_TS - 1]);
    if (!ts || ts < cutoff) continue;

    if (String(row[COL_PHONE - 1]) === String(phone) && String(row[COL_PRICE - 1]) === String(price)) {
      return String(row[COL_CODE - 1]);
    }
  }

  return null;
}

/* ─────────────────────────── setup ─────────────────────────── */

/** شغّلها مرة وحدة من المحرر: كتخلق التاب، العناوين، الألوان والقائمة. */
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(TAB) || ss.insertSheet(TAB);

  if (sheet.getMaxColumns() < COL_COUNT) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), COL_COUNT - sheet.getMaxColumns());
  }

  sheet.getRange(1, 1, 1, COL_COUNT).setValues([HEADERS]).setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, COL_COUNT).setBackground('#0b192c').setFontColor('#ffd700');

  var rows = sheet.getMaxRows() - 1;

  sheet
    .getRange(2, COL_STATUS, rows, 1)
    .setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build()
    );

  sheet.getRange(2, COL_DATE, rows, 1).setNumberFormat(DATE_FORMAT);

  TEXT_COLUMNS.forEach(function (col) {
    sheet.getRange(2, col, rows, 1).setNumberFormat('@');
  });

  setupStatusColors();
  sheet.hideColumns(COL_TS); // عمود تقني، ماشي للقراءة
  sheet.setRightToLeft(true);
  sheet.autoResizeColumns(1, COL_COUNT);

  SpreadsheetApp.getActiveSpreadsheet().toast('الشيت واجد. دابا دير Deploy → Web app.', 'تم', 8);
}

/** ألوان عمود الحالة — مفصولة باش تقدر تعاود تشغلها بوحدها. */
function setupStatusColors() {
  var sheet = sheetOrNull();
  if (!sheet) throw new Error('التاب "' + TAB + '" ماكاينش — شغّل setupSheet الأول');

  var range = sheet.getRange(2, COL_STATUS, sheet.getMaxRows() - 1, 1);
  var rules = sheet.getConditionalFormatRules().filter(function (rule) {
    return rule.getRanges().every(function (r) {
      return r.getColumn() !== COL_STATUS;
    });
  });

  STATUSES.forEach(function (status) {
    var color = STATUS_COLORS[status];
    if (!color) return;
    rules.push(
      SpreadsheetApp.newConditionalFormatRule()
        .whenTextEqualTo(status)
        .setBackground(color.bg)
        .setFontColor(color.fg)
        .setRanges([range])
        .build()
    );
  });

  sheet.setConditionalFormatRules(rules);
}

/* ─────────────────────────── endpoints ─────────────────────────── */

/** فحص سريع: حل /exec فالنافيگاتور، خاصك تشوف {"ok":true,...} */
function doGet(e) {
  if (!secretOk(e)) return reply({ ok: false, error: 'unauthorized' });

  var sheet = sheetOrNull();
  if (!sheet) return reply({ ok: false, error: 'tab_missing' });

  return reply({ ok: true, tab: TAB, orders: Math.max(0, sheet.getLastRow() - 1) });
}

/**
 * كيستقبل الطلب من اللاندينگ بيج.
 * الـ body: {name, phone, city, address, product, offer, quantity, total, source}
 */
function doPost(e) {
  if (!secretOk(e)) return reply({ ok: false, error: 'unauthorized' });

  var sheet = sheetOrNull();
  if (!sheet) return reply({ ok: false, error: 'tab_missing' });

  // كيوقع ملي تشغل doPost من المحرر ولا ملي يجي request خاوي
  if (!e || !e.postData || !e.postData.contents) {
    return reply({ ok: false, error: 'empty_body' });
  }

  var order;
  try {
    order = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: 'bad_json' });
  }

  var phone = String(order.phone || '').trim();
  var name = String(order.name || '').trim();
  if (!phone || !name) return reply({ ok: false, error: 'missing_name_or_phone' });

  // كنسدو الباب على جوج طلبات فنفس الوقت باش الكود ما يتكررش
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return reply({ ok: false, error: 'busy' });

  try {
    var duplicate = findRecentDuplicate(sheet, phone, order.total);
    if (duplicate) return reply({ ok: true, code: duplicate, duplicate: true });

    var now = new Date();
    var code = makeOrderCode(sheet, now);

    sheet.appendRow([
      code,
      now,
      name,
      phone,
      String(order.city || '').trim(),
      String(order.address || '').trim(),
      String(order.product || ''),
      String(order.offer || ''),
      order.quantity || 1,
      order.total || '',
      String(order.source || ''),
      'جديد',
      '',
      now.getTime(),
    ]);

    var row = sheet.getLastRow();
    sheet.getRange(row, COL_DATE).setNumberFormat(DATE_FORMAT);
    TEXT_COLUMNS.forEach(function (col) {
      sheet.getRange(row, col).setNumberFormat('@');
    });

    return reply({ ok: true, code: code });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * كتمسح صفوف الاختبار: كل صف السميّة ديالو كتبدا بـ "اختبار" ولا المصدر ديالو
 * فيه "test". شغّلها من المحرر ملي تسالي التجارب — ما كتمسحش الطلبات الحقيقية.
 */
function deleteTestOrders() {
  var sheet = sheetOrNull();
  if (!sheet) throw new Error('التاب "' + TAB + '" ماكاينش');

  var last = sheet.getLastRow();
  if (last < 2) return;

  var rows = sheet.getRange(2, 1, last - 1, COL_COUNT).getValues();
  var removed = 0;

  // من تحت لفوق باش أرقام الصفوف ما يتبدلوش ملي كنمسحو
  for (var i = rows.length - 1; i >= 0; i--) {
    var name = String(rows[i][2] || '');
    var source = String(rows[i][10] || '');
    if (name.indexOf('اختبار') === 0 || source.indexOf('test') !== -1) {
      sheet.deleteRow(i + 2);
      removed++;
    }
  }

  SpreadsheetApp.getActiveSpreadsheet().toast('تمسحو ' + removed + ' صف ديال الاختبار', 'تم', 6);
}
