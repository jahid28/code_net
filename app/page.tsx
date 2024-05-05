"use client";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";
import { getCookie } from "cookies-next";
import { useEffect, useRef, useState, ChangeEvent } from "react";
// import { cookies } from 'next/headers'
// import { getCookie } from 'cookies-next';
import ClipLoader from "react-spinners/ClipLoader";
import { Player } from "@lordicon/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// useRef
export default function Home() {
  const image = useRef(null);
  const playerRefCheck = useRef<Player>(null);
  const playerRefUpload = useRef<Player>(null);
  const check = require("@/icons/check.json");
  const upload = require("@/icons/upload.json");

  const [c, setC] = useState<string | undefined>("nope");
  useEffect(() => {
    const val = getCookie("email");
    setC(val);
    console.log(val);
  }, []);

  // if(cookieVaal!=undefined){
  // console.log("cookie found ",cookieVaal)

  // }

  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImageSrc(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* <div className="overflow-y-auto max-h-[20vh]">
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum autem ut nemo accusamus minima incidunt, enim, sunt error nesciunt laborum recusandae nam non adipisci suscipit doloremque veniam repellendus culpa facilis. Quasi iure non odio reprehenderit earum aliquid ad fuga sapiente obcaecati hic similique, blanditiis consequatur neque recusandae repudiandae voluptates ipsam autem magnam rerum omnis consectetur est? Consequatur tenetur quibusdam excepturi maxime! Aperiam distinctio consectetur sit quisquam delectus tempora reiciendis dolorem iste commodi aspernatur animi, pariatur vero veritatis iusto hic nulla facilis inventore totam incidunt quia, necessitatibus fuga eligendi dignissimos. Officiis ex incidunt minima aliquid consequuntur, ipsum quia dignissimos et, quo nobis pariatur doloribus provident? Dolorum dolore exercitationem amet, veniam tempora aperiam culpa reiciendis omnis, repudiandae rem quos dolores at? Voluptates, iure voluptatibus laboriosam atque reiciendis sunt delectus sint libero, quia porro veniam eius saepe esse ex dolorem aperiam vitae. Voluptatibus nobis maxime quis officiis exercitationem tenetur voluptas rem facere labore officia. Quis accusamus animi voluptates hic itaque voluptatum? Voluptatibus, obcaecati aliquid? Unde doloribus hic reprehenderit vitae esse? Culpa eaque illum amet laborum eligendi nesciunt accusamus voluptatum aspernatur, vitae iusto, necessitatibus, ipsum nisi at hic deleniti perferendis inventore laboriosam recusandae dignissimos. Recusandae temporibus voluptate, aspernatur excepturi facere modi voluptatibus, explicabo provident inventore ea itaque, nostrum ipsam? Repellat, id. Voluptates labore ullam est. Expedita labore deserunt dicta, dolores soluta consequuntur debitis veniam? Quaerat cum ullam ab incidunt? Laborum quis eos illo omnis officia adipisci, alias totam quisquam rerum ipsam commodi labore necessitatibus quam. Iusto magnam animi itaque? Exercitationem vero, earum expedita voluptatibus hic, deleniti blanditiis magni autem optio error ducimus dolores nobis! Quae tempora harum illum enim nam beatae quasi. Distinctio a aliquam suscipit officiis aut laudantium nam soluta, dicta, sequi ipsa possimus eveniet eum corrupti rem! Dolorum, rerum. Voluptatibus molestiae, nesciunt modi fugit, consectetur quibusdam eligendi sapiente necessitatibus vitae, placeat consequuntur in recusandae. Sint cumque provident praesentium facere sunt ut doloribus quidem soluta? Deserunt, rem. Consectetur reprehenderit impedit excepturi temporibus, facilis, in consequuntur quaerat culpa aut, dicta molestias exercitationem voluptates ea nihil natus? Officiis, aliquam. Nostrum, neque harum! Voluptate totam est et. Optio dolor quae quam labore officiis doloremque quo numquam natus ab hic unde et, tempora dignissimos iure, quia ad aperiam voluptate sunt alias praesentium iste eligendi consequuntur. Voluptates accusamus atque distinctio, soluta nobis vero. Libero ipsam nobis, reiciendis incidunt excepturi veritatis debitis pariatur fugiat, deserunt ducimus aliquam voluptate eos quas unde officiis laborum consequuntur earum dignissimos. Voluptatem exercitationem quod laudantium quis ut totam laboriosam expedita atque beatae natus quibusdam unde nihil ratione blanditiis, veniam consequatur enim repellat corporis veritatis cumque dignissimos! Hic nisi suscipit dolorem, quasi repellendus tempora inventore facilis quia! Laudantium laborum quos tempora mollitia consequatur quis iusto libero quas totam incidunt culpa nisi labore, omnis similique natus error dolore quibusdam sint fugiat nihil repudiandae et sed distinctio perspiciatis. Non placeat beatae accusantium eos vero ex aperiam voluptatibus sequi, amet, ipsam, asperiores illo laborum ea molestiae saepe. Alias molestias, quos ipsum, quasi neque impedit nemo cupiditate illum vitae asperiores sint dolores aperiam quidem dolorum nam debitis reprehenderit at atque numquam? Quaerat non quibusdam consequatur sint perspiciatis numquam accusantium sequi quas a, dolorum explicabo commodi deleniti obcaecati sunt, aspernatur soluta voluptatum, incidunt placeat voluptatibus eaque? Possimus facilis voluptates natus consequatur illo id enim doloribus quisquam voluptatum mollitia. Alias a dolor quam ea? Earum iste aperiam ea saepe ex! Sequi dolor numquam deleniti cupiditate modi ratione expedita quibusdam provident eum, omnis inventore quasi impedit temporibus magnam quo? Necessitatibus eligendi facilis laborum quaerat excepturi, a tenetur itaque natus voluptate iure cupiditate ut doloremque quae ad veritatis neque quos. Pariatur repudiandae quia architecto illo eos velit sint veritatis omnis. Unde harum, saepe earum reprehenderit iusto deserunt esse porro autem doloribus vitae eius recusandae nobis debitis ducimus quos? Rerum dolor id et, nostrum quae fugiat minima mollitia reprehenderit aperiam tenetur eius aut dolorem vero. Quis veritatis commodi saepe. Ipsum porro deleniti doloribus natus laudantium repellendus nesciunt quae mollitia aliquam impedit id, quos voluptate tenetur quas deserunt voluptatum ea nam eius. Sequi dolor recusandae, deleniti, voluptatibus perferendis, quis neque blanditiis dicta exercitationem sint suscipit qui placeat fugiat possimus a consequuntur. Animi illum, perferendis harum magni mollitia vero quasi rerum doloremque molestiae aliquid delectus libero quisquam, veritatis eos architecto nobis iusto voluptatem asperiores ab assumenda. Aspernatur libero quam quisquam, eum modi odit mollitia vel optio maiores repellendus suscipit explicabo! Libero asperiores fugit sit rerum incidunt veritatis esse amet at quas distinctio, laborum deleniti, nam sequi consectetur a! Cum, eaque blanditiis. Odio delectus dolor architecto dolore! At odio dolor soluta laborum iure. Rem facere repellat saepe cumque provident laboriosam aliquam delectus fugit! Quia nihil ea, velit laudantium ducimus quam. Minus nisi rerum accusantium iste. Vel est sequi omnis iure a, assumenda pariatur laudantium, ducimus, labore qui dignissimos eaque laboriosam placeat atque quae et asperiores voluptatibus non? Magnam provident, maxime sapiente quos eaque reprehenderit excepturi ducimus, quod, illo non repellat sunt cupiditate amet debitis recusandae. Temporibus omnis consequatur fugit praesentium facere, natus atque corporis, voluptatum, nulla doloremque in vel ad fugiat officiis delectus vitae nostrum adipisci ea quia. Eos possimus magnam dolorum laudantium dolores incidunt. Natus perferendis maxime ipsam sit assumenda nostrum recusandae adipisci, officia similique ea dolores impedit eveniet perspiciatis, voluptate dolorum laborum repellat labore repudiandae delectus iste! Et, explicabo facilis velit, temporibus ullam, provident nulla impedit beatae ab praesentium dolorum? Facilis, praesentium, aspernatur doloribus excepturi quibusdam esse architecto temporibus quo tempore, nisi deleniti beatae obcaecati ex sed ad illum eum omnis dolorum enim voluptas autem maiores iure sequi. Culpa repellat facere ipsam magni maiores temporibus repellendus? Est cumque, totam voluptatem nobis, amet commodi sit at quidem inventore ipsa sapiente aliquam, dolorem tempore eius repellendus veniam rerum sunt. Enim rem laborum deleniti, eaque ratione ipsam commodi dicta nostrum, dolore itaque qui dolorem repellat, repellendus nam deserunt impedit explicabo saepe magnam labore iste ea in nobis nulla. Vel, id animi unde illo provident magnam ullam commodi assumenda cum repellat repellendus, libero earum qui delectus veritatis laudantium dicta tempora cumque sapiente, exercitationem officia. Incidunt maiores officia rerum beatae, sunt vero ad, libero illum quo quam quaerat dolore voluptas?
</div> */}
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
              <div className="flex items-center">
                <DialogTitle>Write a message you want to post</DialogTitle>
                <p className="bg-red-500 hover:bg-red-600 align-middle text-white px-2 py-0.5 rounded-xl cursor-pointer text-lg ml-2">
                  Post
                </p>
              </div>

              <form action="">
                <textarea
                  className="mt-4 bg-color text-color rounded-md p-1"
                  cols={50}
                  rows={8}
                  id="userTextinp"
                  required
                  autoComplete="off"
                  placeholder="What's happening?"
                ></textarea>

                <div ref={image} className="overflow-y-auto max-h-[20vh]">
                  {imageSrc && (
                    <div>
                      <h2>Selected Image:</h2>
                      <img
                        src={imageSrc}
                        alt="Selected"
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  )}
                </div>

                <div
                  className="ml-2 w-fit cursor-pointer border-red-400 border-2"
                  onMouseOver={() =>
                    playerRefUpload.current?.playFromBeginning()
                  }
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <Player
                    colorize="white"
                    ref={playerRefUpload}
                    size={32}
                    icon={upload}
                  />
                </div>
              </form>
            </div>
            <DialogDescription></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="bg-color text-color mt-28">{c}</div>
    </>
  );
}
