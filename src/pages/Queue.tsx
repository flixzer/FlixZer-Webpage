import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import PageTransition from '../components/PageTransition';

type Status = 'WIP' | 'Done';

type QueueItem = {
  id: string;
  orderNo: number;
  date: string;
  client: string;
  project: string;
  noted: string;
  postDate: string;
  status: Status;
};

const statusColors = {
  'WIP': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'Done': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
};

const statusLabels = {
  'WIP': 'กำลังทำ',
  'Done': 'เสร็จแล้ว'
};

export default function Queue() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>([]);
  
  useEffect(() => {
    async function fetchQueueData() {
      try {
        const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID;
        const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A2:G?key=${API_KEY}`
        );
        const data = await response.json();
        
        console.log('Sheet Data:', data);

        if (data.values) {
          const items = data.values.map((row: any[], index: number) => {
            const client = row[2] || data.values[index - 1]?.[2] || '';
            const project = row[3] || data.values[index - 1]?.[3] || '';
            const noted = row[4] || data.values[index - 1]?.[4] || '';
            const postDate = row[5] || data.values[index - 1]?.[5] || '';

            return {
              id: Math.random().toString(36).substr(2, 9),
              orderNo: parseInt(row[0]),
              date: row[1] || '',
              client: client,
              project: project,
              noted: noted,
              postDate: postDate,
              status: row[6] as Status
            };
          });
          
          setQueueItems(items);
        }
      } catch (error) {
        console.error('Error fetching queue data:', error);
      }
    }
    
    fetchQueueData();
    const interval = setInterval(fetchQueueData, 30000);
    return () => clearInterval(interval);
  }, []);

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  // เพิ่มฟังก์ชันแปลงวันที่
  function formatThaiDate(dateStr: string) {
    try {
      // แปลงจาก dd/mm/yyyy เป็น Date object
      const [day, month, year] = dateStr.split('/');
      const date = new Date(parseInt('25' + year), parseInt(month) - 1, parseInt(day));
      
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }

      return date.toLocaleDateString('th-TH', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).replace(/\//g, '/');
    } catch {
      return 'Invalid Date';
    }
  }

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold text-sky-950 dark:text-sky-100 mb-8">
              คิวงานปัจจุบัน
            </h1>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ลำดับ</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">วันที่รับงาน</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ลูกค้า</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">โปรเจค</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ประเภท</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">กำหนดส่ง</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {queueItems
                    .sort((a, b) => a.orderNo - b.orderNo)
                    .map((item, index) => (
                      <tr 
                        key={item.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {item.date ? formatThaiDate(item.date) : ''}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-gray-100">
                            {item.client}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 dark:text-gray-100">
                            {item.project}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-gray-100">
                            {item.noted}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className={
                              isOverdue(item.postDate) && item.status !== 'Done'
                                ? 'text-red-500'
                                : 'text-gray-400'
                            } />
                            <span className={`text-sm ${
                              isOverdue(item.postDate) && item.status !== 'Done'
                                ? 'text-red-500'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {formatThaiDate(item.postDate)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[item.status]}`}>
                            {statusLabels[item.status]}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
} 