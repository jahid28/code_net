import { Schema, model,models, Model, HydratedDocumentFromSchema, InferSchemaType } from 'mongoose';

// Interface for the user document type (without Mongoose methods)
interface IUser {
  name: string;
  email: string;
}

const collectionName:string="User"

// User schema with type safety
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true}, // Add unique constraint for email
});



export default models.User || model(collectionName, UserSchema);