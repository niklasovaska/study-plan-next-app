import { Courses } from "@/types/course.types";

export async function getAllCourses(): Promise<Courses> {
    const res = await fetch(`${process.env.VERCEL_URL ? "https://" + process.env.VERCEL_URL : "http://localhost:3000"}/api/courses`)

    if(!res.ok) throw new Error(`Request failed: ${res.status}`)

    return await res.json()
}