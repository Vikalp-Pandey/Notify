import { connectDB } from "@/db";
import app from "@/index";
import { serve } from "@hono/node-server";

await connectDB();

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running at http://localhost:${info.port}`);
  }
);
