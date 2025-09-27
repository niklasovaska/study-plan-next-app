"use client"

import Link from "next/link"
import ThemeToggle from "../features/ThemeToggle"

const Header = () => {

    return(
        <div className='flex items-center justify-between px-10 border-black/50 border-b h-[80px]'>
            <div className='text-xl font-bold'>Personal study plan</div>
            <ul className='flex items-center gap-6'>
                <li>
                    <Link href="/">
                        Completed
                    </Link>
                </li>
                <li>
                    <Link href="/upcoming">
                        Upcoming
                    </Link>
                </li>
                <ThemeToggle />
            </ul>
        </div>
    )
}

export default Header