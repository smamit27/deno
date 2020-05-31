import {RouterContext} from 'https://deno.land/x/oak/mod.ts';
import db from '../mongodb.ts'
const notesCollection = db.collection('notes');
const welcomeNote = async (ctx: RouterContext) => {
    ctx.response.body = {
        message:'Welcome to Docker Deno Mongodb' 
    };
}

const allNote = async (ctx: RouterContext) => {
    const notes = await notesCollection.find();
    ctx.response.body = notes;
}
const singleNote =  async (ctx: RouterContext) => {
    const id = ctx.params.id;
    const notes = await notesCollection.findOne({_id:{$oid: id} });
    ctx.response.body = notes;
}
const updateNote =  async (ctx: RouterContext) => {
    const {value: {title,body}} = await ctx.request.body();
    const id = ctx.params.id;
    const {modifiedCount} = await notesCollection.updateOne({_id:{$oid: id}},
        { $set: { title,body }    
    });
    if(!modifiedCount){
        ctx.response.status = 404;
        ctx.response.body = {message: 'Note not found'};
        return
    }
    ctx.response.body = await notesCollection.findOne({_id:{$oid: id} });
}
const deleteNote =  async (ctx: RouterContext) => {
    const id = ctx.params.id;
    const count = await notesCollection.deleteOne({_id:{$oid: id} });
    if(!count){
        ctx.response.status = 404;
        ctx.response.body = {
            message: 'Note Does not exist'
        }
        return;
    }
    
    ctx.response.status = 204;
}
const createNote = async (ctx: RouterContext) => {
    
    const {value: {title,body}} = await ctx.request.body();
    const note:any = {
        title,
        body,
        date: new Date()}
    const insertId = await notesCollection.insertOne(note);
      console.log(insertId);
      note._id = insertId;
      ctx.response.status = 201;
    ctx.response.body = note;
}

export {welcomeNote,allNote,singleNote,createNote,updateNote,deleteNote}