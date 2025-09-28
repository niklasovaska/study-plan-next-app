"use client"

import { UpcomingCourse } from "@/types/course.types"
import SemesterColumn from "@/components/features/SemesterColumn"
import AddCourseModal from "@/components/features/AddCourseModal"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { toast } from "sonner"
import { updateCourseStatus } from "@/lib/actions"
import { getUpcomingCourses } from "@/lib/api/getUpcomingCourses"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import LoadingCourseBoard from "../layout/LoadingCourseBoard"
import ErrorPage from "./ErrorPage"

const SEMESTER_COLUMNS = [
    { id: 'upcoming', title: 'Not scheduled' },
    { id: 'A25', title: 'Autumn 2025' },
    { id: 'S26', title: 'Spring 2026' },
]

const UpcomingCourseBoard = () => {
    const queryClient = useQueryClient()

    const { data, isLoading, error } = useQuery({
        queryKey: ["upcoming"],
        queryFn: getUpcomingCourses
    })

    const statusMutation = useMutation({
        mutationFn: async({ id, newStatus }: { id: string, newStatus: string}) =>
            await updateCourseStatus(id, newStatus),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["upcoming"] })
            toast.success('Course rescheduled')
        },
        onError: () => {
            toast.error('Error scheduling course')
        }
    })

    async function handleDragEnd(e: DragEndEvent) {
        const { active, over } = e

        if(!over) return

        const courseId = active.id as string
        const newStatus = over.id as UpcomingCourse['status']
        const activeColumnId = active.data.current?.columnId

        if(activeColumnId === newStatus) return

        statusMutation.mutate({ id: courseId, newStatus: newStatus })
    }

    if (isLoading) return <LoadingCourseBoard />

    if (error) return <ErrorPage />

    return(
        <div className="flex flex-col items-center p-4 mt-10">
            <AddCourseModal />
            <div className="flex gap-10 mt-10">
                <DndContext onDragEnd={handleDragEnd}>
                    {SEMESTER_COLUMNS.map((c) => (
                    <SemesterColumn
                        key={c.id}
                        column={c}
                        courses={(data?.courses ?? []).filter(course => course.status === c.id)}
                    />
                ))}
                </DndContext>
            </div>
        </div>
    )
}

export default UpcomingCourseBoard