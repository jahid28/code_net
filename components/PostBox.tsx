// "use client";
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
import { imageDb } from "@/Firebase/Config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import ClipLoader from "react-spinners/ClipLoader";
import { postSchema } from "@/lib/zodSchemas";

const PostBox = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const playerRefCheck = useRef<Player>(null);
  const playerRefUpload = useRef<Player>(null);
  const playerRefArrow = useRef<Player>(null);
  const check = require("@/icons/check.json");
  const upload = require("@/icons/photo.json");
  const arrow = require("@/icons/arrow.json");

  const [imagesToUload, setImagesToUload] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  //   const [list, setlist] = useState<string[]>(["lol", "hhhhh"]);

  const [loading, setLoading] = useState(false);

  const [lang, setLang] = useState<string>("Javascript");
  const [codeType, setCodeType] = useState<string>("Random Fact");
  const [msg, setMsg] = useState<string>("");
  const [code, setCode] = useState<string>("");
  // const [imagesForMongoDB, setImagesForMongoDB] = useState<string[]>(["lol"]);

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
        // let errorMsg = "";
        result.error.issues.forEach((i) => {
          // errorMsg += i.path[0] + " : " + i.message + ". ";
          toast.error(i.message);
        });
        setLoading(false);
        return;
      }

      let imagesForMongoDB: string[] = [];

      if (imagesToUload.length > 0) {
        for (const e of imagesToUload) {
          const imgRef = ref(imageDb, `postimages/${v4()}`);
          await uploadBytes(imgRef, e)
            .then(() => {})
            .catch((e) => {
              setLoading(false);
              toast.error("Some error ocurred while uploading images.");
              return;
            });
          const url = await getDownloadURL(imgRef);
          imagesForMongoDB.push(url);
        }
      }

      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ codeType, msg, code, lang, imagesForMongoDB }),
      });

      const data = await response.json();
      if (data.success === false) {
        setLoading(false);
        toast.error(data.msg);
        return
      }
      toast.success(data.msg);
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

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="flex cursor-pointer text-white bg-red-500 hover:bg-red-600 font-bold rounded-lg text-2xl p-2"
          onMouseEnter={() => playerRefCheck.current?.playFromBeginning()}
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
        <div className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="w-full mb-4">
              <DialogTitle>
                <p className="text-2xl">Write a message :</p>
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
                    <SelectItem value="Random Fact">Random Fact</SelectItem>
                    <SelectItem value="Question">Question</SelectItem>
                    <SelectItem value="Code To Share">Code to share</SelectItem>
                  </SelectContent>
                </Select>
              </div>

          

              <textarea
                value={msg}
                className="mt-4 inp-border w-full bg-color rounded-md p-1"
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

<div className="w-full grid place-items-center">
             <ClipLoader
                className="absolute top-40%"
                color="#e94154"
                loading={loading}
                size={100}
              />
             </div>

              <p className="text-2xl mt-3">
                Write your code here(optional) :
              </p>

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
                    <SelectItem value="Python">Python</SelectItem>            
                    <SelectItem value="Javascript">JavaScript</SelectItem>
                    <SelectItem value="JSX">JSX</SelectItem>
                    <SelectItem value="Typescript">TypeScript</SelectItem>
                    <SelectItem value="TSX">TSX</SelectItem>
                    <SelectItem value="HTML">HTML</SelectItem>
                    <SelectItem value="CSS">CSS</SelectItem>
                    <SelectItem value="Java">Java</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="C++">C++</SelectItem>
                    <SelectItem value="Ruby">Ruby</SelectItem>
                    <SelectItem value="PHP">PHP</SelectItem>
                    <SelectItem value="C#">C#</SelectItem>
                    <SelectItem value="Go">Go</SelectItem>
                    <SelectItem value="Swift">Swift</SelectItem>
                    <SelectItem value="Kotlin">Kotlin</SelectItem>
                    <SelectItem value="Rust">Rust</SelectItem>
                    <SelectItem value="SQL">SQL</SelectItem>

                    {/* </div> */}
                  </SelectContent>
                </Select>
              </div>

              <textarea
                value={code}
                className="mt-4 inp-border w-full bg-color rounded-md p-1"
                cols={60}
                rows={5}
                id="userCode"
                required
                autoComplete="off"
                placeholder="console.log('Hello World')"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              ></textarea>

              {images.length > 0 && (
                <div className="w-full grid place-items-center mt-3">
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

              <div className="mr-auto flex mt-4 w-full">
                <input
                  className="hidden"
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <div
                  onMouseEnter={() =>
                    playerRefUpload.current?.playFromBeginning()
                  }
                  onClick={inputClicked}
                  className=" w-fit cursor-pointer flex text-red-500"
                >
                  <p className="mr-2 text-xl">Insert image(s)</p>
                  <Player
                    colorize="#f44336"
                    ref={playerRefUpload}
                    size={32}
                    icon={upload}
                  />
                </div>

                <div
                  onMouseEnter={() =>
                    playerRefArrow.current?.playFromBeginning()
                  }
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostBox;
