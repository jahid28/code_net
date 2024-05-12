export interface normalUserInterface {
    name: string;
    userName: string;
    email: string;
    profilePic:string,
    password:string
}

export interface googleUserInterface {
    name: string;
    email: string;
    profilePic:string
  }

interface commentInterface{
    user:string,
    comment:string
}
export interface postInterface {
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
  
  
  