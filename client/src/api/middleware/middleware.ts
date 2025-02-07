// // For user authentication check (should be a custom hook)
// 'use client'
// import React, { useEffect } from "react"
// import { useAppSelector } from "@/lib/hook"
// import { RootState } from "@/lib/store"
// import { useRouter } from "next/navigation"

// export const userAuth = () => {
//     const user = useAppSelector((state: RootState) => state.user);
//     const router = useRouter();
//     useEffect(() => {
//         if (user.id) {
//             router.push('/')
//         }
//     }, [user, router])  // Add user as a dependency to avoid missing updates
// }

// // For admin authentication check (should be a custom hook)
// export const adminAuth = () => {
//     const user = useAppSelector((state: RootState) => state.user.role == 'admin')
//     const router = useRouter();
//     useEffect(() => {
//         if(user) {
//             router.push('/admin/dashboard')
//         }
//     }, [user, router])  // Add user as a dependency
// }
