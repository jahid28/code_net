import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';

import { cookies } from 'next/headers'

import User from "@/models/googleUser";
import { connectToMongo } from "@/utils/mongo";
import { googleUserInterface } from '@/lib/interfaces';
import jwt from 'jsonwebtoken';


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_SECRET!,

    })
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },

    async signIn({ account, profile, user, credentials }) {
      try {

        let randomUserName = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;

        for (let i = 0; i < 6; i++) {
          randomUserName += characters.charAt(Math.floor(Math.random() * charactersLength));
        }


        await connectToMongo()

        const checkEmail = await User.find({ email: user.email })
        const checkUserName = await User.find({ userName: randomUserName })

        if (checkUserName.length > 0) {
          for (let i = 0; i < 10; i++) {
            randomUserName += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
        }


        if (checkEmail.length == 0) {
          const data_to_insert: googleUserInterface = {
            name: user.name!,
            userName: randomUserName,
            email: user.email!,
            profilePic: user.image!,
            followers: [],
            following: []
          }

          await User.insertMany([data_to_insert])

        }
        else {
          randomUserName = checkEmail[0].userName
        }

        const token = jwt.sign({ name: user.name, userName: randomUserName, email: user.email, profilePic: user.image }, `${process.env.NEXTAUTH_SECRET}`, { expiresIn: '7d' });

        cookies().set('token', `${token}`, { maxAge: 60 * 60 * 24 * 7 })

        return true
      }
      catch (error) {
        return false
      }

    },

  }
})


export { handler as GET, handler as POST }