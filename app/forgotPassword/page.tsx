"use client";
import { useEffect, useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
// import { json } from "node:stream/consumers";
// import { PacmanLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
// import { getCookie } from "cookies-next";
import ReCAPTCHA from "react-google-recaptcha";
import ClipLoader from "react-spinners/ClipLoader";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// import nodemailer from "nodemailer"
// import {Resend} from "resend"

const SignupPage = () => {
  const router = useRouter();
  const [captchaValue, setCaptchaValue] = useState(false);
  const [userOTP, setUserOTP] = useState("");
  const [otp, setOTP] = useState(0);
  const [otpPopup, setotpPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState<string>("");
  // let otp:number

  async function submit(e: any) {
    e.preventDefault();

    try {
      if (!captchaValue) {
        toast.error("Fill the captcha");
        return;
      }
      setLoading(true)
      const oo = Math.floor(Math.random() * 900000) + 100000;
      setOTP(oo);
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: oo,
        }),
      });
      const data = await response.json();
      if (data.success == true) {
        toast.success(data.msg);
        setotpPopup(true);
      } else {
        toast.error(data.msg);
      }
      
      setLoading(false)
      // console.log("data in client is ", data);
    } catch (error) {
      setLoading(false)
      toast.error("Something went wrong!");
    }
  }

  function submitOTP() {
    console.log("otp ", otp, " user ", parseInt(userOTP));
    if (otp == parseInt(userOTP)) {
      router.replace(`/resetPassword?email=${email}`);
      // toast.success("Correct OTP")
    } else {
      toast.error("Incorrect OTP");
    }
  }

  return (
    <div className="h-[100vh] bg-color grid place-items-center">
                          <ClipLoader className="absolute top-[45vh] z-30" color="#e94154" loading={loading} size={100}/>

      <div>
        <div className="w-[90vw] md:w-[50vw] lg:w-[30vw] bg-dark-color text-color rounded-lg p-8 mt-10  relative z-10 shadow-md">
          <h2 className=" text-2xl mb-5 font-medium">Forgot Password</h2>

          <form action="" onSubmit={submit}>
            <div className=" mb-4">
              <label htmlFor="email" className="leading-7 text-sm">
                Email
              </label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <ReCAPTCHA
              sitekey={`${process.env.NEXT_PUBLIC_REACT_APP_RECAPTCHA}`}
              onChange={(value: any) => setCaptchaValue(value)}
              // domain="ecommerce-both-frontend.onrender.com"
            />

            <input
              className="w-full mt-3 cursor-pointer text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              type="submit"
              value="Submit"
            />
          </form>

          <p className="w-fit cursor-pointer text-base text-red-500 mt-3">
            <Link href={"/login"}>Go back</Link>{" "}
          </p>
        </div>

        {otpPopup ? (
          <Dialog>
            <DialogTrigger>
              <p className="w-full mt-3 cursor-pointer text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">
                Enter OTP
              </p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <div className="w-full grid place-items-center mb-4">
                  <DialogTitle>Enter the OTP</DialogTitle>
                </div>
                <DialogDescription>
                  <div className="w-full grid place-items-center">
                    <InputOTP
                      value={userOTP}
                      onChange={(value: string) => setUserOTP(value)}
                      maxLength={6}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <button
                    onClick={submitOTP}
                    className="w-full mt-3 cursor-pointer text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
                  >
                    Submit
                  </button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
