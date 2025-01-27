import { Camera, Mail, MessageCircle, Twitter } from 'lucide-react';

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-sky-50 to-white dark:from-sky-950 dark:to-gray-900">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-950 dark:text-sky-100 mb-4">
          ก้อง (Soraaut Pluermtanom)
        </h1>
        <div className="flex items-center justify-center gap-2 text-sky-700 dark:text-sky-300 mb-6">
          <Camera size={24} />
          <h2 className="text-xl">Video Editor | Motion Graphics</h2>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          4+ ปีในสายตัดต่อ | 6+ ปีใน Motion Graphics
        </p>
        <blockquote className="text-xl italic text-sky-800 dark:text-sky-200 mb-12">
          "ไม่ใช่แค่สร้างผลงาน แต่คือการสร้างความประทับใจ"
        </blockquote>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.facebook.com/flixzer04"
            className="text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={24} />
          </a>
          <a
            href="https://x.com/flixzer_"
            className="text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter size={24} />
          </a>
          <a
            href="https://discord.com/users/itsflixzer"
            className="text-sky-600 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}