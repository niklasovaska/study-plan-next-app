import { Courses } from "@/types/course.types"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const CourseTable = ({ courses }: Courses) => {

    return(
        <Table className="mx-auto min-w-[600px]">
            <TableCaption>A list of completed courses</TableCaption>
            <TableHeader>
                <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-center">Credits</TableHead>
                <TableHead className="text-center">Grade</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {courses.map((c) => (
                    <TableRow key={c._id}>
                        <TableCell>{c.code}</TableCell>
                        <TableCell>{c.name}</TableCell>
                        <TableCell className="text-center">{c.credits}</TableCell>
                        <TableCell className="text-center">{c.grade}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table> 
    )
}

export default CourseTable