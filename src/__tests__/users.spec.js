import request from 'supertest';
import app from '../app.js';
import User from '../app/models/User.js';
import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the User model methods used by the route
vi.mock('../app/models/User.js', () => ({
  default: {
    findOrCreate: vi.fn(),
  },
}));

describe('POST /users', () => {
  beforeEach(() => {
    User.findOrCreate = vi.fn();
  });

  it('creates a new user when not exists', async () => {
    User.findOrCreate.mockResolvedValue([
      { id: '1', email: 'a@b', name: 'x' },
      true,
    ]);

    const res = await request(app)
      .post('/users')
      .send({ name: 'x', email: 'a@b', password: '123456' });

    expect(res.status).toBe(201);
    expect(res.body.email).toBe('a@b');
  });

  it('returns 200 when user exists', async () => {
    User.findOrCreate.mockResolvedValue([
      { id: '1', email: 'a@b', name: 'x' },
      false,
    ]);

    const res = await request(app)
      .post('/users')
      .send({ name: 'x', email: 'a@b', password: '123456' });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('User already exists');
  });

  it('returns 400 when missing fields', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'a@b', password: '123' });
    expect(res.status).toBe(400);
  });
});
