import { Courses } from "@/types/course.types";
import { getCoursesFromDb } from "@/lib/db";

export async function getAllCourses(): Promise<Courses> {
    return getCoursesFromDb();
}