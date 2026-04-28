import axios from 'axios';
import type { User } from '../types/user';
import { MOCK_USERS } from './mockData';
import { storage } from '../utils/storage';

const USERS_KEY = 'lendsqr_users';

// Initialize users in storage if not exists
const initializeUsers = () => {
  const existing = storage.get(USERS_KEY);
  if (!existing) {
    storage.save(USERS_KEY, MOCK_USERS);
    return MOCK_USERS;
  }
  return existing;
};

// Simulate a network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const userService = {
  login: async (email: string): Promise<boolean> => {
    await delay(1000);
    return !!email;
  },

  getUsers: async (): Promise<User[]> => {
    await delay(500);
    return initializeUsers();
  },

  getUserById: async (id: string): Promise<User | undefined> => {
    await delay(300);
    const users = initializeUsers();
    return users.find((u: User) => u.id === id);
  },

  updateUserStatus: async (id: string, status: User['status']): Promise<User | null> => {
    await delay(300);
    const users = initializeUsers();
    const index = users.findIndex((u: User) => u.id === id);
    if (index !== -1) {
      users[index].status = status;
      storage.save(USERS_KEY, users);
      return users[index];
    }
    return null;
  }
};
