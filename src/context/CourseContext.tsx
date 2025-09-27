"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { UpcomingCourse } from "@/types/course.types"


type CourseContextType = {
    courses: UpcomingCourse[]
    setCourses: (latestData: UpcomingCourse[]) => void
}

const CourseContext = createContext<CourseContextType | undefined>(undefined)

export const CourseProvider = ({ children }: { children: ReactNode}) => {
    const [courses, setCoursesState] = useState<UpcomingCourse[]>([])

    const setCourses = (latestData: UpcomingCourse[]) => {
        setCoursesState(latestData)
    }

    return(
        <CourseContext.Provider value={{ courses, setCourses }}>
            {children}
        </CourseContext.Provider>
    )
}

export const useCourseContext = () => {
    const context = useContext(CourseContext)
    if(!context) {
        throw new Error("useCourseContext must be used inside CourseProvider")
    }
    return context
}