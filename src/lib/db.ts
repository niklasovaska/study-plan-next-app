import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) {
            throw new Error('MONGO_URL environment variable is not defined')
        }
        await mongoose.connect(mongoUrl);
        console.log('connected to MongoDB')
    } catch (error: unknown) {
        if(error instanceof Error) {
           throw new Error('error connecting to MongoDB' + error.message) 
        }
    }
}

export default connectToDatabase