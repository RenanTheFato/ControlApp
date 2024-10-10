import {connection} from '../database/connection';
import dotenv from 'dotenv';

dotenv.config();

interface createUserProps{
  id: string,
  username: string,
  email: string,
  password: string,
  generateOTPCreateAccount: string, 
  otpCreateAccountExpirationTime: Date
}

//Here the data is inserted into the temporary table from the controller
export class createUserService{
  async execute({id, username, email, password, generateOTPCreateAccount, otpCreateAccountExpirationTime}: createUserProps){
    try {
      const [result] = await connection.query(`INSERT INTO ${process.env.TABLE2} (id_user, username, email, password, otp_code, expires_at) VALUES (?,?,?,?,?,?)`,
      [id, username ,email, password ,generateOTPCreateAccount, otpCreateAccountExpirationTime]
      );

      console.log(result);
      
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}