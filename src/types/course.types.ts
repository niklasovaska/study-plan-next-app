type Course = {
    _id: string
    name: string
    code: string
    credits: number
    grade?: string
    status: string
}

export type Courses = {
    courses: Course[]
}

export type CompletedCourse = {
    _id: string
    name: string
    code: string
    credits: number
    grade: string
    status: string
}

export type CourseTableProps = {
    courses: CompletedCourse[]
}

export type UpcomingCourse = {
    _id: string
    name: string
    code: string
    credits: number
    status: string
}

export type UpcomingCourses = {
    courses: UpcomingCourse[]
}

export type CourseCardProps = {
    course: UpcomingCourse
}

export type CourseBoardProps = {
    initialCourses: UpcomingCourse[]
}

export type SemesterColumnType = {
    id: string
    title: string
}

export type SemesterColumnProps = {
    column: SemesterColumnType
    courses: UpcomingCourse[]
}
