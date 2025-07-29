import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { services } from '../data';
import { Link } from 'react-router-dom';
import { Check, Star, Zap, Clock, Video, Users, ArrowRight, ExternalLink, Play, Calculator, X } from 'lucide-react';
import { useState } from 'react';

export default function Pricing() {
  const [showCalculator, setShowCalculator] = useState(false);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [videoLength, setVideoLength] = useState<number>(1);
  const [isCommercial, setIsCommercial] = useState<boolean>(false);
  const [calculatedPrice, setCalculatedPrice] = useState<number>(0);

  const calculatePrice = () => {
    if (!selectedService || !('pricePerMinute' in selectedService) || !selectedService.pricePerMinute) return;
    
    const basePrice = selectedService.basePrice;
    let additionalMinutes = 0;
    
    if (selectedService.type === 'longform') {
      // สำหรับ longform: 5 นาทีแรกเป็นราคาเริ่มต้น
      if (videoLength > 5) {
        additionalMinutes = videoLength - 5;
      }
    } else {
      // สำหรับ shortform: 1 นาทีแรกเป็นราคาเริ่มต้น
      if (videoLength > 1) {
        additionalMinutes = videoLength - 1;
      }
    }
    
    let totalPrice = basePrice + (additionalMinutes * selectedService.pricePerMinute);
    
    // หากเป็นงานพาณิชย์ ให้คูณ 2
    if (isCommercial) {
      totalPrice = totalPrice * 2;
    }
    
    setCalculatedPrice(totalPrice);
  };

  const openCalculator = (service: typeof services[0]) => {
    // Skip calculator for monthly package
    if (service.type === 'monthly') return;
    
    setSelectedService(service);
    setVideoLength(service.type === 'longform' ? 5 : 1);
    setIsCommercial(false);
    setCalculatedPrice(0);
    setShowCalculator(true);
  };
  const pricingFeatures = [
    {
      icon: <Video size={20} />,
      title: "Professional Editing",
      description: "ตัดต่อมืออาชีพด้วย Adobe Premiere Pro และ After Effects"
    },
    {
      icon: <Zap size={20} />,
      title: "Fast Delivery",
      description: "ส่งงานรวดเร็วตามเวลาที่กำหนด"
    },
    {
      icon: <Star size={20} />,
      title: "1 Free Revision",
      description: "แก้ไขได้ 1 ครั้ง ครั้งถัดไปครั้งละ 100 บาท"
    },
    {
      icon: <Users size={20} />,
      title: "Personalized Service",
      description: "บริการเฉพาะบุคคล ปรึกษาได้ตลอดเวลา"
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block relative mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl">
                <Video className="text-white" size={48} />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6"
            >
              ค่าบริการ
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              ราคาที่ยุติธรรม คุณภาพระดับมืออาชีพ
            </motion.p>

            {/* Features Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12"
            >
              {pricingFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1 }}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center text-white mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Pricing Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.type}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + index * 0.2 }}
                className={`group relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden ${
                  service.type === 'monthly' 
                    ? 'ring-2 ring-purple-500 ring-opacity-50 lg:scale-105' 
                    : ''
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 ${
                  service.type === 'monthly' 
                    ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10' 
                    : 'bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-900/10 dark:to-indigo-900/10'
                } opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-block p-4 ${
                      service.type === 'monthly'
                        ? 'bg-gradient-to-br from-purple-500 to-pink-600'
                        : 'bg-gradient-to-br from-sky-500 to-indigo-600'
                    } rounded-2xl mb-6 shadow-lg`}>
                      {service.type === 'longform' ? (
                        <Clock className="text-white" size={32} />
                      ) : service.type === 'shortform' ? (
                        <Zap className="text-white" size={32} />
                      ) : (
                        <Users className="text-white" size={32} />
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                      {service.type === 'longform' 
                        ? 'Longform VDO' 
                        : service.type === 'shortform' 
                        ? 'Shortform VDO' 
                        : 'Monthly Package'
                      }
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400">
                      {service.type === 'longform' 
                        ? '(5+ นาที)' 
                        : service.type === 'shortform' 
                        ? '(1 นาที)' 
                        : 'สำหรับผู้ที่ต้องการติดต่อร่วมงานแบบเดือน'
                      }
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="text-center mb-8">
                    {service.type === 'monthly' ? (
                      <div className="mb-6">
                        <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          ติดต่อสอบถาม
                        </span>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                          ราคาพิเศษตามความต้องการ
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="mb-6">
                          <span className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                            ฿{service.basePrice}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400 text-lg ml-2">
                            เริ่มต้น
                          </span>
                        </div>
                        
                        <div className="bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-sky-900/20 dark:to-indigo-900/20 rounded-xl p-4 mb-6">
                          <p className="text-sky-700 dark:text-sky-300 font-semibold">
                            + ฿{service.pricePerMinute} ต่อนาที
                          </p>
                          {service.type === 'longform' && (
                            <p className="text-sm text-sky-600 dark:text-sky-400 mt-1">
                              (เพิ่มจาก 5 นาทีขึ้นไป)
                            </p>
                          )}
                        </div>

                        {/* Price Examples */}
                        <div className="space-y-2 text-sm">
                          {service.type === 'longform' ? (
                            <>
                              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">วิดีโอ 10 นาที</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">฿1,100</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">วิดีโอ 15 นาที</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">฿1,600</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg">
                                <span className="text-orange-700 dark:text-orange-300">วิดีโอ 20+ นาที</span>
                                <span className="font-semibold text-orange-700 dark:text-orange-300">ราคาพิเศษ</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">วิดีโอ 1 นาที</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">฿{service.basePrice}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">วิดีโอ 2 นาที</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">฿{service.basePrice + (service.pricePerMinute || 0)}</span>
                              </div>
                              <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <span className="text-gray-600 dark:text-gray-400">วิดีโอ 3 นาที</span>
                                <span className="font-semibold text-gray-800 dark:text-gray-200">฿{service.basePrice + ((service.pricePerMinute || 0) * 2)}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {service.type === 'monthly' && service.features ? (
                      service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">การตัดต่อมืออาชีพ</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">คุณภาพไฟล์ 1080p หรือ 4K</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">แก้ไขได้ 1 ครั้ง ครั้งถัดไปครั้งละ 100 บาท</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">ส่งงานตามเวลาที่กำหนดในคิว</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Note */}
                  {service.note && (
                    <div className={`${
                      service.type === 'monthly'
                        ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800'
                        : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                    } border rounded-xl p-4 mb-6`}>
                      <p className={`${
                        service.type === 'monthly'
                          ? 'text-purple-800 dark:text-purple-300'
                          : 'text-yellow-800 dark:text-yellow-300'
                      } text-sm font-medium`}>
                        💡 {service.note}
                      </p>
                    </div>
                  )}

                  {/* Action Button */}
                  <div className="text-center">
                    {service.type === 'monthly' ? (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Users size={20} />
                          ติดต่อสอบถาม
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.button
                        onClick={() => openCalculator(service)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Calculator size={20} />
                        คำนวณราคา
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Star size={48} className={service.type === 'monthly' ? 'text-purple-500' : 'text-sky-500'} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Price Calculator Modal */}
          {showCalculator && selectedService && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Calculator className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        คำนวณราคา
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedService.type === 'longform' ? 'Longform VDO' : 'Shortform VDO'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowCalculator(false)}
                    className="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <X size={16} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Form */}
                <div className="space-y-6">
                  {/* Video Length Input */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      ความยาววิดีโอ (นาที)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={selectedService.type === 'longform' ? 5 : 1}
                        value={videoLength}
                        onChange={(e) => setVideoLength(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none text-lg font-semibold text-center"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Clock size={20} className="text-gray-400" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {selectedService.type === 'longform' 
                        ? 'ขั้นต่ำ 5 นาที' 
                        : 'ขั้นต่ำ 1 นาที'
                      }
                    </p>
                  </div>

                  {/* Commercial Option */}
                  <div>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isCommercial}
                        onChange={(e) => setIsCommercial(e.target.checked)}
                        className="w-5 h-5 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500 focus:ring-2"
                      />
                      <div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          งานพาณิชย์ (มีสปอนเซอร์)
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          ราคาพาณิชย์ x2
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Calculate Button */}
                  <button
                    onClick={calculatePrice}
                    className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    คำนวณราคา
                  </button>

                  {/* Result */}
                  {calculatedPrice > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6 text-center"
                    >
                      <h4 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                        ราคารวมทั้งสิ้น
                      </h4>
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                        ฿{calculatedPrice.toLocaleString()}
                      </div>
                      
                      {/* Price Breakdown */}
                      <div className="text-xs text-green-700 dark:text-green-300 space-y-1">
                        <div className="flex justify-between">
                          <span>ราคาเริ่มต้น:</span>
                          <span>฿{selectedService.basePrice.toLocaleString()}</span>
                        </div>
                        {videoLength > (selectedService.type === 'longform' ? 5 : 1) && (
                          <div className="flex justify-between">
                            <span>
                              เพิ่ม {videoLength - (selectedService.type === 'longform' ? 5 : 1)} นาที:
                            </span>
                            <span>
                              ฿{((videoLength - (selectedService.type === 'longform' ? 5 : 1)) * (('pricePerMinute' in selectedService ? selectedService.pricePerMinute : 0) || 0)).toLocaleString()}
                            </span>
                          </div>
                        )}
                        {isCommercial && (
                          <div className="flex justify-between border-t border-green-200 dark:border-green-800 pt-1">
                            <span>ราคาพาณิชย์ (x2):</span>
                            <span>รวมแล้ว</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Contact Button */}
                      <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                        <Link
                          to="/contact"
                          onClick={() => setShowCalculator(false)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors"
                        >
                          <Users size={16} />
                          สั่งงานเลย
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          )}

          {/* Commercial Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0 }}
            className="text-center mb-20"
          >
            <div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Star className="text-orange-500" size={24} />
                <h3 className="text-xl font-bold text-orange-800 dark:text-orange-300">
                  ราคาพาณิชย์
                </h3>
                <Star className="text-orange-500" size={24} />
              </div>
              <p className="text-orange-700 dark:text-orange-300 text-lg">
                สำหรับงานที่มีโฆษณาสปอนเซอร์ (ยกเว้น Tie-in ช่วง Intro) → คิดราคาพาณิชย์ x2
              </p>
            </div>
          </motion.div>

          {/* Video Types Explanation */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                เข้าใจแพ็กเกจบริการ
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                เลือกแพ็กเกจที่เหมาะกับความต้องการของคุณ
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Longform */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.4 }}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Clock className="text-white" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                    Longform VDO
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                        <Video size={16} />
                        คืออะไร?
                      </h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                        วิดีโอประเภทนี้เป็นวิดีโอที่มีความยาวตั้งแต่ 5 นาทีขึ้นไป 
                        ใช้สำหรับเนื้อหาที่เน้นการเล่าเรื่อง หรือเน้นดูเพลิน (โดยเฉพาะระหว่างกินข้าว)
                      </p>
                    </div>
                    
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4">
                      <h4 className="font-semibold text-indigo-800 dark:text-indigo-300 mb-2 flex items-center gap-2">
                        <Play size={16} />
                        ตัวอย่างเช่น
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Gaming', 'Vlog', 'Highlight', 'Serious Content'].map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Shortform */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6 }}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Zap className="text-white" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                    Shortform VDO
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2 flex items-center gap-2">
                        <Video size={16} />
                        คืออะไร?
                      </h4>
                      <p className="text-purple-700 dark:text-purple-300 text-sm leading-relaxed">
                        วิดีโอประเภทนี้เป็นวิดีโอสั้น ๆ ความยาวประมาณ 1-3 นาที หรืออาจเพิ่มความยาวได้เล็กน้อย 
                        เหมาะสำหรับการสื่อสารที่กระชับและดึงดูดความสนใจได้อย่างรวดเร็ว
                      </p>
                    </div>
                    
                    <div className="bg-pink-50 dark:bg-pink-900/20 rounded-xl p-4">
                      <h4 className="font-semibold text-pink-800 dark:text-pink-300 mb-2 flex items-center gap-2">
                        <Play size={16} />
                        ตัวอย่างเช่น
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['TikTok', 'Instagram Reels', 'YouTube Shorts', 'โฆษณาสั้น', 'Highlight Reel'].map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-pink-100 dark:bg-pink-800 text-pink-700 dark:text-pink-300 rounded-full text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Monthly Package */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.8 }}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-700 relative overflow-hidden ring-2 ring-purple-500 ring-opacity-30"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/10 dark:to-yellow-900/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Users className="text-white" size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
                    Monthly Package
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                      <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2 flex items-center gap-2">
                        <Star size={16} />
                        เหมาะกับใคร?
                      </h4>
                      <p className="text-orange-700 dark:text-orange-300 text-sm leading-relaxed">
                        สำหรับผู้ที่ต้องการติดต่อร่วมงานแบบเดือน มีงานต่อเนื่อง หรือต้องการความคุ้มค่าสูงสุด 
                        พร้อมบริการครบครันทุกประเภท
                      </p>
                    </div>
                    
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
                        <Check size={16} />
                        สิทธิพิเศษ
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['แก้ไขไม่จำกัด', '4K Quality', 'Priority Support', 'Custom Service'].map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 rounded-full text-xs font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* Call to Action Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8 }}
            className="space-y-16"
          >
            {/* Portfolio CTA */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.0 }}
                className="bg-gradient-to-r from-sky-500 to-indigo-600 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-24 translate-y-24"></div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    ยังตัดสินใจไม่ได้?
                  </h3>
                  <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                    ลองไปดูผลงานก่อนได้นะ จะได้เห็นคุณภาพการทำงานจริง ๆ
                  </p>
                  
                  <motion.a
                    href="https://youtube.com/playlist?list=PL8jTaMUfEIynMbNlQG1TywiUGeB8wCcWu&si=GsaPaJ5Juj6EmG1q"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-sky-600 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Play size={24} />
                    ดูผลงานทั้งหมด
                    <ExternalLink size={20} />
                  </motion.a>
                </div>
              </motion.div>
            </div>

            {/* Contact CTA */}
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.2 }}
                className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full -translate-x-28 translate-y-28"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <Star className="text-yellow-300" size={32} />
                    <h3 className="text-3xl md:text-4xl font-bold text-white">
                      พร้อมเริ่มโปรเจกต์แล้ว?
                    </h3>
                    <Star className="text-yellow-300" size={32} />
                  </div>
                  
                  <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                    ติดต่อเราเลยวันนี้ เพื่อปรึกษาและเริ่มต้นสร้างวิดีโอคุณภาพระดับมืออาชีพ
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none"
                    >
                      <Users size={24} />
                      สั่งงานทันที
                      <ArrowRight size={20} />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}