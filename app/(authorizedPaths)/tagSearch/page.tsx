// "use client";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import PostSkeleton from "@/components/PostSkeleton";
// import { toast } from "sonner";
// import SinglePost from "@/components/SinglePost";
// import { postInterface } from "@/lib/interfaces";
// import Image from "next/image";

// interface PageProps {
//   searchParams: React.PropsWithChildren<{ tags: string }>;
// }

// interface getPostInterface extends postInterface {
//   _id: string;
// }

// const TagSearch: React.FC<PageProps> = ({ searchParams }) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [posts, setPosts] = useState<getPostInterface[]>([]);

//   const fetchData = async (): Promise<void> => {
//     try {
//       let tags: string = searchParams.tags;
//       if (tags === undefined) {
//         router.replace("/");
//       }
//       tags = tags.trim();
//       if (tags === "") {
//         router.replace("/");
//       }
//       let tagsArr: string[] = tags.split("-");

//       setLoading(true);
//       const response: Response = await fetch("/api/tagSearch", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify({ tagsArr }),
//       });
//       const data = await response.json();
//       if (data.success === false) {
//         toast.error(data.msg);
//         setLoading(false);
//         return;
//       }
//       setLoading(false);
//       setPosts(data.postArray);
//     } catch (error) {
//       toast.error(String(error));
//     }
//   };

//   useEffect((): void => {
//     fetchData();
//   }, [searchParams.tags]);

//   return (
//     <div className="grid place-items-center">
//       <div className="w-[90vw] md:w-[50vw] mb-6">
//         {loading && <PostSkeleton />}

//         {!loading &&
//           posts.length > 0 &&
//           posts.map((e: getPostInterface, index: number) => {
//             return <SinglePost key={index} data={e} />;
//           })}

//         {posts.length === 0 && !loading && (
//           <div className="grid place-items-center   ">
//             <Image
//               className="mt-10 mb-4"
//               src="/empty.png"
//               width={300}
//               height={300}
//               alt="404"
//             />
//             <p className="text-2xl font-bold">NO RESULTS</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TagSearch;
