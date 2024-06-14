export interface normalUserInterface {
  name: string;
  userName: string;
  email: string;
  profilePic: string,
  password: string,
  followers: Array<string>,
  following: Array<string>,
}

export interface googleUserInterface {
  name: string;
  userName: string;
  email: string;
  profilePic: string,
  followers: Array<string>,
  following: Array<string>,
}

export interface commentInterface {
  name: string,
  user: string,
  profilePic: string,
  comment: string
}
export interface postInterface {
  userName: string,
  name: string,
  profilePic: string,
  codeType: string;
  msg: string;
  code: string;
  lang: string;
  imagesForMongoDB: Array<string>;
  date: Date;
  likedBy: Array<string>;
  comments: Array<commentInterface>;
}


export const languageMap: { [key: string]: string } = {
  Python: "python",
  Javascript: "javascript",
  JSX: "jsx",
  Typescript: "typescript",
  TSX: "tsx",
  HTML: "xml",
  CSS: "css",
  Java: "java",
  C: "clike",
  "C++": "cpp",
  Ruby: "ruby",
  PHP: "php",
  "C#": "csharp",
  Go: "go",
  Swift: "swift",
  Kotlin: "kotlin",
  Rust: "rust",
  SQL: "sql",
};


export interface jwtTokenInterface {
  name: string,
  userName: string,
  email: string,
  profilePic: string,
  iat: number,
  exp: number
}

export interface profileInterface {
  name: string;
  userName: string;
  profilePic: string;
}

export interface reduxInterface {
  email:string,
  currentUserDetails: {
    name: string,
    userName: string,
    email: string,
    profilePic: string,
    followers: Array<string>,
    following: Array<string>,
    noti:boolean
  },
  redisPostList: Array<string>
};