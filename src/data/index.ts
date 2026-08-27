import type { PortfolioData } from "./types";
import { profile } from "./profile";
import { cases, graphLinks, graphNodes } from "./projects";

export const portfolio: PortfolioData = {
  profile,
  cases,
  graph: { nodes: graphNodes, links: graphLinks },
};

export { profile, cases, graphNodes, graphLinks };
export * from "./types";
