"use client"

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Something went wrong!</h1>
      <p className="text-lg text-red-500">Please try again later.</p>
    </div>
  )
}
