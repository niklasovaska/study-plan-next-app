"use server"

import connectToDatabase from "./db"
import Course from "@/models/Course"
import { createCourseSchema, completeCourseSchema } from "./validation"
import * as z from "zod"
import { revalidatePath } from "next/cache"

type CourseState = {
    success: boolean
    error?: string
}

export async function createCourse(prevState: CourseState, formData: FormData): Promise<CourseState> {

    try {
        const rawData = {
            name: formData.get("name"),
            code: formData.get("code"),
            credits: formData.get("credits") 
        }

        const parsedData = createCourseSchema.parse(rawData)

        await connectToDatabase()
        await Course.create({ ...parsedData,
            status: "upcoming"
         })

        revalidatePath("/")

        return { success: true }

    } catch (error: unknown) {
        if(error instanceof z.ZodError) {
            console.log('Error occured', error.issues)
            return { success: false, error: (error as any).issues }
        }
        console.log('Error occured', (error as Error).message)
        return { success: false, error: "Error in adding course to database"}
    }
}

export async function updateCourseStatus(courseId: string, newStatus: string) {
    try {
        await connectToDatabase()
        await Course.findByIdAndUpdate(courseId, { status: newStatus })

        revalidatePath("/")
        
    } catch (error: unknown) {
        if(error instanceof(Error)) {
            console.log('Error occured', error.message)    
        }
    }   
}

export async function deleteCourse(courseId: string) {
    try {
        await connectToDatabase()
        await Course.findByIdAndDelete(courseId)

    } catch (error: unknown) {
        if(error instanceof(Error)) {
            console.log('Error occured', error.message)    
        }
    }
}

export async function completeCourse(
    prevState: CourseState,
    formData: FormData): Promise<CourseState> {
    
    try {
        const rawData = {
            courseId: formData.get("id"),
            grade: formData.get("grade")
        }

        const parsedData = completeCourseSchema.parse(rawData)

        await connectToDatabase()
        await Course.findByIdAndUpdate(parsedData.courseId, { 
            grade: parsedData.grade,
            status: "completed"})

        revalidatePath("/")

        return { success: true }

    } catch (error: unknown) {
        if(error instanceof(z.ZodError)) {
            console.log('Error occured', error.issues)
            return { success: false, error: (error as any).issues }   
        }

        return { success: false, error: "Error in completing course"}
    }
}