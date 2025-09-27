import { Courses, CourseTableProps } from "@/types/course.types"

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
        <div className='m-10'>
           <Table>
                <TableCaption>A list of completed courses</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[100px]">Code</TableHead>
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
        </div>
    )
}

export default CourseTable