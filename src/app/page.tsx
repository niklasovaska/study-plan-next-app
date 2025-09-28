import { getAllCourses } from "@/lib/api/getAllCourses";
import CourseTable from "@/components/features/CourseTable";
import StatsBox from "@/components/features/StatsBox";

export default async function Home() {
  const courses = await getAllCourses()
  
  const completedCourses = courses.courses?.filter(c => 'grade' in c)

  return (
    <div className="flex flex-col items-center p-10">
      <StatsBox courses={courses.courses} />
      <div className="w-full flex justify-center mt-8">
        <div className="w-full max-w-7xl overflow-x-auto">
          <CourseTable courses={completedCourses}/>
        </div>
      </div>
    </div>
  );
}
