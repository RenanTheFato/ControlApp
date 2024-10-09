import { randomUUID } from "crypto";
import { connection } from "../database/connection";
import daysj from 'dayjs';

export class generateRefreshToken{
  async execute(id_user: string){

    let id = await randomUUID().replace(/-/g,'').slice(0,16);
        
    //Check that the id that was generated isn't in use by another user, although the chances are low using a UUID generator, 
    //but nothing is impossible and this would break the code :D
    const [UUID] = await connection.query(`SELECT COUNT(*) AS count FROM ${process.env.TABLE3} WHERE id = ?`, [id]);
    const UUID_Find = (UUID as any)[0].count;

    if(UUID_Find > 0){
      id = await randomUUID().replace(/-/g,'').slice(0,16);
    };

    // Set the expiration date of the refresh token to 3 days from the current time
    const expires_at = daysj().add(3, "days").unix();

    // Insert the new refresh token into the refresh token table
    const generate = await connection.query(`INSERT INTO ${process.env.TABLE3} (id, expires_at, id_user) VALUES (?,?,?)`,
    [id, expires_at, id_user]);

    // Update the user table with the new refresh token ID
    await connection.query(`UPDATE ${process.env.TABLE1} SET refresh_token = ? WHERE id = ?`, [id, id_user]);

    return id;
  }
}