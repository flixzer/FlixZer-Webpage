import { motion } from 'framer-motion';
import { Facebook, Twitter } from 'lucide-react';
import { MessagesSquare } from 'lucide-react';
import { useState, FormEvent } from 'react';
import PageTransition from '../components/PageTransition';

const CONTACT_PLATFORMS = [
  { value: 'line', label: 'Line' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'discord', label: 'Discord' },
  { value: 'tel', label: 'เบอร์โทรศัพท์' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'X (Twitter)' },
  { value: 'other', label: 'อื่นๆ' },
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
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-sky-950 dark:text-sky-100 mb-12">
              ติดต่อ
            </h1>

            <div className="space-y-8">
              {/* Social Links */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-sky-900 dark:text-sky-300 mb-6">
                  ช่องทางการติดต่อ
                </h2>
                <div className="flex justify-center gap-8">
                  <a
                    href="https://www.facebook.com/flixzer04"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <Facebook size={48} />
                    <span className="text-sm">Facebook</span>
                  </a>
                  <a
                    href="https://x.com/flixzer_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <Twitter size={48} />
                    <span className="text-sm">Twitter</span>
                  </a>
                  <a
                    href="https://discord.com/users/itsflixzer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    <DiscordIcon size={48} />
                    <span className="text-sm">Discord</span>
                  </a>
                  <a
                    href="#"
                    className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      navigator.clipboard.writeText('gong1405');
                      alert('คัดลอก Line ID แล้ว: gong1405');
                    }}
                  >
                    <MessagesSquare size={48} />
                    <span className="text-sm">Line</span>
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-sky-900 dark:text-sky-300 mb-2">
                  ส่งข้อความ
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  (ส่งได้จริงนะ เห็นเร็วตอบเร็วด้วย)
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                      ชื่อ
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                      อีเมล
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="platform" className="block text-gray-700 dark:text-gray-300 mb-2">
                      แพลตฟอร์มสำหรับการติดต่อกลับ
                    </label>
                    <select
                      id="platform"
                      required
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value as ContactPlatform })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                    <label htmlFor="contactId" className="block text-gray-700 dark:text-gray-300 mb-2">
                      ID/ลิงค์สำหรับติดต่อ
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
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                      ข้อความ
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    ></textarea>
                  </div>
                  
                  {submitStatus === 'success' && (
                    <p className="text-green-600 dark:text-green-400">ส่งข้อความสำเร็จ!</p>
                  )}
                  
                  {submitStatus === 'error' && (
                    <p className="text-red-600 dark:text-red-400">เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อความ'}
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}