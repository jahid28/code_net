"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostSkeleton from "@/components/PostSkeleton";
import { toast } from "sonner";
import SinglePost from "@/components/SinglePost";
import { postInterface } from "@/lib/interfaces";
import SingleProfile from "@/components/SingleProfile";
import Image from "next/image";
import { profileInterface } from "@/lib/interfaces";
import { useSearchParams } from "next/navigation";

// interface PageProps {
//   searchParams: React.PropsWithChildren<{ query: string }>;
// }
interface getPostInterface extends postInterface {
  _id: string;
}

const SearchPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const searchParams = useSearchParams();

  const [posts, setPosts] = useState<getPostInterface[]>([]);
  const [profiles, setProfiles] = useState<profileInterface[]>([]);

  let query: string | null = searchParams.get("query");
  if (query === null || query.trim() === "") {
    router.replace("/");
  }
  // else{

  // }
  // query = query.trim();
  // if (query === "") {
  //   router.replace("/");
  // }
  query = query!.replace(/\s+/g, " ");
  let queryArray = query.trim().split(" ");

  const fetchData = async (): Promise<void> => {
    try {
      setLoading(true);
      const response: Response = await fetch("/api/searchQuery", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ queryArray }),
      });
      const data = await response.json();
      if (data.success === false) {
        toast.error(data.msg);
        setLoading(false);
        return;
      }
      setLoading(false);
      setPosts(data.postArray);
      setProfiles(data.profileArray);
    } catch (error) {
      toast.error(String(error));
    }
  };

  useEffect((): void => {
    fetchData();
  }, [searchParams]);

  return (
    <div className="grid place-items-center">
      <div className="w-[90vw] md:w-[50vw] mb-6">
        {loading && <PostSkeleton />}

        {!loading &&
          profiles.length > 0 &&
          profiles.map((e: profileInterface, index: number) => {
            return (
              <SingleProfile
                key={index}
                name={e.name}
                userName={e.userName}
                profilePic={e.profilePic}
              />
            );
          })}

        {!loading &&
          posts.length > 0 &&
          posts.map((e: getPostInterface, index: number) => {
            return <SinglePost key={index} data={e} />;
          })}

        {posts.length === 0 && profiles.length === 0 && !loading && (
          <div className="grid place-items-center   ">
            <Image
              className="mt-10 mb-4"
              src="/empty.png"
              width={300}
              height={300}
              alt="404"
            />
            <p className="text-2xl font-bold">NO RESULTS</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
