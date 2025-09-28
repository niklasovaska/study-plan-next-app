import mongoose from "mongoose";
import { Courses } from "@/types/course.types";
import Course from "@/models/Course";

let isConnected = false;

const connectToDatabase = async () => {
    if (isConnected) return
    
    try {
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) {
            throw new Error('MONGO_URL environment variable is not defined')
        }
        await mongoose.connect(mongoUrl);
        isConnected = true;

    } catch (error: unknown) {
        if(error instanceof Error) {
           throw new Error('error connecting to MongoDB' + error.message) 
        }
    }
}

export default connectToDatabase


export async function getCoursesFromDb(): Promise<Courses> {
    try {
        await connectToDatabase();
        const courses = await Course.find();
        return { courses };
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw new Error("Error fetching courses from database");
    }
}