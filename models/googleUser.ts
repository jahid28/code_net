import { Schema, model,models, Model, HydratedDocumentFromSchema, InferSchemaType } from 'mongoose';
import { googleUserInterface } from '@/lib/interfaces';
// Interface for the user document type (without Mongoose methods)
// interface IUser {
//   name: string;
//   email: string;
//   profilePic:string
// }

const collectionName:string="GoogleUser"

// User schema with type safety
const UserSchema = new Schema<googleUserInterface>({
  name: { type: String, required: true },
  email: { type: String, required: true}, 
  profilePic:{type:String, required:true}
})



export default models.GoogleUser || model(collectionName, UserSchema);