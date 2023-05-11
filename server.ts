import { Application } from "./deps.ts";
import { productRouter } from "./routes/index.ts";

const app = new Application();

app.use(productRouter.routes());
app.use(productRouter.allowedMethods());

await app.listen({ port: 8000 });
