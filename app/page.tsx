"use client";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Markdown from "markdown-to-jsx";
import { getCookie } from "cookies-next";
import { useEffect, useRef, useState, ChangeEvent } from "react";
// import { cookies } from 'next/headers'
// import { getCookie } from 'cookies-next';
import ClipLoader from "react-spinners/ClipLoader";
import PostBox from "@/components/PostBox";
// import { OpenAI } from 'openai'

export default function Home() {

  const [c, setC] = useState<string | undefined>("nope");
  useEffect(() => {
    const val = getCookie("email");
    setC(val);
    console.log(val);
  }, []);

  
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  // const handleSubmit = async (e:any) => {
  //   e.preventDefault();

  //   try {
  //     const API_KEY = ''; // Replace with your actual key (store securely)
  //     const url = 'https://api.openai.com/v1/completions';

  //     const aidata = {
  //       model: 'text-davinci-003', // Choose the desired ChatGPT model
  //       prompt: prompt,
  //       max_tokens: 1024, // Adjust for desired response length
  //       temperature: 0.7, // Controls randomness (0: deterministic, 1: creative)
  //     };

  //     const options = {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${API_KEY}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(aidata),
  //     };

  //     const response = await fetch(url, options);
  //     const data = await response.json();
  //     setResponse(data.choices[0].text.trim()); // Access response text
  //   } catch (error) {
  //     console.error(error);
  //     setResponse('Error occurred. Please try again later.');
  //   } finally {
  //     setPrompt(''); // Clear prompt after submission
  //   }
  // };


// const openai = new OpenAI( { apiKey: '' } );

// openai.chat.completions.create({ 
//     model: "gpt-3.5-turbo",
//     messages: [
//         { role: "user", content: "Hello ChatGPT" }
//     ]
// }).then(res => {
//     console.log(res)
//     res.choices.forEach( out => console.log(out.message) );
// });
  

  return (
    <>
    <div className="mt-20">

      {/* <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
        />
        <button type="submit">Send</button>
      </form>
      {response && <p>ChatGPT Response: {response}</p>} */}
   
    </div>
     <PostBox/>
      <div className="bg-color text-color mt-28">{c}</div>
    </>
  );
}
