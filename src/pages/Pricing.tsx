import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { services } from '../data';
import { Link } from 'react-router-dom';

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
                  className="relative group h-full"
                >
                  {/* Base Card */}
                  <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg 
                    transition-all duration-300 group-hover:scale-95 h-full flex flex-col justify-center">
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
                      <p className="text-sm text-sky-600 dark:text-sky-400 mt-auto">{service.note}</p>
                    )}
                  </div>

                  {/* Hover Card */}
                  <div className="absolute top-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-2xl 
                    opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-105
                    transition-all duration-300 transform
                    p-6 z-10">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-sky-900 dark:text-sky-300">
                        {service.type === 'longform' ? 'Longform VDO คำนวณราคายังไง?' : 'Shortform VDO คำนวณราคายังไง?'}
                      </h3>
                      <div className="space-y-3">
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-semibold">ราคาเริ่มต้น:</span> {service.basePrice} บาท
                        </p>
                        <p className="text-gray-700 dark:text-gray-300">
                          <span className="font-semibold">ค่าบริการต่อนาที:</span> {service.pricePerMinute} บาท
                        </p>
                        <div className="text-gray-700 dark:text-gray-300">
                          <p className="font-semibold mb-2">ตัวอย่างการคิดราคา:</p>
                          {service.type === 'longform' ? (
                            <ul className="list-disc list-inside text-sm space-y-1">
                              <li>วิดีโอ 10 นาที = {service.basePrice} + ({service.pricePerMinute} × 5) = 1,100 บาท</li>
                              <li>วิดีโอ 15 นาที = {service.basePrice} + ({service.pricePerMinute} × 10) = 1,600 บาท</li>
                              <li>วิดีโอ 20 นาที = ราคาพิเศษ โปรดติดต่อสอบถาม</li>
                            </ul>
                          ) : (
                            <ul className="list-disc list-inside text-sm space-y-1">
                              <li>วิดีโอ 1 นาที = {service.basePrice} บาท</li>
                              <li>วิดีโอ 2 นาที = {service.basePrice} + {service.pricePerMinute} = {service.basePrice + service.pricePerMinute} บาท</li>
                              <li>วิดีโอ 3 นาที = {service.basePrice} + ({service.pricePerMinute} × 2) = {service.basePrice + (service.pricePerMinute * 2)} บาท</li>
                            </ul>
                          )}
                        </div>
                      </div>
                      {service.note && (
                        <p className="text-sm text-sky-600 dark:text-sky-400 mt-2">{service.note}</p>
                      )}
                    </div>
                  </div>
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

            {/* Call to Action Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-20 text-center space-y-20"
            >
              {/* Portfolio CTA */}
              <div className="space-y-6">
                <p className="text-xl text-gray-700 dark:text-gray-300">
                  <span className="text-2xl text-sky-400 dark:text-sky-300 font-bold
                    [text-shadow:_0_0_10px_rgb(56_189_248_/_90%)]">
                    ถ้ายังตัดสินใจไม่ได้
                  </span>{' '}
                  ลองไปดูผลงานก่อนได้นะ
                </p>
                <a
                  href="https://youtube.com/playlist?list=PL8jTaMUfEIynMbNlQG1TywiUGeB8wCcWu&si=GsaPaJ5Juj6EmG1q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-xl
                    transform hover:scale-105 transition-all duration-300
                    shadow-[0_0_15px_rgba(14,165,233,0.5)] hover:shadow-[0_0_25px_rgba(14,165,233,0.65)]
                    text-lg font-semibold"
                >
                  ดูผลงานทั้งหมด
                </a>
              </div>

              {/* Contact CTA */}
              <div className="space-y-6">
                <p className="text-xl text-gray-700 dark:text-gray-300">
                  <span className="text-3xl text-sky-400 dark:text-sky-300 font-bold
                    [text-shadow:_0_0_10px_rgb(56_189_248_/_90%)]">
                    ถ้าสนใจจริง ๆ
                  </span>{' '}
                  กดปุ่มนี้สิ
                </p>
                <Link
                  to="/contact"
                  className="inline-block px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl
                    transform hover:scale-105 transition-all duration-300
                    shadow-[0_0_15px_rgba(34,197,94,0.5)] hover:shadow-[0_0_25px_rgba(34,197,94,0.65)]
                    text-lg font-semibold animate-bounce"
                >
                  สั่งงานทันที
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}