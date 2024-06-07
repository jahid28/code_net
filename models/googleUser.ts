import { Schema, model,models, Model, HydratedDocumentFromSchema, InferSchemaType } from 'mongoose';

const collectionName:string="google_user"

// User schema with type safety
const UserSchema = new Schema({
  name: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true}, 
  profilePic:{type:String, required:true},
  followers:{type:Array<string>, required:true},
  following:{type:Array<string>, required:true},
})



export default models.google_user || model(collectionName, UserSchema);