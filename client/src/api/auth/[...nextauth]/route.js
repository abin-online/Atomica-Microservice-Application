import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"

import User from "@models/user";

import { connect } from "@utils/database"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            if (sessionUser) {
                session.user.id = sessionUser._id.toString();
            }
            return session
        },
        async signIn({ profile }) {
            try {
                await connect()
                //check if a user exist
                const userExists = await User.findOne({
                    email: profile.email
                })
                //else , create user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true
            } catch (error) {
                console.error("Error during signIn: ", error);
                return false; // Deny access
            }
        }
    }

})

export { handler as GET, handler as POST }