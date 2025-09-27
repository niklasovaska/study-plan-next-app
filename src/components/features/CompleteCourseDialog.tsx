"use client"

import { Dialog, DialogContent, DialogTitle, DialogClose, DialogDescription } from "../ui/dialog"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { DialogHeader, DialogFooter } from "../ui/dialog"
import { Input } from "../ui/input"
import { completeCourse } from "@/lib/actions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { useCourseContext } from "@/context/CourseContext"
import { stat } from "fs"


type DialogProps = {
    id: string
    name: string
    open: boolean
    setOpen: (open: boolean) => void
}

const CompleteCourseDialog = ({ id, name, open, setOpen }: DialogProps) => {

    const [state, formAction, isPending] = useActionState(
        completeCourse, { success: false })
    
    const { setCourses } = useCourseContext()
    
    useEffect(() => {
        if (state.success) {
            if(state.data) {
                setCourses(state.data.courses)
            }
        setOpen(false)
        toast.success(`${name} completed`)
        }
    }, [state.success])

    return(
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form action={formAction}>
                    <DialogHeader className="mb-4">
                        <DialogTitle>Complete a course</DialogTitle>
                        <DialogDescription className="flex flex-col gap-2">
                            <span>Click save to complete:</span>
                            <span className="font-bold">{name}</span>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <input type="hidden" name="id" defaultValue={id} />
                            <Label htmlFor="credits">Grade</Label>
                            <Input 
                                id="grade" 
                                type="number" 
                                min="1"
                                max="5"
                                name="grade"
                                placeholder="Enter a grade" 
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button 
                            type="submit"
                            disabled={isPending}
                        >{isPending ? 'Saving...' : 'Save'}
                        </Button>
                    </DialogFooter>
                </form>
                {state.error && (
                <p className="text-red-500 text-sm">{state.error}</p>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default CompleteCourseDialog