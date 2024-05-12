"use client";
import { useEffect, useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaGoogle } from "react-icons/fa";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { json } from "node:stream/consumers";
// import { PacmanLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { getCookie } from "cookies-next";
import ReCAPTCHA from "react-google-recaptcha";
import { z } from "zod";
import ClipLoader from "react-spinners/ClipLoader";

const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name must be atleast 1 character long." }),
    email: z.string().email({ message: "Enter a zod email" }).trim(),
    password: z
    .string()
    .trim()
    .min(4, { message: "Password must be atleast 4 characters long." }),
    userName: z
      .string()
      .trim()
      .min(2, { message: "User Name must be atleast 2 characters long." }),
});

// getCookie
// import ReCAPTCHA from "react-google-recaptcha";
interface formInter {
  email: string;
  password: string;
  name: string;
  userName: string;
}
const SignupPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getCookie("userName") != undefined) {
      router.replace("/");
      // router.refresh()
    }
  }, []);
  //   const { data: session } = useSession();
  //   if (session) {
  //     router.replace("/userPage");
  //     return null; // Prevent rendering while redirecting
  //   }

  const [captchaValue, setCaptchaValue] = useState(false);

  const [formData, setFormData] = useState<formInter>({
    email: "",
    password: "",
    name: "",
    userName: "",
  });
  async function submit(e: any) {
    e.preventDefault();
    try {
      if (!captchaValue) {
        toast.error("Fill the captcha");
        return;
      }
      const signupDetails = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        userName: formData.userName,
      };
      const result = signupSchema.safeParse(signupDetails);
      if (!result.success) {
        let errorMsg = "";
        result.error.issues.forEach((i) => {
          errorMsg += i.path[0] + " : " + i.message + ". ";
        });
        toast.error(errorMsg);
        return;
      }
      // console.log(formData.email)
      // console.log(formData.password)
      // console.log(formData.name)
      setLoading(true);
      const response = await fetch("/api/normalSignup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(result),
      });
      // console.log("insertetd")
      const data = await response.json();
      if (data.success == true) {
        toast.success(data.msg);
        window.location.reload();
        setFormData({ email: "", password: "", name: "", userName: "" });
      } else {
        toast.error(data.msg);
      }
      setLoading(false);
      
      // console.log("data in client is ", data);
    } catch (error) {
      toast.error("Something went wrong!");
      setFormData({ email: "", password: "", name: "", userName: "" });
      setLoading(false);
    }
  }

  // async function googleSubmit(){
  //   const res=await signIn("google");
  //   if(res){
  //     toast.error("goooooooooo")

  //   }
  //   else{
  //     toast.error("Something went wrong!")

  //   }
  // }

  return (
    <div className="h-[124vh] bg-color grid place-items-center">
      <ClipLoader
        className="absolute top-[45vh] z-30"
        color="#e94154"
        loading={loading}
        size={100}
      />

      {/* <section className="text-gray-600 body-font grid place-items-center  relative  "> */}
      <div className="w-[90vw] md:w-[50vw] lg:w-[30vw] bg-dark-color text-color rounded-lg p-8 mt-20  relative z-10 shadow-md">
        <h2 className=" text-2xl mb-5 font-medium">Signup</h2>

        <form action="" onSubmit={submit}>
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm">
              Your Name
            </label>
            <input
              value={formData.name}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              required
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm">
              Email
            </label>
            <input
              value={formData.email}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              required
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm">
              Password
            </label>
            <input
              value={formData.password}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              required
              type="password"
              id="password"
              name="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <div className=" mb-4">
            <label htmlFor="userName" className="leading-7 text-sm">
              User Name
            </label>
            <input
              value={formData.userName}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  [event.target.name]: event.target.value,
                })
              }
              required
              type="text"
              id="userName"
              name="userName"
              className="w-full bg-white rounded border border-gray-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>

          <ReCAPTCHA
            sitekey={`${process.env.NEXT_PUBLIC_REACT_APP_RECAPTCHA}`}
            onChange={(value: boolean) => setCaptchaValue(value)}
            domain="ecommerce-both-frontend.onrender.com"
          />

          <input
            className="w-full mt-3 cursor-pointer text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
            type="submit"
            value="Submit"
          />
        </form>
        {/* <input
              className="w-full mt-3 cursor-pointer text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              type="submit"
              value={"Submit"}
            /> */}

        <p className="text-center mt-2 mb-2">OR</p>

        <button
          onClick={() => {
            signIn("google");
          }}
          className="text-white w-full mb-5 flex  bg border-0 py-2 justify-center focus:outline-none bg-red-500 hover:bg-red-600 rounded text-lg"
        >
          Signup through Google
          <p className="mt-1.5 ml-2">
            <FaGoogle />
          </p>
        </button>

        <button
          onClick={() => {
            signIn("github");
          }}
          className="text-white w-full flex  bg border-0 py-2 justify-center focus:outline-none bg-red-500 hover:bg-red-600 rounded text-lg"
        >
          Signup through Github
          <p className="mt-1.5 ml-2">
            <FaGithub />
          </p>
        </button>

        {/* <p className="text-base text-blue-700 mt-3"><Link to={"/forgotpassword"}>Forgot Password</Link> </p> */}
        {/* <p className="text-base text-red-500 mt-3">Forgot Password</p> */}
        <p className="text-base text-gray-500 mt-3">
          Already have an account?{" "}
        </p>
        {/* <p className="text-base text-blue-700 mt-3"><Link to={"/signup"}>Signup</Link> </p> */}
        <p className="w-fit cursor-pointer text-base text-red-500 mt-3">
          <Link href={"/login"}>Login</Link>{" "}
        </p>
      </div>
      {/* </section> */}

      {/* <div className="lg:w-2/6 md:w-1/2 bg_dark rounded-lg p-8 flex flex-col w-[90vw] mt-10 md:mt-0">
        <h2 className="text text-lg font-medium title-font mb-5">Login</h2>

        <button
          onClick={() => {
            signIn("google");
          }}
          className="text mb-5 flex  bg border-0 py-2 justify-center focus:outline-none hover:bg-gray-500 rounded text-lg"
        >
          Login through Google
          <p className="mt-1 ml-2">
            <FcGoogle />
          </p>
        </button>

        <button
          onClick={() => {
            signIn("github");
          }}
          className="text flex  bg border-0 py-2 justify-center focus:outline-none hover:bg-gray-500 rounded text-lg"
        >
          Login through Github
          <p className="mt-1 ml-2">
            <FaGithub />
          </p>
        </button>

        <p className="text-xs text-gray-500 mt-3">
          Login quickly with google or github
        </p>
      </div> */}
    </div>
  );
};

export default SignupPage;
