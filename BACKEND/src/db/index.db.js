import mongoos from "mongoose"
import { DB_NAME } from "../constants.js"
import dotenv from "dotenv/config.js"

const connectDB = async () => {
    try {
       const connInstance =  await mongoos.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(connInstance.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export default connectDB