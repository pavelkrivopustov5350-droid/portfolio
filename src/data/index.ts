import type { PortfolioData } from "./types";
import { profile } from "./profile";
import { cases } from "./projects";

export const portfolio: PortfolioData = {
  profile,
  cases,
};

export { profile, cases };
export * from "./types";
