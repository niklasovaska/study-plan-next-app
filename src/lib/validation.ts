import * as z from "zod"

export const createCourseSchema = z.object({
    name: z.string().min(1, 'Course name is required'),
    code: z.string().min(1, 'Course code is required'),
    credits: z.string().refine((val) => {
        const num = Number(val)
        return !isNaN(num) && num > 0
    }, { message: 'Credits must be a positive number' }),
})

export type CreateCourseInput = z.infer<typeof createCourseSchema>

export const completeCourseSchema = z.object({
    courseId: z.string().min(1, 'Course ID is required'),
    grade: z.string().refine((val) => {
        const num = Number(val)
        return !isNaN(num) && num >= 0 && num <= 5
    }, { message: 'Grade must be a number between 0 and 5'})    
})

export type CompleteCourseInput = z.infer<typeof completeCourseSchema>