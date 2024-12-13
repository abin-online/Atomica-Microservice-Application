'use client'
import React, { useEffect } from "react"
import { useAppSelector } from "@/lib/hook"
import { RootState } from "@/lib/store"
import { useRouter } from "next/navigation"

const userAuth = () => {
    const user = useAppSelector((state: RootState) => state.user);
    const router = useRouter();
    console.log('userrrrrrrrr', user)
    useEffect(() => {
        if (user.id) {
            router.push('/')
        }
    }, [router])

}

export default userAuth