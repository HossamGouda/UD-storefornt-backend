import User from '../types/user.types';
import db from '../database/database';
import config from '../config';
import bcrypt from 'bcrypt'

const hashing = (password: string) => {
  const salt = parseInt(config.salt as string, 10);
  return bcrypt.hashSync(`${password}${config.pepper}`, salt);
}

class UserModel {
  // create
  async create(u: User): Promise<User> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `INSERT INTO users (email, user_name, first_name, last_name, password) values ($1, $2, $3, $4, $5) RETURNING id, email, user_name, first_name, last_name`;
      //run query
      const result = await cnx.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashing(u.password),
      ]);
      //close cnx
      cnx.release();
      //return created user
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to create user ${u.user_name}): ${(error as Error).message}`
      );
    }
  }
  //get all
  async getAll(): Promise<User[]> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `SELECT id ,email, user_name, first_name, last_name from users`;
      //run query

      const result = await cnx.query(sql);
      cnx.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `unable to get the requested user ${(error as Error).message}`
      );
    }
  }
  //get specifc user
  async user(id: string): Promise<User> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `SELECT id ,email, user_name, first_name, last_name from users WHERE id=($1)`;
      //run query

      const result = await cnx.query(sql, [id]);
      cnx.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to get the requested user ${id}  ${(error as Error).message}`
      );
    }
  }
  //update user
  async updateUser(u: User): Promise<User> {
    try {
      const cnx = await db.connect();
      const sql = `UPDATE users SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 WHERE id=($6) RETURNING id, email, user_name, first_name, last_name`;
      //run query
      const result = await cnx.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hashing(u.password),
        u.id,
      ]);
      cnx.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to update the requested user : ${(error as Error).message}`
      );
    }
  }

  //delete user

  async deleteUser(id: string): Promise<User> {
    try {
      //opn cnx
      const cnx = await db.connect();
      const sql = `DELETE FROM users WHERE id= ($1) RETURNING id, email, user_name, first_name, last_name`;
      //run query

      const result = await cnx.query(sql, [id]);
      cnx.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(
        `unable to delete the requested user ${id}  ${(error as Error).message}`
      );
    }
  }
  //authenticate user
}

export default UserModel;
