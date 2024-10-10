import { connection } from "../database/connection";
import cron from 'node-cron';

// This code will cause expired OTP tokens to be deleted, thus, hopefully, improving performance and optimization, 
//as we avoid fake emails and overcrowding the database, which could be a problem
export class automaticRemoveOtpExpired{
   static execute(){
    cron.schedule('*/1 * * * *', async () => {
      const currentTime = new Date();
      try {
        await connection.query(`DELETE FROM ${process.env.TABLE2} WHERE expires_at < ?`, [currentTime]);
        console.log(`[${new Date().toLocaleTimeString()}] Expired tokens removed.`);
      } catch (error) {
        console.error("Error while removing expired tokens: ", error);
      }
    });
    console.log(`[${new Date().toLocaleTimeString()}] Delete OTP function has called.`);
  }
}