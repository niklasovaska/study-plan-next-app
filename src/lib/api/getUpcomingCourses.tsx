import { UpcomingCourses } from "@/types/course.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export async function getUpcomingCourses(): Promise<UpcomingCourses> {
    const res = await fetch(`${API_URL}/api/upcoming`)

    if(!res.ok) throw new Error(`Request failed: ${res.status}`)

    return await res.json()
}