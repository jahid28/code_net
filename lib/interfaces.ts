export interface normalUserInterface {
    name: string;
    userName: string;
    email: string;
    profilePic:string,
    password:string,
    followers:Array<string>,
    following:Array<string>,
  }
  
  export interface googleUserInterface {
    name: string;
    userName: string;
    email: string;
    profilePic:string,
    followers:Array<string>,
    following:Array<string>,
  }

export interface commentInterface{
    name:string,
    user:string,
    profilePic:string,
    comment:string
}
export interface postInterface {
  userName:string,
  name:string,
  profilePic:string,
    codeType: string;
    msg: string;
    code:string;
    lang:string;
    imagesForMongoDB:Array<string>;
    date:Date;
    // likes:number;
    likedBy:Array<string>;
    // commentsNum:number;
    comments:Array<commentInterface>;
  }

  
  export const languageMap = {
    Python: "python",
    Javascript: "javascript",
    JSX: "jsx",
    Typescript: "typescript",
    TSX: "tsx",
    HTML: "xml", // CodeMirror uses 'xml' for HTML
    CSS: "css",
    Java: "java",
    C: "clike", // CodeMirror uses 'clike' for C and C++
    "C++": "cpp",
    Ruby: "ruby",
    PHP: "php",
    "C#": "csharp",
    Go: "go",
    Swift: "swift",
    Kotlin: "kotlin",
    Rust: "rust",
    SQL: "sql",
    Markdown: "markdown",
    JSON: "json",
    YAML: "yaml",
    XML: "xml",
    Bash: "bash",
    Shell: "shell",
  };
  
