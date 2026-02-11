export type Difficulty = "easy" | "moderate" | "hard";

export interface RouteItem {
  id: string;
  title: string;
  distanceKm: number;
  difficulty: Difficulty;
  tags: string[];
  lastReportMinutesAgo: number;
}

export type WarningCategory =
  | "bugs"
  | "glass"
  | "poison"
  | "aggressive-dog"
  | "traffic"
  | "heat";

export type WarningSeverity = "low" | "medium" | "high";

export interface WarningItem {
  id: string;
  category: WarningCategory;
  severity: WarningSeverity;
  note: string;
  area: string;
  reportedMinutesAgo: number;
}

export interface DogProfile {
  id: string;
  name: string;
  breed: string;
  age: number;
  activityLevel: "low" | "medium" | "high";
}
