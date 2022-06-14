import UserModel from '../../models/user.model';
import db from '../../database/database';
import User from '../../types/user.types';

const userModel = new UserModel();

describe('User Model', () => {
  describe('Test methods in the user model', () => {
    it('should return all users', () => {
      expect(userModel.getAll).toBeDefined();
    });

    it('should return one user', () => {
      expect(userModel.user).toBeDefined();
    });

    it('Should have creat method', () => {
      expect(userModel.create).toBeDefined();
    });

    it('Should have creat update user method', () => {
      expect(userModel.updateUser).toBeDefined();
    });

    it('should have a Delete User method', () => {
      expect(userModel.deleteUser).toBeDefined();
    });

    it('should have an Authenticatation User method', () => {
      expect(userModel.auth).toBeDefined();
    });
  });

  describe('Test User Model Logic', () => {
    const user = {
      email: 'gouda@h.com',
      user_name: 'hos',
      first_name: 'Hossam',
      last_name: 'Gouda',
      password: '321',
    } as User;

    beforeAll(async () => {
      const createdUser = await userModel.create(user);
      user.id = createdUser.id;
    });

    afterAll(async () => {
      const connection = await db.connect();
      const sql = 'DELETE FROM users;';
      await connection.query(sql);
      connection.release();
    });

    it('Create method should return a New User', async () => {
      const newUser = await userModel.create({
        email: 'a@b.com',
        user_name: 'ab',
        first_name: 'a',
        last_name: 'b',
        password: '123',
      } as User);
      expect(newUser).toEqual({
        id: newUser.id,
        email: 'a@b.com',
        user_name: 'ab',
        first_name: 'a',
        last_name: 'b',
      } as User);
    });

    it('Get All method should return all users available in DB', async () => {
      const users = await userModel.getAll();
      expect(users.length).toBe(2);
    });

    it('Get user method should return ab when called with ID', async () => {
      const retrieved = await userModel.user(user.id as number);
      expect(retrieved.id).toBe(user.id);
      expect(retrieved.email).toBe(user.email);
      expect(retrieved.user_name).toBe(user.user_name);
      expect(retrieved.first_name).toBe(user.first_name);
      expect(retrieved.last_name).toBe(user.last_name);
    });

    it('Update user  method should return a user with the new data', async () => {
      const updatedUser = await userModel.updateUser({
        ...user,
        user_name: 'updated',
        first_name: 'h',
        last_name: 'G',
      });
      expect(updatedUser.id).toBe(user.id);
      expect(updatedUser.email).toBe(user.email);
      expect(updatedUser.user_name).toBe('updated');
      expect(updatedUser.first_name).toBe('h');
      expect(updatedUser.last_name).toBe('G');
    });

    it('Delete user method should delete user from DB', async () => {
      const deletedUser = await userModel.deleteUser(user.id as number);
      expect(deletedUser.id).toBe(user.id);
    });
  });
});