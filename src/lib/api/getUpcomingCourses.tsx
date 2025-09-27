import { UpcomingCourses } from "@/types/course.types";


export async function getUpcomingCourses(): Promise<UpcomingCourses> {
    const res = await fetch('http://localhost:3000/api/upcoming')

    if(!res.ok) throw new Error(`Request failed: ${res.status}`)

    return await res.json()
}