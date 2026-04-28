import axios from 'axios';
import { User } from '../types/user';
import { MOCK_USERS } from './mockData';

// Simulate a network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const userService = {
  getUsers: async (): Promise<User[]> => {
    await delay(500);
    return MOCK_USERS;
  },

  getUserById: async (id: string): Promise<User | undefined> => {
    await delay(300);
    return MOCK_USERS.find((u) => u.id === id);
  },
};
