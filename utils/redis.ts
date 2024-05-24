import { Redis } from "@upstash/redis";
const redis = new Redis({
  url: "https://relative-tick-51028.upstash.io",
  token:
    "AcdUAAIncDFjM2ZmYmJkZWQ0MmQ0OGQzYjM0ODk5ZDM3MmQxZTY3MHAxNTEwMjg",
});

export default redis;
