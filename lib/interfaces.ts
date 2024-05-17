export interface normalUserInterface {
    name: string;
    userName: string;
    email: string;
    profilePic:string,
    password:string
  }
  
  export interface googleUserInterface {
    name: string;
    userName: string;
    email: string;
    profilePic:string
  }

interface commentInterface{
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

  
  
  