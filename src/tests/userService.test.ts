import { describe, it, expect, vi } from 'vitest';
import { userService } from '../services/api';

describe('userService', () => {
  it('should fetch 500 users', async () => {
    const users = await userService.getUsers();
    expect(users).toHaveLength(500);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('userName');
  });

  it('should fetch a single user by ID', async () => {
    const users = await userService.getUsers();
    const targetUser = users[0];
    const user = await userService.getUserById(targetUser.id);
    expect(user).toBeDefined();
    expect(user?.id).toBe(targetUser.id);
  });

  it('should return undefined for a non-existent user ID', async () => {
    const user = await userService.getUserById('non-existent-id');
    expect(user).toBeUndefined();
  });
});
