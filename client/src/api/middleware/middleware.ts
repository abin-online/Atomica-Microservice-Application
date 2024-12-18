'use client'
import React, { useEffect } from "react"
import { useAppSelector } from "@/lib/hook"
import { RootState } from "@/lib/store"
import { useRouter } from "next/navigation"

export const userAuth = () => {
    const user = useAppSelector((state: RootState) => state.user);
    const router = useRouter();
    console.log('userrrrrrrrr', user)
    useEffect(() => {
        if (user.id) {
            router.push('/')
        }
    }, [router])

}

export const adminAuth = ()=> {
    const user = useAppSelector((state: RootState) => state.user.role == 'admin')
    console.log('admin======>', user)
    const router = useRouter();
    useEffect(()=> {
        if(user) {
            router.push('/admin/dashboard')
        }
    })
}

//export default userAuth