"use client";
import { useEffect, useState } from "react";
// import { FcGoogle } from "react-icons/fc";
import { FaGithub,FaGoogle } from "react-icons/fa";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { json } from "node:stream/consumers";
// import { PacmanLoader } from "react-spinners";
import { useRouter } from "next/navigation";
// import ReCAPTCHA from "react-google-recaptcha";

const LoginPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  //   if (session) {
  //     router.replace("/userPage");
  //     return null; // Prevent rendering while redirecting
  //   }

  const [captchaValue, setCaptchaValue] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  function submit() {}

  return (
    <div className="bg-color p-16">
      <section className="text-gray-600 body-font grid place-items-center  relative  ">
        <div className="bg-dark-color text-color lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col   mt-10 md:mt-0 relative z-10 shadow-md">
          <h2 className=" text-2xl mb-5 font-medium">Login</h2>

          <form method="/login" action="POST" onSubmit={submit}>
            <div className="relative mb-4">
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
            <div className="relative mb-4">
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

            {/* <ReCAPTCHA
              sitekey={`${process.env.REACT_APP_RECAPTCHA}`}
              onChange={(value) => setCaptchaValue(value)}
              domain="ecommerce-both-frontend.onrender.com"
            /> */}

            <input
              className="w-full mt-3 cursor-pointer text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              type="submit"
              value={"Submit"}
            />
          </form>

          <p className="text-center mt-2 mb-2">OR</p>

          <button
            onClick={() => {
              signIn("google");
            }}
            className="text mb-5 flex  bg border-0 py-2 justify-center focus:outline-none bg-red-500 hover:bg-red-600 rounded text-lg"
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
            className="text flex  bg border-0 py-2 justify-center focus:outline-none bg-red-500 hover:bg-red-600 rounded text-lg"
          >
            Login through Github
            <p className="mt-1.5 ml-2">
              <FaGithub />
            </p>
          </button>

          {/* <p className="text-base text-blue-700 mt-3"><Link to={"/forgotpassword"}>Forgot Password</Link> </p> */}
          <p className="text-base text-red-500 mt-3">Forgot Password</p>
          <p className="text-base text-gray-500 mt-3">
            Don't have an account?{" "}
          </p>
          {/* <p className="text-base text-blue-700 mt-3"><Link to={"/signup"}>Signup</Link> </p> */}
          <p className="text-base text-red-500 mt-3">Signup </p>
        </div>
      </section>

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
