import { Project, Service, QueueItem } from './types';

export const projects: Project[] = [
  {
    name: 'PangboyCH',
    period: '2564 - Now',
    role: 'Editor',
    channelId: 'https://yt3.googleusercontent.com/5OtqZqHMN2pK5SPGTw4e_bl5UDpBJ4CQX_Nq5LvJwXGhHgqxpZ5GNkF7QyLyGnGUxPxRxwvQ=s176-c-k-c0x00ffffff-no-rj'
  },
  {
    name: 'AONA',
    period: '2566 - Now',
    role: 'Editor, Graphic Designer, Customer Service',
  },
  {
    name: 'MTR Mysterios',
    period: '2566 - Now',
    role: 'Editor',
  },
  {
    name: 'Mabelle.a',
    period: '2567 - Now',
    role: 'Editor',
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
];

export const queueItems: QueueItem[] = [
  {
    id: '1',
    clientName: 'PangboyCH',
    projectType: 'longform',
    description: 'Highlight Stream งาน Charity',
    status: 'in_progress',
    progress: 60,
    dueDate: '2024-03-20',
    priority: 1
  },
  {
    id: '2',
    clientName: 'AONA',
    projectType: 'shortform',
    description: 'Shorts รีวิวร้านอาหาร EP.5',
    status: 'pending',
    progress: 0,
    dueDate: '2024-03-25',
    priority: 2
  },
  // เพิ่มข้อมูลตัวอย่างตามต้องการ
];