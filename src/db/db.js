import mongoose from "mongoose";
const connectDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongo db connect ho gya bsdk")
    } catch (error) {
        console.error("mongo db me error hai ya fir db.js me ", error)
        process.exit(1)
    }
}
export default connectDB;