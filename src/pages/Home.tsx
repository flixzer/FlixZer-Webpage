import { motion } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

export default function Home() {
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
              <h1 className="text-4xl md:text-6xl font-bold text-sky-950 dark:text-sky-100 mb-6">
                ก้อง (Soraaut)
              </h1>
              <div className="flex items-center justify-center gap-2 text-sky-700 dark:text-sky-300 mb-6">
                <Camera size={24} />
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