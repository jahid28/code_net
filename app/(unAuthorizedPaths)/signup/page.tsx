"use client";
import { useEffect, useRef, useState, ChangeEvent } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import ClipLoader from "react-spinners/ClipLoader";
import { signupSchema } from "@/lib/zodSchemas";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Player } from "@lordicon/react";
import { imageDb } from "@/Firebase/Config";
import { v4 } from "uuid";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import Image from "next/image";

interface formInter {
  email: string;
  password: string;
  name: string;
  userName: string;
}
const SignupPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const playerRefPhoto = useRef<Player>(null);
  const photo = require("@/icons/photo.json");
  const [imagesToUload, setImagesToUload] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const [captchaValue, setCaptchaValue] = useState(false);

  const [formData, setFormData] = useState<formInter>({
    email: "",
    password: "",
    name: "",
    userName: "",
  });

  function inputClicked() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files: FileList = e.target.files!;
    if (files.length > 4) {
      toast.error("Max 4 images are allowed");
      return;
    }
    const imagesArray: any[] = [];

    for (let i: number = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e: any | never) => {
        imagesArray.push(e.target.result);
        if (imagesArray.length === files.length) {
          setImages(imagesArray);
        }
      };
      reader.readAsDataURL(files[i]);
    }

    const selectedImages = Array.from(files);
    setImagesToUload(selectedImages);
  };

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
        profilePic: "",
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
      setLoading(true);

      // let imagesForMongoDB: string[] = [];

      if (imagesToUload.length > 0) {
        // for (const e of imagesToUload) {
          const imgRef = ref(imageDb, `postimages/${v4()}`);
          await uploadBytes(imgRef, imagesToUload[0])
            .then(() => {})
            .catch((e) => {
              toast.error("Some error ocurred while uploading profile pic.");
              return;
            });
          const url = await getDownloadURL(imgRef);
          // imagesForMongoDB.push(url);
          signupDetails.profilePic = url;
        // }
      }


      const response = await fetch("/api/normalSignup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(signupDetails),
      });
      const data = await response.json();
      if (data.success == true) {
        toast.success(data.msg);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        setFormData({ email: "", password: "", name: "", userName: "" });
      } else {
        toast.error(data.msg);
      }
      setLoading(false);
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
  // async function googleSignup() {
  //   try {
  //     if (formData.userName.length < 2) {
  //       toast.error("Please enter a User Name of min 2 chars to continue");
  //       return;
  //     }
  //     const response = await fetch("/api/checkUserName", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({ userName: formData.userName }),
  //     });
  //     const data = await response.json();
  //     if (data.success == true) {
  //       //  const res=await signIn("google")

  //       const response = await signIn("google");
  //       // const data = await response.json();

  //       setFormData({ email: "", password: "", name: "", userName: "" });
  //     } else {
  //       toast.error(data.msg);
  //     }
  //   } catch (error: any) {
  //     toast.error(error);
  //   }
  // }

  // async function githubSignup() {
  //   if (formData.userName.length < 2) {
  //     toast.error("Please enter a User Name of min 2 chars to continue");
  //     return;
  //   }
  //   const response = await fetch("/api/checkUserName", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify({ userName: formData.userName }),
  //   });
  //   const data = await response.json();
  //   if (data.success == true) {
  //     signIn("github");
  //     // toast.success(data.msg);
  //     // window.location.reload();
  //     setFormData({ email: "", password: "", name: "", userName: "" });
  //   } else {
  //     toast.error(data.msg);
  //   }
  //   // const data = await response.json();
  // }

  return (
    <div className="grid place-items-center">
      <ClipLoader
        className="absolute top-[45vh] z-30"
        color="#e94154"
        loading={loading}
        size={100}
      />


      <h2 className="mt-2 mb-6 py-1 ml-4 mr-4 text-center font-bold text-4xl bg-gradient-to-r from-sky-600 via-green-500 to-orange-400 inline-block text-transparent bg-clip-text">Welcome to CodeNet &lt;/&gt;, your daily coding community.</h2>

      <div className="w-[90vw] md:w-[50vw] lg:w-[30vw] bg-dark-color rounded-lg p-8 mb-10 relative z-10 shadow-md">
        <h2 className=" text-2xl mb-5 font-medium">Signup</h2>

        <form action="" onSubmit={submit}>
          <div className=" mb-4">
            <label htmlFor="email" className="leading-7 text-sm">
              Your Name
            </label>
            <input
              value={formData.name}
              placeholder="John Doe"
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

          <div className=" mb-4">
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

          <div className=" mb-4">
            <label htmlFor="userName" className="leading-7 text-sm">
              User Name
            </label>
            <input
              value={formData.userName}
              placeholder="johndoe123"
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

          {images.length > 0 && (
            <div className="w-full grid place-items-center mt-3">
              <Carousel className="w-full max-w-xs">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="p-1 w-full grid place-items-center">
                        <Image
                          key={index}
                          src={image}
                          alt="uploaded images"
                          width={200}
                          height={200}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <div className="text-red-500">
                  <CarouselPrevious />
                </div>
                <div className="text-red-500">
                  <CarouselNext />
                </div>
              </Carousel>
            </div>
          )}

          <input
            className="hidden"
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div
            onMouseEnter={() => playerRefPhoto.current?.playFromBeginning()}
            onClick={inputClicked}
            className=" w-fit cursor-pointer flex text-red-500 mt-1 mb-2"
          >
            <p className="mr-2 text-xl">Profile Pic(optional)</p>
            <Player
              colorize="#f44336"
              ref={playerRefPhoto}
              size={32}
              icon={photo}
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
          className="text-white w-full mb-5 flex  bg py-2 justify-center focus:outline-none bg-red-500 hover:bg-red-600 rounded text-lg"
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
