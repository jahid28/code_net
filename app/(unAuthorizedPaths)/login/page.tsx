"use client";
import { useEffect, useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import ClipLoader from "react-spinners/ClipLoader";
import { loginSchema } from "@/lib/zodSchemas";

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //   if (session) {
  //     router.replace("/userPage");
  //     return null; // Prevent rendering while redirecting
  //   }

  const [captchaValue, setCaptchaValue] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function submit(e: any) {
    e.preventDefault();
    try {
      if (!captchaValue) {
        toast.error("Fill the captcha");
        return;
      }
      const loginDetails = {
        email: formData.email,
        password: formData.password,
      };
      const result = loginSchema.safeParse(loginDetails);
      if (!result.success) {
        let errorMsg = "";
        result.error.issues.forEach((i) => {
          errorMsg += i.path[0] + " : " + i.message + ". ";
        });
        toast.error(errorMsg);
        return;
      }
      setLoading(true);
      const response = await fetch("/api/normalLogin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(result),
      });
      const data = await response.json();
      if (data.success == true) {
        toast.success(data.msg);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        // router.replace("/")
      } else {
        toast.error(data.msg);
      }
      setLoading(false);

      setFormData({ email: "", password: "" });
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  }

  return (
    <div className="grid place-items-center">
      <ClipLoader
        className="absolute top-[45vh] z-30"
        color="#e94154"
        loading={loading}
        size={100}
      />
      <h2 className="mt-2 mb-2 py-1 ml-4 mr-4 text-center font-bold text-4xl bg-gradient-to-r from-sky-600 via-green-500 to-orange-400 inline-block text-transparent bg-clip-text">Welcome to CodeNet &lt;/&gt;, your daily coding community.</h2>
      <h2 className="mb-6 py-1 ml-4 mr-4 text-center font-bold text-4xl bg-gradient-to-r from-sky-600 via-green-500 to-orange-400 inline-block text-transparent bg-clip-text">Login to continue.</h2>
      <div className="w-[90vw] md:w-[50vw] lg:w-[30vw] bg-dark-color rounded-lg p-8 mt-0 mb-10 relative z-10 shadow-md">
        <h2 className=" text-2xl mb-5 font-medium">Login</h2>

        <form action="" onSubmit={submit}>
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm">
              Email
            </label>
            <input
              value={formData.email}
              placeholder="johndoe@gmail.com"
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
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm">
              Password
            </label>
            <input
              value={formData.password}
              placeholder="********"
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

          <ReCAPTCHA
            sitekey={`${process.env.NEXT_PUBLIC_REACT_APP_RECAPTCHA}`}
            onChange={(value: boolean) => setCaptchaValue(value)}
            domain="ecommerce-both-frontend.onrender.com"
          />
          <input
            className="w-full mt-3 cursor-pointer text-white py-2 px-6 focus:outline-none bg-red-500 hover:bg-red-600 rounded text-lg"
            type="submit"
            value="Submit"
          />
        </form>

        <p className="text-center mt-2 mb-2">OR</p>

        <button
          onClick={() => {
            signIn("google");
          }}
          className="text text-white w-full mb-5 flex  bg py-2 justify-center focus:outline-none bg-red-500 hover:bg-red-600 rounded text-lg"
        >
          Login through Google
          <p className="mt-1.5 ml-2">
            <FaGoogle />
          </p>
        </button>

        <button
          onClick={() => {
            signIn("github");
          }}
          className="text text-white w-full flex  bg py-2 justify-center focus:outline-none bg-red-500 hover:bg-red-600 rounded text-lg"
        >
          Login through Github
          <p className="mt-1.5 ml-2">
            <FaGithub />
          </p>
        </button>

        {/* <p className="text-base text-blue-700 mt-3"><Link to={"/forgotpassword"}>Forgot Password</Link> </p> */}
        <p className="text-base text-red-500 mt-3">
          <Link href={"/forgotPassword"}>Forgot Password?</Link>
        </p>
        <p className="text-base text-gray-500 mt-3">Don't have an account? </p>
        {/* <p className="text-base text-blue-700 mt-3"><Link to={"/signup"}>Signup</Link> </p> */}
        <p className="w-fit cursor-pointer text-base text-red-500 mt-3">
          <Link href={"/signup"}>Signup</Link>{" "}
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

export default LoginPage;
