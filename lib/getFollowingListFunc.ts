// import { toast } from "sonner";

// interface getFollowingListInterface {
//     success:boolean,
//     userName: string;
//     data: string[];
//   }

// export const getFollowingList = async ():Promise<void | getFollowingListInterface> => {
//     try {
//       const res:Response = await fetch("/api/getFollowingList", {
//         method: "GET",
//         headers: {
//           "Content-type": "application/json",
//         },
//         // body: JSON.stringify({
//         //   user,
//         // }),
//       });
//       const data = await res.json();
//       if (data.success === false) {
//         toast.error(data.msg);
//     } else {
//         const finalData: getFollowingListInterface = data
//         return finalData;
//       }
//     } catch (error) {
//       toast.error(String(error));
//     }
//   };