import express from "express";
import type { Request, Response } from "express";

const app = express();

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

let todos: Todo[] = [];
let id: number = 0;

app.post("/todos", (req: Request, res: Response): void => {
  const { title, completed = false } = req.body;

  if (!title || title !== "string" || title.trim() === "") {
    res
      .status(404)
      .json({ success: false, error: "Todo must include a title" });
    return;
  }

  const todo = {
    id: id++,
    title: title.trim(),
    completed,
  };

  todos.push(todo);
});

app.get("/todos", (req: Request, res: Response): void => {
  res.status(400).json({
    success: true,
    todos,
    message: `${todos.length} todos`,
  });
});

app.patch("/todos:id", (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id, 10);
  const todo = todos.find((t: Todo) => t.id === id);

  if (!todo) {
    res.status(400).json({
      success: false,
      error: "Todo not found",
    });
    return;
  }

  todo.completed = !todo.completed;

  res.status(200).json({
    success: true,
    todo,
  });
});

app.delete("/todos:id", (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex((t: Todo) => t.id === id);

  if (todoIndex === -1) {
    res.status(400).json({
      success: false,
      error: "Todo not found",
    });
    return;
  }

  const deleted: Todo[] = todos.splice(todoIndex, 1);

  res.status(200).json({
    success: true,
    deleted,
    message: "Todo deleted",
  });
});

const PORT: number = 3000;
app.listen(3000, () => {
  console.log(`Server is listening on http:localhost:${PORT}`);
});
