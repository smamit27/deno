import {Router} from 'https://deno.land/x/oak/mod.ts';
 let router = new Router();
 import * as note from './controller/app.ts'
 import { oakCors } from "https://deno.land/x/cors/mod.ts";


 router.get('/',oakCors(),note.welcomeNote)
       .get('/notes',oakCors(),note.allNote)
       .get('/notes/:id',oakCors(),note.singleNote)
       .post('/notes',oakCors(),note.createNote)
       .put('/notes/:id',oakCors(),note.updateNote)
       .options("/notes/:id", oakCors()) 
       .delete('/notes/:id',oakCors(),note.deleteNote)




 export default router;