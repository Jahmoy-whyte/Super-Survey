import mysql2 from "mysql2/promise";
import "dotenv/config";
const conn = mysql2.createPool(process.env.DATABASE_URL);

export default conn;
