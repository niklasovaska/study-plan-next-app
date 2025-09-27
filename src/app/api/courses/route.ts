import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Course from "@/models/Course";

export const GET = async () => {
    try {
        await connectToDatabase()
        const courses = await Course.find()

        return NextResponse.json({ courses })

    } catch (error) {
        return new NextResponse('Error in fetching course data' + (error as Error).message, { status: 500 })
    }
}

