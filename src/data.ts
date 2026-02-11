import { DogProfile, RouteItem, WarningItem } from "./types";

export const defaultRoutes: RouteItem[] = [
  {
    id: "r1",
    title: "Riverside Loop",
    distanceKm: 3.4,
    difficulty: "easy",
    tags: ["shade", "water-fountain", "puppy-friendly"],
    lastReportMinutesAgo: 18
  },
  {
    id: "r2",
    title: "Old Town Morning Walk",
    distanceKm: 5.2,
    difficulty: "moderate",
    tags: ["urban", "coffee-stop", "social-hotspot"],
    lastReportMinutesAgo: 42
  },
  {
    id: "r3",
    title: "Hill Park Challenge",
    distanceKm: 7.8,
    difficulty: "hard",
    tags: ["trail", "high-energy-dogs", "sunny"],
    lastReportMinutesAgo: 65
  }
];

export const defaultWarnings: WarningItem[] = [
  {
    id: "w1",
    category: "bugs",
    severity: "medium",
    note: "Tick hotspot near the north entrance after rain.",
    area: "Riverside Park North",
    reportedMinutesAgo: 14
  },
  {
    id: "w2",
    category: "glass",
    severity: "high",
    note: "Broken bottle pieces on the bike lane edge.",
    area: "Old Town Bridge",
    reportedMinutesAgo: 31
  }
];

export const defaultDogs: DogProfile[] = [
  {
    id: "d1",
    name: "Luna",
    breed: "Border Collie",
    age: 4,
    activityLevel: "high"
  }
];
