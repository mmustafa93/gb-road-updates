export type Road = {
  id: string;
  name: string;
  status: "Open" | "Delays" | "Closed";
  lastUpdated: string;
};

export const roads: Road[] = [
  { id: "1", name: "Karakoram Highway (Gilgit–Hunza)", status: "Open", lastUpdated: "9 Dec, 5:42 PM" },
  { id: "2", name: "Babusar Pass", status: "Delays", lastUpdated: "9 Dec, 4:15 PM" },
  { id: "3", name: "Skardu Road", status: "Open", lastUpdated: "9 Dec, 5:20 PM" },
  { id: "4", name: "Deosai Road", status: "Closed", lastUpdated: "9 Dec, 3:00 PM" },
  { id: "5", name: "Astore Road", status: "Open", lastUpdated: "9 Dec, 5:10 PM" },
  { id: "6", name: "Shigar Road", status: "Open", lastUpdated: "9 Dec, 4:45 PM" },
  { id: "7", name: "Khunjerab Pass", status: "Closed", lastUpdated: "9 Dec, 2:30 PM" },
  { id: "8", name: "Gilgit–Chilas", status: "Delays", lastUpdated: "9 Dec, 5:00 PM" },
  { id: "9", name: "Hunza–Sost", status: "Open", lastUpdated: "9 Dec, 4:30 PM" },
  { id: "10", name: "Skardu–Shangrila", status: "Open", lastUpdated: "9 Dec, 5:35 PM" },
  { id: "11", name: "Naran–Babusar", status: "Delays", lastUpdated: "9 Dec, 3:50 PM" },
  { id: "12", name: "Ghizer Road", status: "Open", lastUpdated: "9 Dec, 4:00 PM" },
];