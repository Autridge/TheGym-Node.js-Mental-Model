import express from "express";
import type { Request, Response } from "express";

const app = express();
app.use(express.json());

interface SignupSuccess {
  success: true;
  username: string;
  email: string;
  password?: string;
}
interface ValidationError {
  success: false;
  errors: string[];
}

app.post(
  "/register",
  (req: Request, res: Response<SignupSuccess | ValidationError>): void => {
    const { username, email, password } = req.body;

    const errors: string[] = [];

    if (
      !username ||
      typeof username !== "string" ||
      username.trim().length < 3
    ) {
      errors.push("username must be at least 3 characters");
    }

    if (
      !email ||
      !email.includes("@") ||
      !email.includes(".") ||
      email.trim() === ""
    ) {
      errors.push("email must include @ and .");
    }

    if (
      !password ||
      typeof password !== "string" ||
      password.trim().length < 6
    ) {
      errors.push("password must be at least 6 characters");
    }

    if (errors.length > 0) {
      res.status(400).json({
        success: false,
        errors,
      });
      return;
    }

    res.status(201).json({
      success: true,
      username,
      email,
    });
  },
);

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening at http:localhost:${PORT}`);
});
