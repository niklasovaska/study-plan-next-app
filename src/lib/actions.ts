"use server"

import connectToDatabase from "./db"
import Course from "@/models/Course"
import { revalidatePath } from "next/cache"
import { getUpcomingCourses } from "./api/getUpcomingCourses"

type CourseState = {
    success: boolean
    error?: string
    data?: Awaited<ReturnType<typeof getUpcomingCourses>>
}

export async function createCourse(prevState: CourseState, formData: FormData): Promise<CourseState> {

    try {
        const name = formData.get("name") as string
        const code = formData.get("code") as string
        const creditsRaw = formData.get("credits") as string

        if(typeof name !== "string"|| name.trim().length < 1) {
            return { success: false, error: "Course name cannot be empty"}
        }

        if(typeof code !== "string"|| code.trim().length < 1) {
            return { success: false, error: "Course code cannot be empty"}
        }

        let credits: number | null = null

        if(typeof creditsRaw === "string" && code.trim() !== "") {
            credits = Number(creditsRaw)
            if(isNaN(credits)) {
                return { success: false, error: "Credits must be a number"}
            }
        }

        await connectToDatabase()
        await Course.create({
            name: name.trim(),
            code: code.trim(),
            credits: credits,
            status: "upcoming"
        })

        const latestData = await getUpcomingCourses()

        return { success: true, data: latestData }

    } catch (error: unknown) {
        if(error instanceof(Error)) {
            console.log('Error occured', error.message)
        }
        return { success: false, error: "Error in adding course to database"}
    }
}

export async function updateCourseStatus(courseId: string, newStatus: string): Promise<Boolean> {
    try {
        await connectToDatabase()
        await Course.findByIdAndUpdate(courseId, { status: newStatus })
        revalidatePath("/upcoming")
        revalidatePath("/")

        return true

    } catch (error: unknown) {
        if(error instanceof(Error)) {
            console.log('Error occured', error.message)    
        }

        return false
    }   
}

export async function completeCourse(
    prevState: CourseState,
    formData: FormData): Promise<CourseState> {
    
    try {
        const newGrade = formData.get("grade") as string
        const id = formData.get("id") as string

        if(typeof newGrade !== "string"|| newGrade.trim().length < 1) {
            return { success: false, error: "Grade cannot be empty"}
        }

        await connectToDatabase()
        await Course.findByIdAndUpdate(id, { 
            grade: newGrade,
            status: "completed"})
        
        const latestData = await getUpcomingCourses()

        revalidatePath("/")

        return { success: true, data: latestData }

    } catch (error: unknown) {
        if(error instanceof(Error)) {
            console.log('Error occured', error.message)    
        }

        return { success: false, error: "Error in completing course"}
    }
}