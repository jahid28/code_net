import { toast } from "sonner";

export async function like(_id: string) {
    try {
      // likeP.current!.innerText = String(Number(likeP.current!.innerText) + 1);
    //   likeDiv.current!.innerHTML = `
    //   <div
    //   onClick={() => {
    //     dislike(e._id);
    //   }}
    // >
    //   <BiSolidLike className="text-2xl mr-4" />
    //   <p className="ml-1">${Number(likeP.current!.innerText) + 1}</p>
    // </div>`;
      const response = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });
      const data = await response.json();
      if (data.success == true) {
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (err: any) {
      toast.error(err);
    }
  }