import { Project, Service } from './types';

export const projects: Project[] = [
  {
    name: 'PangBoyCH',
    period: '2564 - Now',
    role: 'Editor',
    channelUrl: 'https://www.youtube.com/@PangboyCH' 
  },
  {
    name: 'AONA CO., LTD. (EasyDonate)',
    period: '2566 - Now',
    role: 'Editor, Graphic Designer, Customer Service',
    channelUrl: 'https://www.youtube.com/@easydonate-th'
  },
  {
    name: 'FlixZer',
    period: '2567 - Now',
    role: 'Editor',
    channelUrl: 'https://www.youtube.com/@itsflixzer'
  },
];

export const services: Service[] = [
  {
    type: 'longform',
    basePrice: 600,
    pricePerMinute: 100,
    note: 'มีส่วนลดเมื่อ 15+ นาที',
  },
  {
    type: 'shortform',
    basePrice: 300,
    pricePerMinute: 50,
  },
  {
    type: 'monthly',
    basePrice: 0,
    contactRequired: true,
    features: [
      'ทุกอย่างในแพ็คเกจ Shortform และ Longform',
      'คุณภาพไฟล์ 1080p หรือ 4K',
      'จบงานในโปรเจคเดียวได้',
      'แก้ไขไม่จำกัด',
      'ความคุ้มค่าสูงสุดสำหรับงานต่อเนื่อง'
    ],
    note: 'ติดต่อสอบถามราคาแพ็กเกจรายเดือน',
  },
];