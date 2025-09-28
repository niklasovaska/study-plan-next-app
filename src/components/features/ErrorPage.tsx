import { Button } from "../ui/button"

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">There was an error</h1>
            <p className="text-lg mb-6">Sorry, something went wrong while fetching data.</p>
            <Button className="px-4 py-2" onClick={() => window.location.reload()}>
                Retry
            </Button>
        </div>
    )
}

export default ErrorPage