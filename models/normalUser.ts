import { Schema, model,models, Model, HydratedDocumentFromSchema, InferSchemaType } from 'mongoose';
// import { normalUserInterface } from '@/lib/interfaces';
// Interface for the user document type (without Mongoose methods)
// interface IUser {
//   name: string;
//   email: string;
//   profilePic:string,
//   password:string
// }

const collectionName:string="NormalUserPls"

// User schema with type safety
const UserSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true}, 
  profilePic:{type:String, required:true},
  password:{type:String, required:true},
  followers:{type:Array<string>, required:true},
  following:{type:Array<string>, required:true},
})



export default models.NormalUserPls || model(collectionName, UserSchema);