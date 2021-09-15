import express from "express";
import { Request, Response } from "express";
import { MAGIC_MESSAGE } from "./constants";
import React from "react";
import ReactDOMServer from "react-dom/server";
import Example from "./components/Example";

const app = express();

const ComponentFactory = React.createFactory(Example);

const { PORT = 3000 } = process.env;
app.get("/", (req: Request, res: Response) => {
  res.send({
    message: ReactDOMServer.renderToString(
      ComponentFactory({
        message: MAGIC_MESSAGE,
      })
    ),
  });
});
app.listen(PORT, () => {
  console.log("server started at http://localhost:" + PORT);
});
