import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { services } from '../data';

export default function Pricing() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-sky-950 dark:text-sky-100 mb-12 text-center">
              ค่าบริการ
            </h1>

            {/* Pricing Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {services.map((service, index) => (
                <motion.div
                  key={service.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-semibold text-sky-900 dark:text-sky-300 mb-6">
                    {service.type === 'longform' ? 'Longform VDO (5+ min)' : 'Shortform VDO (1 min)'}
                  </h3>
                  <div className="space-y-4 mb-6">
                    <p className="text-3xl font-bold text-sky-600 dark:text-sky-400">
                      เริ่มต้น {service.basePrice} บาท
                    </p>
                    <p className="text-xl text-gray-700 dark:text-gray-300">
                      เพิ่ม {service.pricePerMinute} บาท/นาที
                    </p>
                  </div>
                  {service.note && (
                    <p className="text-sm text-sky-600 dark:text-sky-400">{service.note}</p>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="text-center mb-20 text-lg text-gray-700 dark:text-gray-300">
              * สำหรับงานที่มีโฆษณาสปอนเซอร์ (ยกเว้น Tie-in ช่วง Intro) → คิดราคาพาณิชย์ x2
            </div>

            {/* Video Types Explanation */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold text-sky-900 dark:text-sky-300 mb-6 text-center">
                Longform กับ Shortform แตกต่างกันยังไง
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Longform */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                  <h3 className="text-xl font-semibold text-sky-900 dark:text-sky-300 mb-4">
                    Longform VDO (วิดีโอแบบยาว 5 นาทีขึ้นไป)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sky-800 dark:text-sky-400 mb-2">
                        คืออะไร?
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        วิดีโอประเภทนี้เป็นวิดีโอที่มีความยาวตั้งแต่ 5 นาทีขึ้นไป 
                        ใช้สำหรับเนื้อหาที่เน้นการเล่าเรื่อง หรือเน้นดูเพลิน (โดยเฉพาะระหว่างกินข้าว)
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sky-800 dark:text-sky-400 mb-2">
                        ตัวอย่างเช่น
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Game, Vlog, Highlight, Serious content เป็นต้น
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shortform */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                  <h3 className="text-xl font-semibold text-sky-900 dark:text-sky-300 mb-4">
                    Shortform VDO (วิดีโอแบบสั้น 1 นาที)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sky-800 dark:text-sky-400 mb-2">
                        คืออะไร?
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        วิดีโอประเภทนี้เป็นวิดีโอสั้น ๆ ความยาวประมาณ 1-3 นาที หรืออาจเพิ่มความยาวได้เล็กน้อย 
                        เหมาะสำหรับการสื่อสารที่กระชับและดึงดูดความสนใจได้อย่างรวดเร็ว
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sky-800 dark:text-sky-400 mb-2">
                        ตัวอย่างเช่น
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        คลิปโปรโมตหรือโฆษณาสั้น, คอนเทนต์ TikTok, Instagram Reels, YouTube Shorts, 
                        คลิปแนะนำสินค้าแบบสั้น, ไฮไลต์จากวิดีโอยาว, คลิปประกาศหรือแจ้งข่าวสาร
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}