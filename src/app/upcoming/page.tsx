"use client"

import UpcomingCourseBoard from "@/components/features/UpcomingCoursesBoard"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const UpcomingCourses = () => {

  return(
    <QueryClientProvider client={queryClient}>
      <UpcomingCourseBoard />
    </QueryClientProvider>
  )
}

export default UpcomingCourses