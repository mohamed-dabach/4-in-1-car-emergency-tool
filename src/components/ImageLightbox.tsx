import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function ImageLightbox({ src, alt, children, className }: { src: string, alt: string, children: React.ReactNode, className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div className={className} onClick={() => setIsOpen(true)} style={{ cursor: 'zoom-in' }} title="اضغط للتكبير">
        {children}
      </div>
      {isOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md transition-opacity"
          onClick={() => setIsOpen(false)}
          style={{ animation: 'fadeIn 0.2s ease-out' }}
        >
          <button 
            type="button" 
            className="absolute top-4 right-4 z-[110] rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30 hover:scale-110 sm:top-6 sm:right-6"
            onClick={() => setIsOpen(false)}
            aria-label="إغلاق"
          >
            <X className="h-6 w-6" />
          </button>
          <img 
            src={src} 
            alt={alt} 
            className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl" 
            onClick={(e) => e.stopPropagation()} 
            style={{ animation: 'zoomIn 0.2s ease-out' }}
          />
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes zoomIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
          `}</style>
        </div>,
        document.body
      )}
    </>
  );
}
