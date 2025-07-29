import { motion } from 'framer-motion';
import { Facebook, Twitter, Mail, Phone, MessageCircle, Clock, Star, CheckCircle, Heart, ArrowRight, ExternalLink } from 'lucide-react';
import { MessagesSquare } from 'lucide-react';
import { useState, FormEvent } from 'react';
import PageTransition from '../components/PageTransition';

const CONTACT_PLATFORMS = [
  { value: 'line', label: 'Line', icon: MessageCircle, color: 'from-green-500 to-green-600' },
  { value: 'facebook', label: 'Facebook', icon: Facebook, color: 'from-blue-500 to-blue-600' },
  { value: 'discord', label: 'Discord', icon: MessagesSquare, color: 'from-indigo-500 to-purple-600' },
  { value: 'tel', label: 'เบอร์โทรศัพท์', icon: Phone, color: 'from-orange-500 to-orange-600' },
  { value: 'instagram', label: 'Instagram', icon: Mail, color: 'from-pink-500 to-purple-600' },
  { value: 'twitter', label: 'X (Twitter)', icon: Twitter, color: 'from-gray-700 to-gray-800' },
  { value: 'other', label: 'อื่นๆ', icon: Mail, color: 'from-gray-500 to-gray-600' },
] as const;

type ContactPlatform = typeof CONTACT_PLATFORMS[number]['value'] | '';

