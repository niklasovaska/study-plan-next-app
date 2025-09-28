import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function calculateGPA(courses: { credits: number; grade: string }[]) {
    const nom = courses.reduce((sum, c) => sum += c.credits * parseInt(c.grade), 0)
    const denom = courses.reduce((sum, c) => sum += c.credits, 0)
    return (nom / denom).toFixed(1)
}


export function getStats(courses: { credits: number; grade?: string; status: string }[]) {
    const allCredits = courses.reduce((sum, course) => {
        return sum += course.credits
    }, 0)

    const completedCourses = courses.filter((course) => course.status === 'completed')
    
    const completedCoursesWithGrades = completedCourses
        .filter((course) => course.grade !== 'pass' && course.grade !== undefined)
        .map((course) => ({ credits: course.credits, grade: course.grade as string }));

    const completedCredits = completedCourses.reduce((sum, course) => {
        return sum += course.credits
    }, 0)

    const progressPercentage = (completedCredits / allCredits) * 100

    const weightedAverage = calculateGPA(completedCoursesWithGrades)

    return {
        allCredits,
        completedCredits,
        progressPercentage: progressPercentage.toFixed(0),
        gpa: weightedAverage
    }
}

export function calculateSemesterCredits(courses: { credits: number }[]) {
    return courses.reduce((sum, course) => {
        return sum += course.credits
    }, 0)
}