"use client";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];
import React, { useEffect, useRef, useState } from "react";
import { Player } from "@lordicon/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
// useState
// useRef
const Tags = () => {
  const router = useRouter();
  const playerRefTag = useRef<Player>(null);
  const tag = require("@/icons/tag.json");
  const playerRefCross = useRef<Player>(null);
  const cross = require("@/icons/cross.json");

  const [tagsArr, setTagsArr] = useState<Array<string>>([]);

  const [msgTypeObj, setMsgTypeObj] = useState<any>({
    "Random Fact": false,
    Question: false,
    "Code to share": false,
  });

  const [langObj, setLangObj] = useState<any>({
    Python: false,
    Javascript: false,
    JSX: false,
    Typescript: false,
    TSX: false,
    HTML: false,
    CSS: false,
    Java: false,
    C: false,
    "C++": false,
    Ruby: false,
    PHP: false,
    "C#": false,
    Go: false,
    Swift: false,
    Kotlin: false,
    Rust: false,
    SQL: false,
  });

  function pushQuery() {
    let finalQuery = ""
   for(let i=0;i<tagsArr.length;i++){
      finalQuery += tagsArr[i] + "-"
   }
    // finalQuery = finalQuery.replace(/\s+/g, " ");

    // finalQuery = finalQuery.replace(/ /g, "+");

    router.push(`/tagSearch?tags=${finalQuery.slice(0, -1)}`);
  }

  useEffect(() => {
    if (tagsArr.length > 0) {
      pushQuery();
    }
    if (tagsArr.length == 0) {
      router.push(`/`);
    }
  }, [tagsArr]);

  return (
    <div className="border-red-500 border-2 text-color">
      <div
        id="allTags"
        className="flex items-center border-yellow-500 border-2"
      >
        <div
          onMouseEnter={() => playerRefTag.current?.playFromBeginning()}
          className="text-3xl ml-2 flex w-fit font-bold items-center border-green-500 border-2"
        >
          <p className="mr-2">Tags</p>

          <Player
            colorize={"var(--icon-color)"}
            ref={playerRefTag}
            size={30}
            icon={tag}
          />
        </div>

        <div className="ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex">
                Msg Type <IoIosArrowDown className="text-xl mt-1 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator /> */}
              <DropdownMenuCheckboxItem
                checked={msgTypeObj["Random Fact"]}
                onCheckedChange={() => {
                  setMsgTypeObj({
                    ...msgTypeObj,
                    "Random Fact": !msgTypeObj["Random Fact"],
                  });
                  !msgTypeObj["Random Fact"]
                    ? setTagsArr([...tagsArr, "Random Fact"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "Random Fact")
                      );
                }}
              >
                Random Fact
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={msgTypeObj["Question"]}
                onCheckedChange={() => {
                  setMsgTypeObj({
                    ...msgTypeObj,
                    Question: !msgTypeObj["Question"],
                  });
                  !msgTypeObj["Question"]
                    ? setTagsArr([...tagsArr, "Question"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "Question")
                      );
                }}

                // disabled
              >
                Question
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={msgTypeObj["Code to share"]}
                onCheckedChange={() => {
                  setMsgTypeObj({
                    ...msgTypeObj,
                    "Code to share": !msgTypeObj["Code to share"],
                  });
                  !msgTypeObj["Code to share"]
                    ? setTagsArr([...tagsArr, "Code to share"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "Code to share")
                      );
                }}
              >
                Code to share
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex">
                Language <IoIosArrowDown className="text-xl mt-1 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {/* <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator /> */}
              <DropdownMenuCheckboxItem
                checked={langObj["Python"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    Python: !langObj["Python"],
                  });
                  !msgTypeObj["Python"]
                    ? setTagsArr([...tagsArr, "Python"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "Python")
                      );
                }}
              >
                Python
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["Javascript"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    Javascript: !langObj["Javascript"],
                  });
                  !langObj["Javascript"]
                    ? setTagsArr([...tagsArr, "Javascript"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "Javascript")
                      );
                }}
              >
                Javascript
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["JSX"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    JSX: !langObj["JSX"],
                  });
                  !langObj["JSX"]
                    ? setTagsArr([...tagsArr, "JSX"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "JSX")
                      );
                }}
              >
                JSX
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["Typescript"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    Typescript: !langObj["Typescript"],
                  });
                  !langObj["Typescript"]
                    ? setTagsArr([...tagsArr, "Typescript"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "Typescript")
                      );
                }}
              >
                Typescript
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["TSX"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    TSX: !langObj["TSX"],
                  });
                  !langObj["TSX"]
                    ? setTagsArr([...tagsArr, "TSX"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "TSX")
                      );
                }}
              >
                TSX
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["HTML"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    HTML: !langObj["HTML"],
                  });
                  !langObj["HTML"]
                    ? setTagsArr([...tagsArr, "HTML"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "HTML")
                      );
                }}
              >
                HTML
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["CSS"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    CSS: !langObj["CSS"],
                  });
                  !langObj["CSS"]
                    ? setTagsArr([...tagsArr, "CSS"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "CSS")
                      );
                }}
              >
                CSS
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["Java"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    Java: !langObj["Java"],
                  });
                  !langObj["Java"]
                    ? setTagsArr([...tagsArr, "Java"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "Java")
                      );
                }}
              >
                Java
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["C"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    C: !langObj["C"],
                  });
                  !langObj["C"]
                    ? setTagsArr([...tagsArr, "C"])
                    : setTagsArr(tagsArr.filter((tag: string) => tag !== "C"));
                }}
              >
                C
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["C++"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    "C++": !langObj["C++"],
                  });
                  !langObj["C++"]
                    ? setTagsArr([...tagsArr, "C++"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "C++")
                      );
                }}
              >
                C++
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["Ruby"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    Ruby: !langObj["Ruby"],
                  });
                  !langObj["Ruby"]
                    ? setTagsArr([...tagsArr, "Ruby"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "Ruby")
                      );
                }}
              >
                Ruby
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["PHP"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    PHP: !langObj["PHP"],
                  });
                  !langObj["PHP"]
                    ? setTagsArr([...tagsArr, "PHP"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "PHP")
                      );
                }}
              >
                PHP
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["C#"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    "C#": !langObj["C#"],
                  });
                  !langObj["C#"]
                    ? setTagsArr([...tagsArr, "C#"])
                    : setTagsArr(tagsArr.filter((tag: string) => tag !== "C#"));
                }}
              >
                C#
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["Go"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    Go: !langObj["Go"],
                  });
                  !langObj["Go"]
                    ? setTagsArr([...tagsArr, "Go"])
                    : setTagsArr(tagsArr.filter((tag: string) => tag !== "Go"));
                }}
              >
                Go
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["Swift"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    Swift: !langObj["Swift"],
                  });
                  !langObj["Swift"]
                    ? setTagsArr([...tagsArr, "Swift"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "Swift")
                      );
                }}
              >
                Swift
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["Kotlin"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    Kotlin: !langObj["Kotlin"],
                  });
                  !langObj["Kotlin"]
                    ? setTagsArr([...tagsArr, "Kotlin"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "Kotlin")
                      );
                }}
              >
                Kotlin
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["Rust"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    Rust: !langObj["Rust"],
                  });
                  !langObj["Rust"]
                    ? setTagsArr([...tagsArr, "Rust"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "Rust")
                      );
                }}
              >
                Rust
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={langObj["SQL"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    SQL: !langObj["SQL"],
                  });
                  !langObj["SQL"]
                    ? setTagsArr([...tagsArr, "SQL"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "SQL")
                      );
                }}
              >
                SQL
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {tagsArr.length > 0 && (
          <button className="ml-2 text-white bg-red-500 py-1 px-2 rounded-lg text-lg">
            Search
          </button>
        )}
      </div>

      {tagsArr.length > 0 && (
        <div
          id="selectedTags"
          className="border-red-400 border-2 mt-2 mb-2 flex items-center flex-wrap"
        >
          {tagsArr.map((e) => (
            <div
              className="bg-dark-color flex items-center rounded-lg py-1 px-2 mr-2 cursor-pointer"
              onClick={() => {
                setTagsArr(() => tagsArr.filter((tag: string) => tag !== e));
                if (e in msgTypeObj) {
                  setMsgTypeObj({
                    ...msgTypeObj,
                    [e]: false,
                  });
                } else {
                  setLangObj({
                    ...langObj,
                    [e]: false,
                  });
                }
              }}
            >
              <p>
              {e}
              </p>

            <div>
            <MdOutlineCancel className="ml-2 text-lg"/>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tags;
