import { Courses } from "@/types/course.types";
import { Card, CardContent, CardTitle } from "../ui/card"
import { getStats } from "@/lib/utils";
import { GraduationCap, TrendingUp, Gem, LucideIcon} from "lucide-react"

type StatCardProps = {
  title: string
  content: React.ReactNode
  icon: LucideIcon
}

const StatCard = ({ title, content, icon: Icon }: StatCardProps) => {
    return (
        <Card className="flex flex-col items-center rounded-2xl p-6 border-l-4 border-primary shadow-sm hover:shadow-md transition">
            <Icon className="w-10 h-10 text-primary mb-2" />
            <CardTitle className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
                {title}
                </CardTitle>
            <CardContent className="text-3xl font-bold text-foreground mt-2">
                {content}
            </CardContent>
        </Card>
    );
}


const StatsBox = ({ courses }: Courses) => {

    const { allCredits, completedCredits, progressPercentage, gpa: weightedAverage } = getStats(courses)

    return(
        <div className="flex content-center gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 p-10 mt-6 w-full">
                <StatCard title="Progress" content={`${progressPercentage} %`} icon={GraduationCap}/>
                <StatCard title="Credits" content={`${completedCredits} / ${allCredits}`} icon={TrendingUp}/>
                <StatCard title="GPA" content={weightedAverage} icon={Gem}/>
            </div>
            
        </div>
    )
}

export default StatsBox