import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import { projects } from '../data';
import portfolioImg from '../assets/portfolio.png';

export default function Portfolio() {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* Header Section with Image */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div className="w-full md:w-1/2">
                <h1 className="text-4xl font-bold text-sky-950 dark:text-sky-100 mb-8">
                  ผลงานของฉัน
                </h1>

                <a
                  href="https://youtube.com/playlist?list=PL8jTaMUfEIynMbNlQG1TywiUGeB8wCcWu&si=GsaPaJ5Juj6EmG1q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
                >
                  ดูตัวอย่างผลงานทั้งหมด
                  <ExternalLink size={20} />
                </a>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full md:w-1/3 max-w-md"
              >
                <img
                  src={portfolioImg}
                  alt="Portfolio Preview"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </motion.div>
            </div>

            {/* Current Projects */}
            <h2 className="text-2xl font-semibold text-sky-900 dark:text-sky-300 mb-6">
              โปรเจกต์ปัจจุบัน
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-sky-900 dark:text-sky-300 mb-2">
                        {project.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">{project.period}</p>
                      <p className="text-sky-600 dark:text-sky-400">{project.role}</p>
                    </div>
                    {project.channelId && (
                      <div className="flex-shrink-0">
                        <img
                          src={project.channelId}
                          alt={`${project.name} Channel`}
                          className="w-16 h-16 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(project.name)}&background=0369a1&color=fff`;
                          }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}