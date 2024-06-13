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

import { toast } from "sonner";
import { imageDb } from "@/Firebase/Config";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { v4 } from "uuid";
import ClipLoader from "react-spinners/ClipLoader";
import { postSchema } from "@/lib/zodSchemas";

import { BsSend, BsCardImage, BsArrowRight } from "react-icons/bs";

const PostBox: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [imagesToUload, setImagesToUload] = useState<File[]>([]);
  const [images, setImages] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [lang, setLang] = useState<string>("Javascript");
  const [codeType, setCodeType] = useState<string>("Random Fact");
  const [msg, setMsg] = useState<string>("");
  const [code, setCode] = useState<string>("");

  function inputClicked(): void {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const files: FileList = e.target.files!;
    if (files.length > 4) {
      toast.error("Max 4 images are allowed");
      return;
    }
    const imagesArray: string[] = [];

    for (let i: number = 0; i < files.length; i++) {
      const reader: FileReader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        imagesArray.push(e.target!.result as string);
        if (imagesArray.length === files.length) {
          setImages(imagesArray);
        }
      };
      reader.readAsDataURL(files[i]);
    }

    const selectedImages: File[] = Array.from(files);
    setImagesToUload(selectedImages);
  };

  const submit = async (): Promise<void> => {
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
        result.error.issues.forEach((i) => {
          toast.error(i.message);
        });
        setLoading(false);
        return;
      }

      let imagesForMongoDB: string[] = [];

      if (imagesToUload.length > 0) {
        for (const e of imagesToUload) {
          const imgRef: StorageReference = ref(imageDb, `postimages/${v4()}`);
          await uploadBytes(imgRef, e)
            .then(() => {})
            .catch((e) => {
              setLoading(false);
              toast.error("Some error ocurred while uploading images.");
              return;
            });
          const url: string = await getDownloadURL(imgRef);
          imagesForMongoDB.push(url);
        }
      }

      const response: Response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ codeType, msg, code, lang, imagesForMongoDB }),
      });

      const data: { success: boolean; msg: string } = await response.json();
      if (data.success === false) {
        setLoading(false);
        toast.error(data.msg);
        return;
      }
      toast.success(data.msg);
      setImages([]);
      setImagesToUload([]);
      setMsg("");
      setCode("");
      setLoading(false);
      setCodeType("Random Fact");
      setLang("Javascript");
    } catch (error) {
      setLoading(false);
      toast.error(String(error));
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center cursor-pointer text-white bg-ascent font-bold rounded-lg text-xl md:text-2xl p-2">
          Post
          <p className="text-2xl ml-2">
            <BsSend />
          </p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="overflow-y-auto min-h-[10vh] max-h-[80vh]">
          <DialogHeader>
            <div className="w-full mb-4">
              <p className="text-xl md:text-2xl mt-3 font-bold">Write a message :</p>

              <div className="mt-2 mr-auto">
                <Select
                  onValueChange={(e: string) => {
                    setCodeType(e);
                  }}
                >
                  <SelectTrigger className="w-[180px] iconHover">
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
                className="mt-4 inp-border focus:outline-none w-full bg-color rounded-md p-1"
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

              <p className="text-xl md:text-2xl mt-3 font-bold">
                Write your code here(optional) :
              </p>

              <div className="mt-2 mr-auto">
                <Select
                  onValueChange={(e: string) => {
                    setLang(e);
                  }}
                >
                  <SelectTrigger className="w-[180px] iconHover">
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
                    <SelectItem value="Cplusplus">C++</SelectItem>
                    <SelectItem value="Ruby">Ruby</SelectItem>
                    <SelectItem value="PHP">PHP</SelectItem>
                    <SelectItem value="Csharp">C#</SelectItem>
                    <SelectItem value="Go">Go</SelectItem>
                    <SelectItem value="Swift">Swift</SelectItem>
                    <SelectItem value="Kotlin">Kotlin</SelectItem>
                    <SelectItem value="Rust">Rust</SelectItem>
                    <SelectItem value="SQL">SQL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <textarea
                value={code}
                className="mt-4 inp-border focus:outline-none w-full bg-color rounded-md p-1"
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
                  <Carousel className="w-3/5 md:w-3/5">
                    <CarouselContent>
                      {images.map((image: string, index: number) => (
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

                    <div className="text-ascent">
                      <CarouselPrevious />
                    </div>
                    <div className="text-ascent">
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
                  onClick={inputClicked}
                  className="w-fit cursor-pointer flex items-center text-ascent"
                >
                  <p className="mr-2 text-lg md:text-xl mb-1">Insert image(s)</p>
                  <p className="text-2xl">
                    <BsCardImage />
                  </p>
                </div>

                <div
                  onClick={() => {
                    submit();
                  }}
                  className="flex items-center bg-ascent text-white px-2 py-.05 rounded-lg cursor-pointer ml-auto"
                >
                  <p className="mr-2 text-xl">Post</p>

                  <p className="text-2xl">
                    <BsArrowRight />
                  </p>
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
