"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import ThemeToggle from "../features/ThemeToggle"

const navElements = [
    {href: "/", label: "Completed"},
    {href: "/upcoming", label: "Upcoming"}
]


const Header = () => {
    const pathname = usePathname()

    return(
        <div className='flex items-center justify-between px-10 border-black/50 border-b h-[80px]'>
            <div className='text-xl font-bold'>Personal study plan</div>
            <ul className='flex items-center gap-6'>
                {navElements.map(({ href, label }) => {
                    const isActive = pathname === href
                    return(
                        <Link
                            key={href}
                            href={href}
                            className={`text-sm font-medium transition-colors ${
                                isActive
                                ? "text-primary border-b-2 border-primary pb-1"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {label}
                        </Link>
                    )
                })}
                <ThemeToggle />
            </ul>
        </div>
    )
}

export default Header