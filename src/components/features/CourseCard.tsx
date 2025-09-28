"use client"

import { CourseCardProps } from "@/types/course.types"
import { useDraggable } from "@dnd-kit/core"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Check, Trash2, Grip, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CompleteCourseDialog from "./CompleteCourseDialog"
import DeleteCourseDialog from "./DeleteCourseDialog"
import { useState } from "react"
import { cn } from "@/lib/utils"

const CourseCard = ({ course }: CourseCardProps) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: course._id,
        data: { columnId: course.status }
    })

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined


    const [completeOpen, setCompleteOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    return(
        <Card
            ref={setNodeRef}
            {...attributes}
            style={style} 
            className={cn("shadow-sm hover:shadow-md bg-secondary border border-neutral-500",
                isDragging && "opacity-90"
            )}
        > 
            <CardHeader className="flex items-center gap-4 justify-between space-y-0 pb-2">
                <CardTitle>{course.name}</CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                            <ChevronDown 
                                className="rounded-lg hover:bg-primary"
                            />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem 
                            onClick={(e) => {
                                e.stopPropagation()
                                setCompleteOpen(true)
                            }}
                        >
                            Complete
                            <DropdownMenuShortcut>
                                <Check size={16}/> 
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={(e) => {
                                e.stopPropagation()
                                setDeleteOpen(true)
                            }}
                        >
                            Delete
                            <DropdownMenuShortcut><Trash2 size={16} /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                    
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader> 
            <CardContent className="flex items-center gap-4 justify-between space-y-0">
                <div>
                    {course.credits} credits
                </div>
                <CompleteCourseDialog
                    id={course._id}
                    name={course.name}
                    open={completeOpen}
                    setOpen={setCompleteOpen}
                />
                <DeleteCourseDialog 
                    id={course._id}
                    name={course.name}
                    open={deleteOpen}
                    setOpen={setDeleteOpen}
                />
                <Grip {...listeners} className="cursor-grab"/>
            </CardContent>
        </Card>
    )
}

export default CourseCard