import express from "express";
import type { Request, Response } from "express";

const app = express();

type Currency = "usd" | "eur" | "gbp";

interface ConversionRates {
  [key: string]: number;
}

interface ConvertInput {
  amount: number;
  currency: Currency;
}

interface ConvertQuery {
  amount?: string;
  currency?: string;
}
interface SuccessResponse {
  input: ConvertInput;
  convertedAmount: number;
  unit: "RWF";
}

interface ErrorResponse {
  error: string;
  message: string;
}

const RATES: ConversionRates = {
  usd: 1300,
  eur: 1420,
  gbp: 1650,
};

app.get(
  "/convert",
  (
    req: Request<{}, {}, {}, ConvertQuery>,
    res: Response<SuccessResponse | ErrorResponse>,
  ): void => {
    const { amount, currency } = req.query;

    if (amount === undefined || currency === undefined) {
      res.status(400).json({
        error: "Invalid Parameters",
        message: "Both amount and currency parameters are needed",
      });
      return;
    }

    const numericAmount: number = parseFloat(amount);
    if (isNaN(numericAmount)) {
      res.status(400).json({
        error: "Invalid amount",
        message: "Amount must be a valid number",
      });
      return;
    }

    if (numericAmount < 0) {
      res.status(400).json({
        error: "Invalid amount",
        message: "Amount must be a non-negative number",
      });
      return;
    }

    const currencyStr: string = currency.toLowerCase().trim();

    const validCurrencies: Currency[] = ["eur", "gbp", "usd"];

    if (!validCurrencies.includes(currencyStr as Currency)) {
      res.status(400).json({
        error: "Invalid currency",
        message: `Currency accepted are: ${validCurrencies.join(",")}`,
      });
      return;
    }

    const rates: number = RATES[currencyStr];
    const convertedAmount: number = Math.round(numericAmount * rates);

    res.status(200).json({
      input: { amount: numericAmount, currency: currencyStr as Currency },
      convertedAmount,
      unit: "RWF",
    });
  },
);

const PORT: number = 3000;
app.listen(PORT, () =>
  console.log(`Converter running on http://localhost:${PORT}`),
);
