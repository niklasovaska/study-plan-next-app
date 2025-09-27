import UpcomingCourseBoard from "@/components/features/UpcomingCoursesBoard"
import { getUpcomingCourses } from "@/lib/api/getUpcomingCourses"
import { CourseProvider } from "@/context/CourseContext"

const UpcomingCourses = async () => {

  const courses = await getUpcomingCourses()

  return(
    <CourseProvider>
      <UpcomingCourseBoard initialCourses={courses.courses}/>
    </CourseProvider>
  )
}

export default UpcomingCourses