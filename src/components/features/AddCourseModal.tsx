"use client"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useActionState, useState, useEffect } from "react"
import { createCourse } from "@/lib/actions"
import {  useQueryClient } from "@tanstack/react-query"


const AddCourseModal = () => {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  const [state, formAction, isPending] = useActionState(
    createCourse,
    { success: false })

  useEffect(() => {
      if(state.success) {
      queryClient.invalidateQueries({ queryKey: ["upcoming"] })
      setOpen(false)
      toast.success('Course successfully added')
    }
    }, [state.success])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <Button className="mb-6">Add course</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add a new course</DialogTitle>
            <DialogDescription>
              Add info and click save to add a new upcoming course
            </DialogDescription>
          </DialogHeader>

          <form action={formAction}>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Enter course name" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="code">Code</Label>
                <Input id="code" name="code" placeholder="Enter course code" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="credits">Credits</Label>
                <Input 
                  id="credits" 
                  type="number" 
                  min="1"
                  name="credits"
                  placeholder="Enter number of credits" 
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
            <div className="text-red-500 text-sm">
                {Array.isArray(state.error)
                    ? state.error[0]?.message
                    : state.error}
            </div>
          )}
        </DialogContent>
    </Dialog>
  )
}


export default AddCourseModal