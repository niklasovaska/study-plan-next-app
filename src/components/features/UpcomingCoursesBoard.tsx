"use client"

import { useEffect, useState } from "react"
import { UpcomingCourse, CourseBoardProps } from "@/types/course.types"
import SemesterColumn from "@/components/features/SemesterColumn"
import AddCourseModal from "@/components/features/AddCourseModal"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { toast } from "sonner"
import { updateCourseStatus } from "@/lib/actions"
import { getUpcomingCourses } from "@/lib/api/getUpcomingCourses"
import { useCourseContext } from "@/context/CourseContext"

const SEMESTER_COLUMNS = [
    { id: 'upcoming', title: 'Upcoming' },
    { id: 'A25', title: 'Autumn 2025' },
    { id: 'S26', title: 'Spring 2026' },
]

const UpcomingCourseBoard = ({ initialCourses }: CourseBoardProps) => {

    const { courses, setCourses } = useCourseContext()

    useEffect(() => {
        setCourses(initialCourses)
    }, [initialCourses, setCourses])

    async function handleDragEnd(e: DragEndEvent) {
        const { active, over } = e

        if(!over) return

        const courseId = active.id as string
        const newStatus = over.id as UpcomingCourse['status']
        const activeColumnId = active.data.current?.columnId

        if(activeColumnId === newStatus) return

        setCourses(
            courses.map(c => 
                c._id === courseId ? { ...c, status: newStatus, } : c
            )
        )

        const courseUpdate = await updateCourseStatus(courseId, newStatus)

        if(courseUpdate) {
            const latestData = await getUpcomingCourses()
            setCourses(latestData.courses)
            toast.success('Course rescheduled')
        } else {
            toast.error('Error scheduling course')
        }
    }

    return(
        <div className="flex flex-col items-center p-4 mt-10">
            <AddCourseModal />
            <div className="flex gap-10">
                <DndContext onDragEnd={handleDragEnd}>
                    {SEMESTER_COLUMNS.map((c) => (
                    <SemesterColumn
                        key={c.id}
                        column={c}
                        courses={courses.filter(course => course.status === c.id)}
                    />
                ))}
                </DndContext>
            </div>
        </div>
    )
}

export default UpcomingCourseBoard