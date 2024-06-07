import { toast } from "sonner";

interface dataInterface {
  success: boolean;
  msg: string;
}

export async function like(_id: string): Promise<void> {
    try {
      const response:Response = await fetch("/api/like", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ _id }),
      });
      const data:dataInterface = await response.json();
      if (data.success == true) {
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (err) {
      toast.error(String(err));
    }
  }