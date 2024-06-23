import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://gangwaramishi:CXjiI4m5xj42clps@cluster0.yzgcltm.mongodb.net/Craviour').then(() => console.log('DB connected'));
}

