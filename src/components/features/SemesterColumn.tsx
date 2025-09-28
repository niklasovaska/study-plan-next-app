import { SemesterColumnProps } from "@/types/course.types"
import CourseCard from "./CourseCard"
import { useDroppable } from "@dnd-kit/core"
import { calculateSemesterCredits } from "@/lib/utils"


const SemesterColumn = ({ column, courses }: SemesterColumnProps) => {
    const { setNodeRef, isOver } = useDroppable({
        id: column.id
    })

    const credits = calculateSemesterCredits(courses)

    return(
        <div className={`flex flex-col w-80 rounded-2xl bg-muted p-4 
            ${isOver ? 'bg-primary opacity-70' : ''}`}>
            <h2 className="self-center mb-4 font-bold">{column.title}</h2>
            <p className="self-center mb-4 text-sm text-muted-foreground">{credits} credits</p>
            <div 
                ref={setNodeRef} 
                className="flex flex-1 flex-col gap-4"
            >
                {courses.map((c) => (
                    <CourseCard
                        key={c._id} 
                        course={c}
                    />
                ))}
            </div>
        </div>
    )
}

export default SemesterColumn