function DiscordIcon({ size = 24, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 16.889 15.9493C17.0383 16.0667 17.177 16.184 17.3263 16.2906C16.7503 16.632 16.153 16.92 15.5236 17.1546C15.8543 17.8053 16.2383 18.424 16.665 19C18.4036 18.4666 20.185 17.6559 22.01 16.3226C22.4687 11.7787 21.2836 7.83202 18.8943 4.34399ZM8.05593 13.9013C7.01058 13.9013 6.15725 12.952 6.15725 11.7893C6.15725 10.6267 6.98925 9.67731 8.05593 9.67731C9.11191 9.67731 9.97588 10.6267 9.95454 11.7893C9.95454 12.952 9.11191 13.9013 8.05593 13.9013ZM15.065 13.9013C14.0196 13.9013 13.1652 12.952 13.1652 11.7893C13.1652 10.6267 13.9983 9.67731 15.065 9.67731C16.121 9.67731 16.985 10.6267 16.9636 11.7893C16.9636 12.952 16.1317 13.9013 15.065 13.9013Z" 
        stroke="currentColor" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: '' as ContactPlatform,
    contactId: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;
      
      if (!webhookUrl) {
        throw new Error('Webhook URL not configured');
      }

      const platformLabel = CONTACT_PLATFORMS.find(p => p.value === formData.platform)?.label || formData.platform;
      
      const discordMessage = {
        content: "มีข้อความใหม่จากเว็บไซต์!",
        embeds: [{
          title: '📨 รายละเอียดการติดต่อ',
          color: 0x0099ff,
          fields: [
            {
              name: '👤 ชื่อ',
              value: formData.name || '-',
              inline: true
            },
            {
              name: '📧 อีเมล',
              value: formData.email || '-',
              inline: true
            },
            {
              name: '📱 แพลตฟอร์มที่ติดต่อได้',
              value: platformLabel || '-',
              inline: true
            },
            {
              name: '🔗 ID/ลิงค์สำหรับติดต่อ',
              value: formData.contactId || '-',
              inline: true
            },
            {
              name: '💬 ข้อความ',
              value: formData.message || '-'
            }
          ],
          timestamp: new Date().toISOString()
        }]
      };

      console.log('Sending message:', discordMessage);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(discordMessage),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Discord API Error:', errorText);
        throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', platform: '', contactId: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
                <Mail className="text-white" size={48} />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6"
            >
              ติดต่อเรา
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              พร้อมรับงานตัดต่อวิดีโอคุณภาพระดับมืออาชีพ
            </motion.p>

            {/* Quick Contact Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
            >
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                <Clock className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg p-1.5 text-white mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">ตอบเร็ว</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">ภายใน 24 ชม.</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                <CheckCircle className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-1.5 text-white mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">มืออาชีพ</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">คุณภาพสูง</p>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-100 dark:border-gray-700">
                <Heart className="w-8 h-8 bg-gradient-to-br from-pink-500 to-red-600 rounded-lg p-1.5 text-white mx-auto mb-2" />
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">เข้าใจลูกค้า</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">ปรึกษาได้เสมอ</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Channels */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="space-y-8"
            >
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  ช่องทางการติดต่อ
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  เลือกช่องทางที่คุณสะดวกที่สุด
                </p>
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-2 gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.facebook.com/flixzer04"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Facebook className="text-white" size={28} />
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Facebook</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">flixzer04</p>
                    <ExternalLink className="absolute top-4 right-4 text-gray-400 group-hover:text-blue-500 transition-colors" size={16} />
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://x.com/flixzer_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/10 dark:to-slate-900/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Twitter className="text-white" size={28} />
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">X (Twitter)</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">@flixzer_</p>
                    <ExternalLink className="absolute top-4 right-4 text-gray-400 group-hover:text-gray-700 transition-colors" size={16} />
                  </div>
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://discord.com/users/itsflixzer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <DiscordIcon size={28} className="text-white" />
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Discord</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">itsflixzer</p>
                    <ExternalLink className="absolute top-4 right-4 text-gray-400 group-hover:text-indigo-500 transition-colors" size={16} />
                  </div>
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText('gong1405');
                    alert('คัดลอก Line ID แล้ว: gong1405');
                  }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 relative overflow-hidden text-left"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="text-white" size={28} />
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Line</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">gong1405</p>
                    <div className="absolute top-4 right-4 text-gray-400 group-hover:text-green-500 transition-colors text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                      คลิกคัดลอก
                    </div>
                  </div>
                </motion.button>
              </div>

              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="bg-gradient-to-r from-sky-100 to-indigo-100 dark:from-sky-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-sky-200 dark:border-sky-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Star className="text-yellow-500" size={24} />
                  <h3 className="text-lg font-bold text-sky-800 dark:text-sky-300">
                    ทำไมต้องเลือกเรา?
                  </h3>
                </div>
                <ul className="space-y-2 text-sky-700 dark:text-sky-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">ประสบการณ์ 3+ ปี</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">ใช้โปรแกรมระดับมืออาชีพ</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">ส่งงานตรงเวลา 100%</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                    <span className="text-sm">ราคายุติธรรม คุ้มค่า</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="space-y-8"
            >
              <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  ส่งข้อความถึงเรา
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  กรอกข้อมูลด้านล่าง เราจะตอบกลับโดยเร็วที่สุด
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-50/50 to-indigo-50/50 dark:from-sky-900/10 dark:to-indigo-900/10"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <Mail className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        แบบฟอร์มติดต่อ
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ส่งได้จริง เห็นเร็วตอบเร็ว
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          ชื่อของคุณ *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all duration-300"
                          placeholder="กรอกชื่อของคุณ"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          อีเมล *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all duration-300"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="platform" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        แพลตฟอร์มสำหรับการติดต่อกลับ *
                      </label>
                      <select
                        id="platform"
                        required
                        value={formData.platform}
                        onChange={(e) => setFormData({ ...formData, platform: e.target.value as ContactPlatform })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all duration-300"
                      >
                        <option value="">-- เลือกแพลตฟอร์ม --</option>
                        {CONTACT_PLATFORMS.map((platform) => (
                          <option key={platform.value} value={platform.value}>
                            {platform.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contactId" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        ID/ลิงค์สำหรับติดต่อ *
                      </label>
                      <input
                        type="text"
                        id="contactId"
                        required
                        placeholder={
                          formData.platform === 'line' ? 'เช่น ID: example' :
                          formData.platform === 'facebook' ? 'เช่น facebook.com/example' :
                          formData.platform === 'tel' ? 'เช่น 08x-xxx-xxxx' :
                          formData.platform === 'discord' ? 'เช่น username#0000' :
                          formData.platform === 'instagram' ? 'เช่น @example' :
                          formData.platform === 'twitter' ? 'เช่น @example' :
                          'กรุณาระบุช่องทางการติดต่อ'
                        }
                        value={formData.contactId}
                        onChange={(e) => setFormData({ ...formData, contactId: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                        ข้อความ *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all duration-300 resize-none"
                        placeholder="บอกเราเกี่ยวกับโปรเจกต์ของคุณ..."
                      />
                    </div>
                    
                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3"
                      >
                        <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                        <div>
                          <p className="text-green-800 dark:text-green-300 font-semibold">ส่งข้อความสำเร็จ!</p>
                          <p className="text-green-700 dark:text-green-400 text-sm">เราจะตอบกลับคุณโดยเร็วที่สุด</p>
                        </div>
                      </motion.div>
                    )}
                    
                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3"
                      >
                        <Mail className="text-red-500 flex-shrink-0" size={24} />
                        <div>
                          <p className="text-red-800 dark:text-red-300 font-semibold">เกิดข้อผิดพลาด</p>
                          <p className="text-red-700 dark:text-red-400 text-sm">กรุณาลองใหม่อีกครั้ง หรือติดต่อผ่านช่องทางอื่น</p>
                        </div>
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                      className={`w-full px-6 py-4 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          กำลังส่ง...
                        </>
                      ) : (
                        <>
                          <Mail size={20} />
                          ส่งข้อความ
                          <ArrowRight size={16} />
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6 }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-24 translate-y-24"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <Star className="text-yellow-300" size={32} />
                  <h3 className="text-3xl md:text-4xl font-bold text-white">
                    มาคุยกันก่อนได้นะ!
                  </h3>
                  <Star className="text-yellow-300" size={32} />
                </div>
                
                <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                  ไม่แน่ใจเรื่องโปรเจกต์? อยากปรึกษาราคา? หรือแค่อยากคุยเรื่องงาน? 
                  ติดต่อมาได้เลย เราพร้อมให้คำปรึกษาฟรี!
                </p>
                
                <motion.div
                  className="flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                >
                  <motion.a
                    href="https://www.facebook.com/flixzer04"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Facebook size={20} />
                    Facebook
                  </motion.a>
                  
                  <motion.button
                    onClick={() => {
                      navigator.clipboard.writeText('gong1405');
                      alert('คัดลอก Line ID แล้ว: gong1405');
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-green-600 transition-all duration-300"
                  >
                    <MessageCircle size={20} />
                    Line: gong1405
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}