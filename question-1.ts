import express, { Request, Response } from "express";

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
  input: Currency;
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
