import mongoose from "mongoose";

export const connectDB= async ()=>{
    await mongoose.connect('mongodb+srv://RC:166595@joykoly-ecommerce.0lni41j.mongodb.net/Joykoly-Book').then(()=>console.log("DB Connected"))
}