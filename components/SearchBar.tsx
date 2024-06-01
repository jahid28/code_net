import React, { useRef, useState,KeyboardEvent } from "react";
import { Player } from "@lordicon/react";
import { useRouter } from "next/navigation";

// useRef
// useState
const SearchBar = () => {
  const router = useRouter();

  const playerRefSearchPC = useRef<Player>(null);
  const search = require("@/icons/search.json");
  const [query, setQuery] = useState("");

  function pushQuery() {
    let finalQuery = query.trim();
    if (finalQuery == "") {
      return;
    }

    finalQuery = finalQuery.replace(/\s+/g, " ");

    finalQuery = finalQuery.replace(/ /g, "+");

    router.push(`/searchPage?query=${finalQuery}`);
  }

  function handleKeyDown(event:KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      pushQuery();
    }
  }
  return (
    <div className="w-[100vw] md:w-96 flex items-center justify-center">
      <input
        type="text"
        placeholder="Search"
        onKeyDown={handleKeyDown}
        onChange={(e) => setQuery(e.target.value)}
        className="inp-border flex h-9 w-[85%] rounded-md border  bg-transparent px-3 py-1 text-xs md:text-sm focus:border-neutral-400 focus:ring-2 focus:ring-neutral-400"
      />

      <div
        className="cursor-pointer ml-2 mb-1"
        onClick={pushQuery}
        onMouseEnter={() => playerRefSearchPC.current?.playFromBeginning()}
      >
        <Player
          colorize={"var(--icon-color)"}
          ref={playerRefSearchPC}
          size={40}
          icon={search}
        />
      </div>
    </div>
  );
};

export default SearchBar;
