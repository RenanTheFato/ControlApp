import { connection } from "../database/connection";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv'

interface AuthUserProps{
  email: string,
  password: string
}

export class authUserService{
  async execute({ email, password }: AuthUserProps){
    const [verifyEmail] = await connection.query(`SELECT * FROM ${process.env.TABLE1} WHERE email = ?`, [email]);
    const verifyUser = (verifyEmail as any)[0];

    if(!verifyUser){
      throw new Error("Invalid email or password");
    }

    const verifyPass = await bcrypt.compare(password, verifyUser.password);

    if (!verifyPass) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: verifyUser.id }, process.env.JWTPASS ?? '', { expiresIn: '3d' });

    const { password: _, ...userLogin } = verifyUser;
    
    console.log({ userLogin: userLogin, token: token });
    return { user: userLogin, token: token };
  }
}