import { Schema, model,models, Model, HydratedDocumentFromSchema, InferSchemaType } from 'mongoose';
// import { googleUserInterface } from '@/lib/interfaces';
// Interface for the user document type (without Mongoose methods)
// interface IUser {
//   name: string;
//   email: string;
//   profilePic:string
// }

const collectionName:string="GoogleUserPls"

// User schema with type safety
const UserSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true}, 
  profilePic:{type:String, required:true},
  followers:{type:Array<string>, required:true},
  following:{type:Array<string>, required:true},
})



export default models.GoogleUserPls || model(collectionName, UserSchema);