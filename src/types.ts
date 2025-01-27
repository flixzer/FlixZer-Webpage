export type Project = {
  name: string;
  period: string;
  role: string;
  channelId?: string;
};

export type Service = {
  type: 'longform' | 'shortform';
  basePrice: number;
  pricePerMinute: number;
  note?: string;
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