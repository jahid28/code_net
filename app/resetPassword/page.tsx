"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {z} from "zod"
import ClipLoader from "react-spinners/ClipLoader";

// interface formInter {
//   email: string;
// }

const resetPassSchema=z.object({
  email:z.string().email({message:"Enter a zod email"}).trim(),
  pass:z.string().trim().min(4,{message:"Password must be atleast 4 characters long."}),
  cpass:z.string().trim().min(4,{message:"Password must be atleast 4 characters long."})
})

const ResetPassword = ({searchParams}:{searchParams:any}) => {
  const router = useRouter();
  // const [captchaValue, setCaptchaValue] = useState(false);
  // const [userOTP, setUserOTP] = useState("");
  // const [otp, setOTP] = useState(0);
  // const [otpPopup, setotpPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const [pass, setPass] = useState<string>("");
  const [cpass, setCpass] = useState<string>("");
  // let otp:number

  async function submit(e:any) {

    e.preventDefault();

    try {
      const email=searchParams.email
      const resetPassDetails={
        pass,
        cpass,
        email
      }
      const result=resetPassSchema.safeParse(resetPassDetails)
      if(!result.success){
        let errorMsg=""
        result.error.issues.forEach((i)=>{
          errorMsg+=i.path[0]+" : " + i.message + ". "
        })
        toast.error(errorMsg)
        return
      }
      if(pass!=cpass){
        toast.error("Passwords donot match")
        return
      }
    setLoading(true)
    const response = await fetch("/api/resetPassword", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(result),
    });
    const data = await response.json();
    if (data.success == true) {
      toast.success(data.msg);
      router.replace("/login")
      
    } else {
      toast.error(data.msg);
    }
    setLoading(false)
    
  } catch (error) {
      setLoading(false)
      toast.error("Something went wrong!");
    }
  }



  return (
    <div className="h-[100vh] bg-color grid place-items-center">
                    <ClipLoader className="absolute top-[45vh] z-30" color="#e94154" loading={loading} size={100}/>

      <div className="w-[90vw] md:w-[50vw] lg:w-[30vw] bg-dark-color text-color rounded-lg p-8 mt-10  relative z-10 shadow-md">
        <h2 className=" text-2xl mb-5 font-medium">Reset Password</h2>

       <form action="" onSubmit={submit}>
       <div className=" mb-4">
          <label htmlFor="email" className="leading-7 text-sm">
            New Password
          </label>
          <input
            value={pass}
            onChange={(event) => setPass(event.target.value)}
            required
            type="password"
            id="password"
            name="password"
            className="w-full bg-white rounded border border-gray-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className=" mb-4">
          <label htmlFor="email" className="leading-7 text-sm">
            Confirm Password
          </label>
          <input
            value={cpass}
            onChange={(event) => setCpass(event.target.value)}
            required
            type="password"
            id="cpassword"
            name="cpassword"
            className="w-full bg-white rounded border border-gray-300 focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <input
              className="w-full mt-3 cursor-pointer text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg"
              type="submit"
              value="Submit"
            />
       </form>
      </div>
    </div>
  );
};

export default ResetPassword;
