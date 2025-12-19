export type Road = {
  id: string;
  name: string;
  status: "Open" | "Delays" | "Closed";
  roadReport: string;
  lastUpdated: string;

  distance: string;
  travelTimeCar: string;
  travelTimeBus: string;
  description: string;
};

export const roads: Road[] = [
  {
    id: "1",
    name: "Karakoram Highway (Chilas to Gilgit)",
    status: "Open",
    roadReport: "Road is open for all traffic.",
    lastUpdated: "9 Dec, 5:42 PM",
    distance: "Approximately 220 km",
    travelTimeCar: "6–7 hours",
    travelTimeBus: "8–9 hours",
    description:
      "This critical stretch of the Karakoram Highway connects Chilas with Gilgit and remains operational throughout most of the year. Travelers may experience occasional slowdowns due to landslides or weather-related maintenance."
  },
  {
    id: "2",
    name: "Karakoram Highway (Gilgit to Lower Hunza)",
    status: "Open",
    roadReport: "Road is open for all traffic.",
    lastUpdated: "9 Dec, 5:42 PM",
    distance: "Approximately 100 km",
    travelTimeCar: "2.5–3 hours",
    travelTimeBus: "4 hours",
    description:
      "A well-traveled and reliable section of the Karakoram Highway, this route serves daily commuters and tourists alike, with generally stable road conditions."
  },
  {
    id: "3",
    name: "Karakoram Highway (Lower Hunza to Upper Hunza)",
    status: "Open",
    roadReport: "Road is open for all traffic.",
    lastUpdated: "9 Dec, 5:42 PM",
    distance: "Approximately 90 km",
    travelTimeCar: "2–3 hours",
    travelTimeBus: "3.5–4.5 hours",
    description:
      "Passing through mountainous terrain and scenic villages, this route remains open with some slow-moving sections due to elevation and road curvature."
  },
  {
    id: "4",
    name: "Karakoram Highway (Upper Hunza to Khunjerab Pass)",
    status: "Closed",
    roadReport: "Road is closed due to seasonal conditions.",
    lastUpdated: "9 Dec, 5:42 PM",
    distance: "Approximately 80 km",
    travelTimeCar: "2–3 hours (when open)",
    travelTimeBus: "Not operational",
    description:
      "This high-altitude section leading to Khunjerab Pass is seasonally closed due to heavy snowfall and extreme weather conditions. Reopening depends on clearance operations."
  },
  {
    id: "5",
    name: "Babusar Pass",
    status: "Closed",
    roadReport: "Road is closed due to seasonal conditions.",
    lastUpdated: "9 Dec, 4:15 PM",
    distance: "Approximately 150 km",
    travelTimeCar: "5–6 hours (summer)",
    travelTimeBus: "7–8 hours (summer)",
    description:
      "A major seasonal route connecting Naran and Chilas, Babusar Pass remains closed during winter due to heavy snowfall and high avalanche risk."
  },
  {
    id: "6",
    name: "Jaglot Skardu Road",
    status: "Open",
    roadReport: "Road is open for all traffic.",
    lastUpdated: "9 Dec, 5:20 PM",
    distance: "Approximately 170 km",
    travelTimeCar: "6–7 hours",
    travelTimeBus: "8–9 hours",
    description:
      "This key access route to Skardu features narrow sections and varying terrain but is currently open and accessible for regular vehicular movement."
  },
  {
    id: "7",
    name: "Skardu to Deosai Road",
    status: "Closed",
    roadReport: "Road is closed due to seasonal conditions.",
    lastUpdated: "9 Dec, 3:00 PM",
    distance: "Approximately 35 km",
    travelTimeCar: "2 hours (when open)",
    travelTimeBus: "Not operational",
    description:
      "Leading to the Deosai Plateau, this road remains closed during winter months due to snow accumulation and freezing temperatures."
  },
  {
    id: "8",
    name: "Astore Valley Road",
    status: "Open",
    roadReport: "Road is open for all traffic.",
    lastUpdated: "9 Dec, 5:10 PM",
    distance: "Approximately 120 km",
    travelTimeCar: "4–5 hours",
    travelTimeBus: "6–7 hours",
    description:
      "A vital valley road serving local communities and visitors, currently functional with moderate traffic and occasional slow patches."
  },
  {
    id: "9",
    name: "Astore to Deosai Road",
    status: "Closed",
    roadReport: "Road is closed due to seasonal conditions.",
    lastUpdated: "9 Dec, 5:10 PM",
    distance: "Approximately 40 km",
    travelTimeCar: "2–3 hours (when open)",
    travelTimeBus: "Not operational",
    description:
      "This high-altitude route remains inaccessible in winter due to heavy snowfall and limited road maintenance during colder months."
  },
  {
    id: "10",
    name: "Skardu to Shigar Road",
    status: "Delays",
    roadReport: "Road is open with intermittent delays.",
    lastUpdated: "9 Dec, 4:45 PM",
    distance: "Approximately 30 km",
    travelTimeCar: "1–1.5 hours",
    travelTimeBus: "2 hours",
    description:
      "A short but busy route, delays may occur due to local traffic congestion and ongoing roadwork near populated areas."
  },
  {
    id: "11",
    name: "Skardu to Khaplu",
    status: "Open",
    roadReport: "Road is open for all traffic.",
    lastUpdated: "9 Dec, 2:30 PM",
    distance: "Approximately 110 km",
    travelTimeCar: "4–5 hours",
    travelTimeBus: "6–7 hours",
    description:
      "Frequently used for inter-district travel, this road remains open with stable driving conditions and steady traffic flow."
  },
  {
    id: "12",
    name: "Ghizer Road",
    status: "Open",
    roadReport: "Road is open for all traffic.",
    lastUpdated: "9 Dec, 4:00 PM",
    distance: "Approximately 140 km",
    travelTimeCar: "5–6 hours",
    travelTimeBus: "7–8 hours",
    description:
      "Serving the Ghizer region, this road is generally in fair condition, with potential slowdowns in narrow valley sections."
  },
];