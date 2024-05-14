import { Schema, model,models, Model, HydratedDocumentFromSchema, InferSchemaType } from 'mongoose';
// import { postInterface } from '@/lib/interfaces';
// Interface for the user document type (without Mongoose methods)
// interface IUser {
//   name: string;
//   email: string;
//   profilePic:string,
//   password:string
// }
interface commentInterface{
    user:string,
    comment:string
}

const collectionName:string="Post"

// User schema with type safety
const PostSchema = new Schema({
  userName: { type: String, required: true },
  codeType: { type: String, required: true },
  msg: { type: String, required: true}, 
  code:{type:String, required:true},
  lang:{type:String, required:true},
  imagesForMongoDB:{type:Array<string>,required:true},
  date:{type:Date, required:true},
  likes:{type:Number, required:true},
  commentsNum:{type:Number, required:true},
  comments:{type:Array<commentInterface>, required:true},
})



export default models.Post || model(collectionName, PostSchema);