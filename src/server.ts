import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chatRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (_req, res) => {
  res.json({
    message:
      "GenAI Backend Running",
  });
});


app.use("/api/chat",chatRoutes);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`
  ================================
  Server running on port ${PORT}
  ================================
  `);
});

app.use(errorMiddleware);