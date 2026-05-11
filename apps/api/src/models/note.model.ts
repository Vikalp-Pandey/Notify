import { model, Schema } from "mongoose";

export interface note {
    title:string,
    content:string,
}

export const NoteSchema = new Schema({
   title:{
    type:String,
    required:true,
    minLength:3,
    maxLength:50
   },
   content:{
    type:String,
    required:true,
    minLength:1,
    maxLength:1000,
   }
},{timestamps:true});

export const Note = model<note>('Note',NoteSchema);

