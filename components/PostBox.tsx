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
import { Player } from "@lordicon/react";
import { toast } from "sonner";
// import { imageDb } from "@/Firebase/Config";
import { imageDb } from "@/Firebase/Config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
//   useRef
// useState
const PostBox = () => {
  const image = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const playerRefCheck = useRef<Player>(null);
  const playerRefUpload = useRef<Player>(null);
  const check = require("@/icons/check.json");
  const upload = require("@/icons/upload.json");
  const [imagesToUload, setImagesToUload] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);
  //   const [list, setlist] = useState<string[]>(["lol", "hhhhh"]);

  function inputClicked() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    if (files.length > 4) {
      toast.error("max 4 images are allowed");
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

  const submit = () => {
    if (imagesToUload.length > 0) {
      imagesToUload.forEach(async (e) => {
        const imgRef = ref(imageDb, `postimages/${v4()}`);
        await uploadBytes(imgRef, e)
          .then(() => {
            console.log("doneeeeee");
          })
          .catch(() => {
            console.log("oooooops");
          });
        const url = await getDownloadURL(imgRef);
        console.log("url is ", url);
      });
    } else {
      toast.error("0 images");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className="flex cursor-pointer absolute bottom-24 right-6 md:bottom-4 md:right-4 text-color bg-red-500 hover:bg-red-600 font-bold rounded-lg text-2xl p-2"
          onMouseOver={() => playerRefCheck.current?.playFromBeginning()}
        >
          Add
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
            <DialogTitle>Write a message you want to post</DialogTitle>

            {/* </div> */}

            <form action="">
              <textarea
                className="mt-4 bg-color text-color rounded-md p-1"
                cols={50}
                rows={5}
                id="userTextinp"
                required
                autoComplete="off"
                placeholder="What's happening?"
              ></textarea>
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
                className=" w-fit cursor-pointer"
              >
                <Player
                  colorize="white"
                  ref={playerRefUpload}
                  size={32}
                  icon={upload}
                />
              </div>

              <p
                onClick={() => {
                  submit();
                }}
                className="bg-red-500 hover:bg-red-600 align-middle text-white px-4 py-.05 rounded-xl cursor-pointer text-lg ml-auto"
              >
                Post
              </p>
            </div>
          </div>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PostBox;
