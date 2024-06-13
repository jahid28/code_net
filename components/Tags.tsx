// "use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useEffect, useRef, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BsTags, BsXCircle } from "react-icons/bs";
import { useSearchParams } from "next/navigation";

interface msgTypeObjInterface {
  "Random Fact": boolean;
  Question: boolean;
  "Code to share": boolean;
}

interface langObjInterface {
  Python: boolean;
  Javascript: boolean;
  JSX: boolean;
  Typescript: boolean;
  TSX: boolean;
  HTML: boolean;
  CSS: boolean;
  Java: boolean;
  C: boolean;
  Cplusplus: boolean;
  Ruby: boolean;
  PHP: boolean;
  Csharp: boolean;
  Go: boolean;
  Swift: boolean;
  Kotlin: boolean;
  Rust: boolean;
  SQL: boolean;
}

// interface propsInterface {
//   // followingList: string[];
//   tagParams: string[];
// }
const Tags: React.FC = () => {
  const router: AppRouterInstance = useRouter();
  const searchParams = useSearchParams();

  const [tagsArr, setTagsArr] = useState<Array<string>>([]);
  const [tagParamCheck, setTagParamCheck] = useState<boolean>(false);

  const [msgTypeObj, setMsgTypeObj] = useState<msgTypeObjInterface>({
    "Random Fact": false,
    Question: false,
    "Code to share": false,
  });

  const [langObj, setLangObj] = useState<langObjInterface>({
    Python: false,
    Javascript: false,
    JSX: false,
    Typescript: false,
    TSX: false,
    HTML: false,
    CSS: false,
    Java: false,
    C: false,
    Cplusplus: false,
    Ruby: false,
    PHP: false,
    Csharp: false,
    Go: false,
    Swift: false,
    Kotlin: false,
    Rust: false,
    SQL: false,
  });

  function pushQuery(): void {
    let finalQuery: string = "";
    for (let i = 0; i < tagsArr.length; i++) {
      finalQuery += tagsArr[i] + "-";
    }

    router.push(`/?tags=${finalQuery.slice(0, -1)}`);
  }

  type tagType = {
    [key: string]: boolean;
  };

  useEffect(() => {
    let tags: string | null = searchParams.get("tags");
    if (tags != null && tags.trim() != "" && !tagParamCheck) {
      setTagParamCheck(true);
      console.log("calling tagsArr");
      // if (props.tagParams.length > 0) {
      //   setTagsArr(props.tagParams);
      // }
      setTagsArr(tags.split("-"));

      let msgtemp: tagType = {};
      let langtemp: tagType = {};

      tags.split("-").map((e: string) => {
        if (e in msgTypeObj) {
          msgtemp[e] = true;
        }

        if (e in langObj) {
          langtemp[e] = true;
        }
      });

      setMsgTypeObj({
        ...msgTypeObj,
        ...msgtemp,
      });
      setLangObj({
        ...langObj,
        ...langtemp,
      });
    }
  }, [searchParams]);

  useEffect((): void => {
    if (tagsArr.length > 0) {
      pushQuery();
    }
    if (tagsArr.length == 0) {
      console.log("empty tags");
      router.push(`/?tags=`);
    }
  }, [tagsArr]);

  return (
    <div className="text-color mb-6">
      <div id="allTags" className="flex items-center flex-wrap">
        <div className="text-3xl ml-2 flex w-fit font-bold items-center">
          <p className="mr-2 mb-2">Tags</p>

          <p className="text-2xl iconHover">
            <BsTags/>
          </p>
        </div>

        <div className="ml-2 mb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex iconHover">
                Msg Type <IoIosArrowDown className="text-xl mt-1 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
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

        <div className="ml-2 mb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex iconHover">
                Language <IoIosArrowDown className="text-xl mt-1 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuCheckboxItem
                checked={langObj["Python"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    Python: !langObj["Python"],
                  });
                  !langObj["Python"]
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
                checked={langObj["Cplusplus"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    Cplusplus: !langObj["Cplusplus"],
                  });
                  !langObj["Cplusplus"]
                    ? setTagsArr([...tagsArr, "Cplusplus"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "Cplusplus")
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
                checked={langObj["Csharp"]}
                onCheckedChange={() => {
                  setLangObj({
                    ...langObj,
                    Csharp: !langObj["Csharp"],
                  });
                  !langObj["Csharp"]
                    ? setTagsArr([...tagsArr, "Csharp"])
                    : setTagsArr(
                        tagsArr.filter((tag: string) => tag !== "Csharp")
                      );
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
      </div>

      {tagsArr.length > 0 && (
        <div
          id="selectedTags"
          className="mt-2 mb-2 flex items-center flex-wrap"
        >
          {tagsArr.map((e: string, index: number) => (
            <div
              key={index}
              className="bg-dark-color mb-1 flex items-center rounded-lg py-1 px-2 mr-2 cursor-pointer"
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
              <p>{e}</p>

              <div>
                <BsXCircle className="ml-2 text-lg iconHover" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tags;
