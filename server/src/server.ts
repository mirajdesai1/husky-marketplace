import Express from "express";
import CORS from "cors";

const app = Express();
app.use(CORS());
app.use(Express.json())

app.listen(process.env.PORT || 8081)