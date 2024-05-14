"use client";
import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Player } from "@lordicon/react";
import { toast } from "sonner";
// import { imageDb } from "@/Firebase/Config";
import { imageDb } from "@/Firebase/Config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { z } from "zod";

const postSchema = z.object({
  codeType: z.string().trim(),
  msg: z
    .string()
    .trim()
    .min(3, { message: "Message must be atleast 3 characters long." }),
  code: z.string().trim(),
  lang: z.string().trim(),
});
//   useRef
// useState
const PostBox = () => {
  const image = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const playerRefCheck = useRef<Player>(null);
  const playerRefUpload = useRef<Player>(null);
  const playerRefArrow = useRef<Player>(null);
  const check = require("@/icons/check.json");
  const upload = require("@/icons/upload.json");
  const arrow = require("@/icons/arrow.json");
  const [imagesToUload, setImagesToUload] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  //   const [list, setlist] = useState<string[]>(["lol", "hhhhh"]);

  const [loading, setLoading] = useState(false);

  const [lang, setLang] = useState<string>("javascript");
  const [codeType, setCodeType] = useState<string>("randomFact");
  const [msg, setMsg] = useState<string>("");
  const [code, setCode] = useState<string>("");
  // const [imagesForMongoDB, setImagesForMongoDB] = useState<string[]>(["lol"]);

  const router = useRouter();

  function inputClicked() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
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

    const selectedImages = Array.from(files); // Select up to 4 images
    setImagesToUload(selectedImages);
  };

  // setInterval(()=>{
  //     console.log("image 1 is ",images[0])

  // },2000)

  const submit = async () => {
    try {
      setLoading(true);

      const postDetails = {
        codeType,
        msg,
        code,
        lang,
      };

      const result = postSchema.safeParse(postDetails);
      if (!result.success) {
        let errorMsg = "";
        result.error.issues.forEach((i) => {
          errorMsg += i.path[0] + " : " + i.message + ". ";
        });
        toast.error(errorMsg);
        setLoading(false);
        return;
      }
      
      let imagesForMongoDB: string[] = [];
      
      if (imagesToUload.length > 0) {
        for (const e of imagesToUload) {
          // imagesToUload.forEach(async (e) => {
            const imgRef = ref(imageDb, `postimages/${v4()}`);
            await uploadBytes(imgRef, e)
            .then(() => {
              // console.log("doneeeeee");
            })
            .catch((e) => {
              setLoading(false);
              toast.error("Some error ocurred while uploading images.");
              return;
              // console.log("oooooops");
            });
          const url = await getDownloadURL(imgRef);
          // setImagesForMongoDB([...imagesForMongoDB, url]);
          imagesForMongoDB.push(url);
        }
        // });
      }

      // setTimeout(() => {
      // console.log("after url ",imagesForMongoDB);
      // for(let e of imagesForMongoDB){
      // }
      // }, 5000);

      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ codeType, msg, code, lang, imagesForMongoDB }),
      });

      const data = await response.json();
      if (data.success == true) {
        toast.success(data.msg);
        // window.location.reload();
        // router.replace("/")
      } else {
        toast.error(data.msg);
      }
      setImages([]);
      setImagesToUload([]);
      setMsg("");
      setCode("");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error(error);
    }
  };

  // setTimeout(() => {
  //   console.log("i is ", imagesForMongoDB);
  // }, 10000);

  function checkEmail() {
    if (getCookie("userName") == undefined) {
      toast.warning("You need to login before posting.");
      router.replace("/login");
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div
          onClick={() => {
            checkEmail();
          }}
          className="flex cursor-pointer text-white bg-red-500 hover:bg-red-600 font-bold rounded-lg text-2xl p-2"
          onMouseOver={() => playerRefCheck.current?.playFromBeginning()}
        >
          Post
          <div className="ml-2">
            <Player
              colorize="white"
              ref={playerRefCheck}
              size={32}
              icon={check}
            />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="w-full grid place-items-center mb-4">
            {/* <div className="flex items-center"> */}
            <DialogTitle>
              <p className="text-2xl">Write a message you want to post</p>
            </DialogTitle>

            <div className="mt-2 mr-auto">
              <Select
                onValueChange={(e: string) => {
                  setCodeType(e);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Random Fact" />
                </SelectTrigger>
                <SelectContent>
                  {/* <div className="text-yellow-600 bg-green-400 border-blue-600"> */}
                  <SelectItem value="randomFact">Random Fact</SelectItem>
                  <SelectItem value="question">Question</SelectItem>
                  <SelectItem value="codeToShare">Code to share</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* <button onClick={()=>{console.log("pls is ",imagesForMongoDB)}}>WOW</button> */}

            {/* </div> */}
            <ClipLoader
              className="absolute top-40%"
              color="#e94154"
              loading={loading}
              size={100}
            />

            <form action="" className="mr-auto">
              <textarea
                value={msg}
                className="mt-4 inp-border w-full bg-color text-color rounded-md p-1"
                cols={60}
                rows={5}
                id="userTextinp"
                required
                autoComplete="off"
                placeholder="What's happening?"
                onChange={(e) => {
                  setMsg(e.target.value);
                }}
              ></textarea>

              <textarea
                value={code}
                className="mt-4 inp-border w-full bg-color text-color rounded-md p-1"
                cols={60}
                rows={5}
                id="userCode"
                required
                autoComplete="off"
                placeholder="Write a code here"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              ></textarea>

              <div className="mt-2 mr-auto">
                <Select
                  onValueChange={(e: string) => {
                    setLang(e);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Javascript" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* <div className="text-yellow-600 bg-green-400 border-blue-600"> */}
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="javascript">Javascript</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="cpp">CPP</SelectItem>
                    <SelectItem value="c">C</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                    <SelectItem value="c#">C#</SelectItem>
                    {/* </div> */}
                  </SelectContent>
                </Select>
              </div>
            </form>

            {/* <div ref={image} className="">
             {images.map((image, index) => (
                 <img
                 key={index}
                 src={image}
                 alt={`Uploaded image ${index + 1}`}
                 style={{
                     maxWidth: "100px",
                     maxHeight: "100px",
                     margin: "5px",
                   }}
                   />
               ))}
           </div> */}

            {images.length > 0 && (
              <div className="mt-3">
                <h2>Selected images :</h2>
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

            <div className="mr-auto flex mt-4 w-full border-red-400 border-0">
              <input
                className="hidden"
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <div
                onMouseOver={() => playerRefUpload.current?.playFromBeginning()}
                onClick={inputClicked}
                className=" w-fit cursor-pointer flex text-red-500"
              >
                <p className="mr-2 text-xl">Insert image</p>
                <Player
                  colorize="#f44336"
                  ref={playerRefUpload}
                  size={32}
                  icon={upload}
                />
              </div>

              <div
                onMouseOver={() => playerRefArrow.current?.playFromBeginning()}
                onClick={() => {
                  submit();
                }}
                className="flex bg-red-500  hover:bg-red-600 align-middle text-white px-2 py-.05 rounded-xl cursor-pointer text-lg ml-auto"
              >
                <p className="mr-2 text-xl">Post</p>

                <Player
                  colorize="white"
                  ref={playerRefArrow}
                  size={32}
                  icon={arrow}
                />
              </div>
            </div>
          </div>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PostBox;
