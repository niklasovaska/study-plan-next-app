"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react";
import { Moon, Sun} from 'lucide-react'
import { Button } from "../ui/button"

const ThemeToggle = () => {

    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return(
        <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='p-2 rounded-full bg-background text-foreground'
        >
            {theme === 'dark' ? <Moon /> : <Sun />}
        </Button>
    )
}

export default ThemeToggle