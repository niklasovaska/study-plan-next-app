"use client"

import { Dialog, DialogContent, DialogTitle, DialogClose, DialogDescription, DialogHeader, DialogFooter } from "../ui/dialog"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { completeCourse } from "@/lib/actions"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import {  useQueryClient } from "@tanstack/react-query"
import { DialogProps } from "@/types/course.types"

const CompleteCourseDialog = ({ id, name, open, setOpen }: DialogProps) => {
    const queryClient = useQueryClient()

    const [state, formAction, isPending] = useActionState(
        completeCourse, { success: false })

    useEffect(() => {
        if(state.success) {
        queryClient.invalidateQueries({ queryKey: ["upcoming"] })
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
                        <DialogDescription className="flex flex-col gap-4">
                            <span>Enter grade and click save to complete</span>
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
                    <DialogFooter className="mt-4">
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