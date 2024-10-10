import { connection } from "../database/connection";
import { generateRefreshToken } from "../provider/generateRefreshToken";
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import dotenv from 'dotenv';

dotenv.config();

export class refreshTokenUserService{
  async execute(refresh_token: string){
    // Query the database to retrieve the refresh token information
    const [result] = await connection.query(`SELECT * FROM ${process.env.TABLE3} WHERE id = ?`,
    [refresh_token]);
    const refreshToken = (result as any)[0];

    // If no valid refresh token is found, throw an error
    if (!refreshToken) {
      throw new Error("Refresh token invalid.");
    }

    //Check if the refresh token has expired and generate a new JWT token
    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expires_at));
    const token = jwt.sign({ id: refreshToken.id_user }, process.env.JWTPASS ?? '', { expiresIn: '3d' });

    if (refreshTokenExpired) {
      await connection.query(`DELETE FROM ${process.env.TABLE3} WHERE id_user = ?`,
      [refreshToken.id_user]);

      // Generate a new refresh token for the user
      const GenerateRefreshToken = new generateRefreshToken();
      const newRefreshToken = GenerateRefreshToken.execute(refreshToken.id_user)

      return { token, newRefreshToken };
    }

    return { token };
  }
}