import express from "express";
import type { Request, Response, NextFunction } from "express";

const app = express();

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    const timeStamp: string = new Date().toISOString();

    console.log(`[${timeStamp}] ${req.method} ${req.path} - ${duration}ms`);
  });

  next();
};

app.use(requestLogger);

app.get("/", (req: Request, res: Response): void => {
  res.status(200).json({
    message: "Welcome to the API",
    route: "/",
  });
});

app.get("/users", (req: Request, res: Response) => {
  const users = [
    {
      id: 1,
      name: "John",
    },
    {
      id: 2,
      name: "Alice",
    },
  ];

  res.status(200).json({
    message: "users retrived",
    count: users.length,
    users,
  });
});

app.post("/users", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Users created",
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT: number = 3000;
app.listen(3000, () => {
  console.log(`Server is listening on http:localhost:${PORT}`);
});
