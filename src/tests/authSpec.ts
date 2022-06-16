import UserModel from '../models/user.model';
import db from '../database/database';
import User from '../types/user.types';

const userModel = new UserModel();

describe('Auth Module', () => {
  describe('Test methods exists', () => {
    it('should have an Authenticate User method', () => {
      expect(userModel.auth).toBeDefined();
    });
  });

  describe('Test auth method Logic', () => {
    const user = {
      email: 'a@a.com',
      user_name: 'ab',
      first_name: 'a',
      last_name: 'b',
      password: '123',
    } as User;

    beforeAll(async () => {
      await userModel.create(user);
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql =
        'DELETE FROM users;\nALTER SEQUENCE users_id_seq RESTART WITH 1;';
      await connection.query(sql);
      connection.release();
    });

    it('auth method return authenticated user', async () => {
      const authenticated = await userModel.auth(
        user.email,
        user.password as string
      );
      expect(authenticated?.email).toBe(user.email);
      expect(authenticated?.user_name).toBe(user.user_name);
      expect(authenticated?.first_name).toBe(user.first_name);
      expect(authenticated?.last_name).toBe(user.last_name);
    });

    it('Auth method should return null for not auth users', async () => {
      const authenticated = await userModel.auth('fakemail@mail.com', 'fake');
      expect(authenticated).toBe(null);
    });
  });
});
