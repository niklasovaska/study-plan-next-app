import { Courses } from "@/types/course.types";

export async function getAllCourses(): Promise<Courses> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ""}/api/courses`)

    if(!res.ok) throw new Error(`Request failed: ${res.status}`)

    return await res.json()
}