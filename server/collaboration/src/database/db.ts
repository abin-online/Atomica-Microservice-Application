import mongoose from 'mongoose'
require('dotenv').config()
const dbString:string = process.env.COLLAB_MONGO_URL ||''
const connectDb= async ()=>{
    try {
        await mongoose.connect(dbString)
        .then((data:any)=>{console.log(`DB CONNECTED ON ${data.connection.host} 🍃`)})
        
    } catch (error:any) {
        console.log(error.message)
        setTimeout(connectDb,5000)
    }
}
export default connectDb