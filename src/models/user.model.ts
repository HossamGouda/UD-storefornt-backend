import User from '../types/user.types'
import db from '../database/database'

class UserModel {
  //create
  async create(u: User): Promise<User> {
    try {
      //opn cnx
      const cnx = await db.connect()
      const sql = `INSERT INTO USERS (email,user_name,first_name,last_name,password)
       values ($1,$2,$3,$4,$5) returning *`
      //run query
      const result = await cnx.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        u.password,
      ])
      //close cnx
      cnx.release()
      //return created user
      return result.rows[0]
    } catch (error) {
      throw new Error('unable to create user')
    }
  }
  //get all
  //get specifc user
  //update user
  //delete user
  //authenticate user
}

export default UserModel
