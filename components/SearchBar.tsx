import React, { useRef, useState, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BsSearch } from "react-icons/bs";

const SearchBar: React.FC = () => {
  const router: AppRouterInstance = useRouter();

  const [query, setQuery] = useState<string>("");

  function pushQuery(): void {
    let finalQuery: string = query.trim();
    if (finalQuery == "") {
      return;
    }

    finalQuery = finalQuery.replace(/\s+/g, " ");

    finalQuery = finalQuery.replace(/ /g, "+");

    router.push(`/searchPage?query=${finalQuery}`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
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
        className="cursor-pointer ml-2"
        onClick={pushQuery}
      >
        <p className="text-3xl iconHover"><BsSearch/></p>
      </div>
    </div>
  );
};

export default SearchBar;
