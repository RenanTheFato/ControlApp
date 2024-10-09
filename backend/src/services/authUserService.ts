import { connection } from "../database/connection";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv'
import { generateRefreshToken } from "../provider/generateRefreshToken";

interface AuthUserProps{
  email: string,
  password: string
}

export class authUserService{
  async execute({ email, password }: AuthUserProps){
    //Verification of user data from the database
    const [verifyEmail] = await connection.query(`SELECT * FROM ${process.env.TABLE1} WHERE email = ?`, [email]);
    const verifyUser = (verifyEmail as any)[0];

    if(!verifyUser){
      throw new Error("Invalid email or password");
    }

    //Compare the provided password with the hashed password from the database
    const verifyPass = await bcrypt.compare(password, verifyUser.password);

    if (!verifyPass) {
      throw new Error("Invalid email or password");
    }

    // Delete any existing refresh tokens for the user in the refresh token table and generate a new JWT token
    await connection.query(`DELETE FROM ${process.env.TABLE3} WHERE id_user = ?`,[verifyUser.id]);
    const token = jwt.sign({ id: verifyUser.id }, process.env.JWTPASS ?? '', { expiresIn: '3d' });

    const { password: _, ...userLogin } = verifyUser;

    // Call the method that will generate a new refresh token for the user
    const GenerateRefreshToken = new generateRefreshToken();
    const refreshToken = await GenerateRefreshToken.execute(verifyUser.id);

    console.log({ userLogin: userLogin, token: token, refresh: refreshToken});
    return {  userLogin, token: token, refresh: refreshToken};
  }
}