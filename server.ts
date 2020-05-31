
import {Application} from 'https://deno.land/x/oak/mod.ts';
import router from './Router/router.ts';
import { oakCors } from "https://deno.land/x/cors/mod.ts";

let app = new Application();
app.use(router.routes())
app.use(
    oakCors({
      origin: /^.+localhost:(1234|3000|4200)$/,
      optionsSuccessStatus: 200, 
      // some legacy browsers (IE11, various SmartTVs) choke on 204
    }),
  );
app.use(router.allowedMethods())
const options = { hostname: '0.0.0.0', port: 8080 };

await app.listen(options);
  