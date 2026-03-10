import { create } from 'zustand';

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface AppState {
  user: User;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

export const useAppStore = create<AppState>((set) => ({
  user: {
    name: 'Karim Thabet',
    email: 'thabetkarim07@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Karim',
  },
  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
  notifications: [
    {
      id: '1',
      title: 'Video Approved',
      message: 'Your submission "Funny Cat vs Cucumber" has been approved.',
      type: 'success',
      timestamp: new Date(),
      read: false,
    },
    {
      id: '2',
      title: 'New Submission',
      message: 'A new user video is waiting for review.',
      type: 'info',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
  ],
  addNotification: (n) => set((state) => ({ notifications: [n, ...state.notifications] })),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
}));
