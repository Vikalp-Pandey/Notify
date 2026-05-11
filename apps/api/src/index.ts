import { Hono } from "hono";
import notes from "@/routes/notes.routes";
import { connectDB } from "@/db";
import { cors } from "hono/cors";

connectDB();
const app = new Hono();

app.use("/*",cors({
    origin:process.env.ALLOWED_ORIGINS,
    credentials:true,
    allowHeaders:["Content-Type","Authorization"],
    allowMethods:["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
    maxAge:60*60*24,
}))

app.route("/notes", notes);

export default app;
