import { Courses } from "@/types/course.types";

export async function getAllCourses(): Promise<Courses> {
    const res = await fetch(`/api/courses`)

    if(!res.ok) throw new Error(`Request failed: ${res.status}`)

    return await res.json()
}