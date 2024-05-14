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
    user:string,
    comment:string
}
export interface postInterface {
  userName:string,
    codeType: string;
    msg: string;
    code:string;
    lang:string;
    imagesForMongoDB:Array<string>;
    date:Date;
    likes:number;
    commentsNum:number;
    comments:Array<commentInterface>;
  }
  
  
  