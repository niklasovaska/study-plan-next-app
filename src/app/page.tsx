import { getAllCourses } from "@/lib/api/getAllCourses";
import CourseTable from "@/components/features/CourseTable";

export default async function Home() {
  const courses = await getAllCourses()
  
  const completedCourses = courses.courses?.filter(c => 'grade' in c)

  return (
    <div className="p-10">
      <CourseTable courses={completedCourses}/>
    </div>
  );
}
