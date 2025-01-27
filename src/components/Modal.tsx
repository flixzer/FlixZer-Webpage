import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with flex centering */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 
              flex items-center justify-center"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[calc(100%-2rem)] sm:w-[85%] md:w-[75%] max-w-2xl
                m-4 p-4 sm:p-6 md:p-8
                bg-white dark:bg-gray-800 
                rounded-xl shadow-2xl
                max-h-[calc(100vh-4rem)] overflow-y-auto
                focus:outline-none"
            >
              <div className="flex justify-between items-start gap-4 mb-4">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-sky-900 dark:text-sky-100 pr-2">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors flex-shrink-0"
                >
                  <X className="text-gray-500 dark:text-gray-400" size={18} />
                </button>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                {children}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
} 