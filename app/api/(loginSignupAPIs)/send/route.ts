// import { EmailTemplate } from '../../../components/email-template';
// import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from "nodemailer"
import { connectToMongo } from '@/utils/mongo';
import normalUser from '@/models/normalUser';

export async function POST(req: NextRequest) {

    try {
        const { email, otp } = await req.json()
        await connectToMongo()
        const check = await normalUser.find({ email })

        if (check.length <= 0) {
            return NextResponse.json({ success: false, msg: "Email is not registered" }, { status: 200 })

        }
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NEXT_PUBLIC_MY_EMAIL, // replace with your email address
                pass: process.env.NEXT_PUBLIC_MY_EMAIL_PASS, // replace with your email password or app password
            },
        });

        const mailOptions = {
            from: "DevGram", // replace with your email address
            to: email,
            subject: "DevGram Password Reset",
            html: `<p>Your OTP is <span style="color: blue;font-size: 20px;">${otp}</span></p>
               <p>Use this OTP to reset your DevGram password.</p>
               `,
        };

        await transporter.sendMail(mailOptions);
        //     await resend.emails.send({
        //         from: 'DevGram <DevGram@resend.dev>',
        //         to: email,
        //         subject: "DevGram Reset Password",
        //         html: `<p>Your OTP is <span style="color: red;font-size: 20px;">${otp}</span></p>
        //   <p>Use this OTP to reset your DevGram password.</p>
        //   `,
        //     })

        // if (error) {
        return NextResponse.json({ success: true, msg: "Enter the OTP sent to your Email" }, { status: 201 })
        // }

        // return Response.json({ data });
    } catch (error) {
        return NextResponse.json({ success: false, msg: "Something went wrong!" }, { status: 400 })
    }
}