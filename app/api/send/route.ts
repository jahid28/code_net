// import { EmailTemplate } from '../../../components/email-template';
import { Resend } from 'resend';
import * as React from 'react';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer"
import { connectToMongo } from '@/utils/mongo';
import normalUser from '@/models/normalUser';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    // console.log("hahaahah")

    try {
        const { email, otp } = await req.json()
        await connectToMongo()

        const check = await normalUser.find({ email })
        // console.log("check i s ", check)

        if (check.length <= 0) {
            return NextResponse.json({ success: false, msg: "Email is not registered" }, { status: 400 })

        }
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NEXT_PUBLIC_MY_EMAIL, // replace with your email address
                pass: process.env.NEXT_PUBLIC_MY_EMAIL_PASS, // replace with your email password or app password
            },
        });

        const mailOptions = {
            from: "CodeNet", // replace with your email address
            to: email,
            subject: "CodeNet Password Reset",
            html: `<p>Your OTP is <span style="color: blue;font-size: 20px;">${otp}</span></p>
               <p>Use this OTP to reset your CodeNet password.</p>
               `,
        };

        await transporter.sendMail(mailOptions);
        //     console.log("email and otp are ",email,otp)
        //     await resend.emails.send({
        //         from: 'CodeNet <codenet@resend.dev>',
        //         to: email,
        //         subject: "CodeNet Reset Password",
        //         html: `<p>Your OTP is <span style="color: red;font-size: 20px;">${otp}</span></p>
        //   <p>Use this OTP to reset your CodeNet password.</p>
        //   `,
        //     })

        // if (error) {
        return NextResponse.json({ success: true, msg: "Enter the OTP sent to your Email" }, { status: 201 })
        // }

        // return Response.json({ data });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
        // console.log("ff")
    }
}