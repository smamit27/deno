import { MongoClient } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb+srv://deno:!pa$$w0rd@deno-j1qiv.mongodb.net/test?retryWrites=true&w=majority");
const db = client.database("notes");
export default db;