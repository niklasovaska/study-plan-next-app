import { Dialog, DialogContent, DialogTitle, DialogClose, DialogDescription, DialogHeader, DialogFooter } from "../ui/dialog"
import { Button } from "../ui/button"
import { deleteCourse } from "@/lib/actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DialogProps } from "@/types/course.types"
import { toast } from "sonner"

const DeleteCourseDialog = ({ id, name, open, setOpen }: DialogProps) => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
    mutationFn: async({ id }: { id: string } ) =>
        await deleteCourse(id),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["upcoming"] })
        setOpen(false)
        toast.info('Course successfully deleted')
    },
    onError: () => {
        toast.error('Error in deleting course')
    }

    })

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader className="mb-4">
                        <DialogTitle>Delete course</DialogTitle>
                        <DialogDescription className="flex flex-col gap-4">
                            <span>Are you sure you want to delete course?</span>
                            <span className="font-bold">{name}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-4">
                        <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            onClick={() => mutate({ id })} 
                            type="submit"
                            variant="destructive"
                            disabled={isPending}
                        >{isPending ? 'Deleting...' : 'Delete'}
                        </Button>
                    </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteCourseDialog