import { Schema, model,models } from 'mongoose';
// import { number } from 'zod';


const collectionName:string="no_of_post_req"

// User schema with type safety
const no_of_post_reqSchema = new Schema({
    no_of_post_req_doc: { type: Number, required: true },
})



export default models.no_of_post_req || model(collectionName, no_of_post_reqSchema);