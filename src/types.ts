export type Project = {
  name: string;
  period: string;
  role: string;
  channelId?: string;
  channelUrl?: string; // เพิ่ม field สำหรับ YouTube channel URL
};

export type Service = {
  type: 'longform' | 'shortform' | 'monthly';
  basePrice: number;
  pricePerMinute?: number;
  note?: string;
  features?: string[];
  contactRequired?: boolean;
};

export type QueueStatus = 'pending' | 'in_progress' | 'reviewing' | 'completed';

export type QueueItem = {
  id: string;
  clientName: string;
  projectType: 'longform' | 'shortform';
  description: string;
  status: QueueStatus;
  progress: number;
  dueDate: string;
  priority: number;
};