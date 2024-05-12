import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
// import { useRouter } from 'next/router';
// import { usePathname } from 'next/navigation'
import { usePathname, useRouter } from 'next/navigation'

import { cookies } from 'next/headers'
import { setCookie } from 'cookies-next';

import User from "@/models/googleUser";
import { connectToMongo } from "@/utils/mongo";
import { NextResponse } from "next/server";
import { googleUserInterface } from '@/lib/interfaces';
// console.log("hererrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
// interface user_insert {
//   name: string;
//   email: string;
//   profilePic: string;
// }

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      // authorizationUrl: 'https://github.com/login/oauth/authorize', // Customize this URL

    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      // const sessionUser = await User.findOne({ email: session.user.email });
      // session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ account, profile, user, credentials }) {
      try {

        // const oneDay = 24 * 60 * 60 * 1000
        cookies().set('userName', `${user.email}`,{ maxAge: 60*60*24 })
        cookies().set('profilePic', `${user.image}`,{ maxAge: 60*60*24 })
// cookies().delete('userName')
// cookies().delete('profilePic')

        await connectToMongo();
        const checkEmail = await User.find({ email: user.email })

        if (checkEmail.length == 0) {
          const data_to_insert: googleUserInterface = {
            name: user.name!,
            email: user.email!,
            profilePic: user.image!,
          }

          await User.insertMany(data_to_insert)

        }


        return true
      }
      catch (error) {
        return false
      }
      // finally{

      // }
    },

    //     async signOut({ session }) {
    //       try {
    //         // Here you can execute your custom function
    //         // when someone signs out
    // const router=useRouter()
    // router.replace("/")        
    //         // Returning true to allow sign out
    //         return true;
    //       } catch (error) {
    //         return false;
    //       }
    //     },
  }
})


export { handler as GET, handler as POST }