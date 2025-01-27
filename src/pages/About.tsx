import { motion } from 'framer-motion';
import { Award, Calendar, Heart } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import bgAbout from '../assets/bg_about.jpg';

export default function About() {
  return (
    <PageTransition>
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <img 
          src={bgAbout}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover
            md:object-right"
        />
        
        {/* Overlay - Blue Gradient */}
        <div className="absolute inset-0 
          bg-gradient-to-b from-transparent via-sky-900/50 to-sky-900/80
          md:bg-gradient-to-r md:from-transparent md:via-sky-900/50 md:to-sky-900/80" 
        />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="w-full px-4 md:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white 
                text-center max-w-lg mx-auto
                md:text-left md:max-w-xl md:mx-0 md:ml-auto 
                lg:max-w-2xl lg:mr-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                About Me / เกี่ยวกับก้อง
              </h1>

              <div className="space-y-6 text-base md:text-lg">
                <p>
                  ผมก้องครับ อายุ 20 ปลาย ๆ
                </p>

                <p className="text-gray-200">
                  ด้วยประสบการณ์กว่า 4 ปีในงานตัดต่อ และอีก 6 ปีในสาย Motion Graphics 
                  (ถึงแม้ตอนนี้จะไม่ได้ทำแล้ว) ผมเชี่ยวชาญในการสร้างสรรค์และพัฒนาคุณภาพวิดีโอ
                  ด้วยการตัดต่อให้น่าสนใจและมีจุดขายในวิดีโอนั้น ๆ
                </p>

                <div className="pt-6">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4">
                    ไม่ใช่แค่สร้างผลงาน แต่คือการสร้างความประทับใจ
                  </h2>
                  <p className="text-gray-200">
                    ผมพร้อมช่วยให้ Project ของคุณเป็นมากกว่าคลิปธรรมดา 
                    แต่กลายเป็นผลงานที่น่าจดจำและสร้างความสุขให้กับทั้งคุณและผู้ชมได้นั่นเอง
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Additional Info Sections */}
      <div className="bg-gray-50 dark:bg-gray-900 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-12">
            {/* Personal Info */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-sky-900 dark:text-sky-300 mb-4">
                ข้อมูลส่วนตัว
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-sky-600 dark:text-sky-400" size={20} />
                  <p>เกิด: 14 พฤษภาคม 2547</p>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="text-sky-600 dark:text-sky-400" size={20} />
                  <p>สถานะ: มีแฟนแล้ว</p>
                </div>
              </div>
            </motion.section>

            {/* Achievement */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-sky-900 dark:text-sky-300 mb-4">
                ผลงานและรางวัล
              </h2>
              <div className="flex items-start gap-3">
                <Award className="text-sky-600 dark:text-sky-400 mt-1" size={24} />
                <div>
                  <h3 className="font-semibold">เหรียญทอง การแข่งขันศิลปหัตถกรรมครั้งที่ 67</h3>
                  <p className="text-gray-600 dark:text-gray-300">ระดับมัธยมศึกษาตอนปลาย (2566)</p>
                  <p className="text-sky-600 dark:text-sky-400">สาขา: การแข่งขันภาพยนตร์สั้น</p>
                </div>
              </div>
            </motion.section>

            {/* Experience Timeline */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
            >
              <h2 className="text-2xl font-semibold text-sky-900 dark:text-sky-300 mb-6">
                ประสบการณ์การทำงาน
              </h2>
              <div className="space-y-6">
                <div className="relative pl-8 border-l-2 border-sky-200 dark:border-sky-800">
                  <div className="absolute w-4 h-4 bg-sky-600 dark:bg-sky-400 rounded-full -left-[9px] top-0"></div>
                  <h3 className="font-semibold">Video Editor & Motion Graphics</h3>
                  <p className="text-gray-600 dark:text-gray-300">4+ ปีในสายตัดต่อ</p>
                  <p className="text-gray-600 dark:text-gray-300">6+ ปีใน Motion Graphics</p>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}