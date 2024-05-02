import Image from "next/image";
import ReactMarkdown from "react-markdown"
import Markdown from "markdown-to-jsx"
// import { cookies } from 'next/headers'
// import { getCookie } from 'cookies-next';
export default function Home() {
  const code = `
  function greet(name) {
    console.log("Hello, " + name + "!");
  }
  greet("World");
  `;

        // if(cookieVaal!=undefined){
          // console.log("cookie found ",cookieVaal)
          
        // }

  return (
  <>
  <div className="bg-color text-color">

  <h1>hello</h1>
  <pre><code>
   {code}

  </code></pre>
  
  </div>
  </>
  );
}
