import dotenv from "dotenv";
import cookieSession from "cookie-session"
import express from "express";
import path from "path";
import * as sessionAuth from "./middleware/sessionAuth";
import * as routes from "./routes";

// initialize config
dotenv.config();
const port = process.env.SERVER_PORT;
const app = express();

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );


app.use(cookieSession({
    name: 'session',
    secret: process.env.SESSION_SECRET,

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))

// Configure session auth
sessionAuth.register( app );

// Configure routes
routes.register( app );

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
