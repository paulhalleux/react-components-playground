import { useState } from "react";
import { Search } from "@paulhalleux/react-playground";

import { ExampleMetadata } from "../components";

function SearchExample() {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  return (
    <>
      <small>
        Start typing to search for a city. Click outside the search box to close
        the dropdown.
      </small>
      <Search
        placeholder="Search city..."
        items={cities}
        onItemSelect={(item) => setSelected(item.label)}
      />
      {selected && <small>Selected: {selected}</small>}
    </>
  );
}

export const metadata: ExampleMetadata = {
  name: "Search",
  component: SearchExample,
  display: {
    padding: true,
    align: "center",
    direction: "column",
  },
};

export const cities = [
  { value: "1", label: "Paris" },
  { value: "2", label: "London" },
  { value: "3", label: "New York" },
  { value: "4", label: "Tokyo" },
  { value: "5", label: "Berlin" },
  { value: "6", label: "Rome" },
  { value: "7", label: "Madrvalue" },
  { value: "8", label: "Lisbon" },
  { value: "9", label: "Amsterdam" },
  { value: "10", label: "Brussels" },
  { value: "11", label: "Copenhagen" },
  { value: "12", label: "Oslo" },
  { value: "13", label: "Stockholm" },
  { value: "14", label: "Helsinki" },
  { value: "15", label: "Reykjavik" },
  { value: "16", label: "Dublin" },
  { value: "17", label: "Prague" },
  { value: "18", label: "Vienna" },
  { value: "19", label: "Warsaw" },
  { value: "20", label: "Budapest" },
  { value: "21", label: "Athens" },
  { value: "22", label: "Moscow" },
  { value: "23", label: "Istanbul" },
  { value: "24", label: "Cairo" },
  { value: "25", label: "Jerusalem" },
  { value: "26", label: "Beirut" },
  { value: "27", label: "Baghdad" },
  { value: "28", label: "Riyadh" },
  { value: "29", label: "Tehran" },
  { value: "30", label: "Kabul" },
  { value: "31", label: "Islamabad" },
  { value: "32", label: "New Delhi" },
  { value: "33", label: "Kathmandu" },
  { value: "34", label: "Dhaka" },
  { value: "35", label: "Bangkok" },
  { value: "36", label: "Hanoi" },
  { value: "37", label: "Manila" },
  { value: "38", label: "Jakarta" },
  { value: "39", label: "Singapore" },
  { value: "40", label: "Kuala Lumpur" },
  { value: "41", label: "Taipei" },
  { value: "42", label: "Hong Kong" },
  { value: "43", label: "Seoul" },
  { value: "44", label: "Tokyo" },
  { value: "45", label: "Beijing" },
  { value: "46", label: "Shanghai" },
  { value: "47", label: "Pyongyang" },
  { value: "48", label: "Ulaanbaatar" },
  { value: "49", label: "Vladivostok" },
  { value: "50", label: "Sydney" },
  { value: "51", label: "Melbourne" },
  { value: "52", label: "Wellington" },
  { value: "53", label: "Auckland" },
];
