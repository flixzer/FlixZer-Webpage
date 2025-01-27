import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import flixzerLogo from '../assets/FlixZer_head.png';
import { useState, useEffect } from 'react';

// เพิ่ม array ของคำที่จะสลับ
const nicknames = [
  'Soraaut',
  'FlixZer',
  'Soraaut Plueamtanom',
  'Gong',
  'Gamer?',
  'Editor',
  'Noob Graphic',
  'ก็ชื่อก้อง'
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsDeleting(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % nicknames.length);
        setIsDeleting(false);
      }, 1000); // รอให้ลบข้อความเสร็จก่อนเปลี่ยนคำใหม่
    }, 5000); // เปลี่ยนทุก 5 วินาที

    return () => clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full bg-gradient-to-b from-white via-sky-50/50 to-white dark:from-gray-900 dark:via-sky-950/30 dark:to-gray-900 py-20"
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.img
                src={flixzerLogo}
                alt="FlixZer Logo"
                className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 object-contain"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 1.5, delay: 0.3 }}
              />
              <h1 className="text-4xl md:text-6xl font-bold text-sky-950 dark:text-sky-100 mb-6">
                ก้อง ({' '}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { duration: 0.3 }
                    }}
                    exit={isDeleting ? {
                      opacity: 0,
                      y: -20,
                      transition: { duration: 0.3 }
                    } : {}}
                    className="inline-block text-sky-600 dark:text-sky-400"
                  >
                    {nicknames[currentIndex]}
                  </motion.span>
                </AnimatePresence>
                {' '})
              </h1>
              <div className="flex items-center justify-center gap-2 text-sky-700 dark:text-sky-300 mb-6">
                <img 
                  src={flixzerLogo} 
                  alt="FlixZer Icon" 
                  className="w-6 h-6 object-contain"
                />
                <h2 className="text-xl md:text-2xl">Video Editor | Motion Graphics</h2>
              </div>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
                4+ ปีในสายตัดต่อ | 6+ ปีใน Motion Graphics (แต่นานมาแล้วนะ อย่าคาดหวังมาก)
              </p>
              <blockquote className="text-xl md:text-2xl italic text-sky-800 dark:text-sky-200 mb-12">
                "ไม่ใช่แค่สร้างผลงาน แต่คือการสร้างความประทับใจ"
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4"
            >
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 
                  bg-sky-400 hover:bg-sky-500 text-white rounded-lg transition-all
                  shadow-[0_0_15px_rgba(56,189,248,0.5)] hover:shadow-[0_0_25px_rgba(56,189,248,0.65)]
                  animate-[pulse_3s_ease-in-out_infinite]
                  hover:scale-105"
              >
                ดูผลงาน
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 
                  bg-gray-500 hover:bg-gray-600
                  text-white rounded-lg transition-all
                  shadow-[0_0_15px_rgba(107,114,128,0.5)] hover:shadow-[0_0_25px_rgba(107,114,128,0.65)]
                  animate-[pulse_3s_ease-in-out_infinite_0.5s]
                  hover:scale-105"
              >
                ติดต่อ
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
}