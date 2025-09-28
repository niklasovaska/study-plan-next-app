import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

const LoadingCourseBoard = () => {
    return(
        <div className="flex flex-col items-center p-4 mt-10">
            <div className="flex gap-10">
                {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex flex-col w-80 rounded-2xl bg-muted p-4">
                    <h2 className="self-center mb-4 font-bold"></h2>
                    {Array.from({ length: 4}).map((_, j) => (
                        <Card key={j} className="mb-4">
                            <CardHeader className="flex items-center gap-4 justify-between space-y-0 pb-2">
                                <CardTitle>
                                    <Skeleton className="h-4 w-[200px]" />
                                </CardTitle>
                                <Skeleton className="h-12 w-12 rounded-full" />
                            </CardHeader>
                            <CardContent className="flex items-center gap-4 justify-between space-y-0">
                                <Skeleton className="h-4 w-[80px]" />
                                <Skeleton className="h-12 w-12 rounded-xl" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ))}
            </div>
        </div>
    )
}

export default LoadingCourseBoard

