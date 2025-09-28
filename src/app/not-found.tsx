import Link from "next/link"
import { Button } from "@/components/ui/button"


export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-center mb-4 text-gray-600">The page you are looking for does not exist.</p>
      <Link href='/'>
        <Button>Back to home</Button>
    </Link>
    </div>
  )
}