"use client";
import { useState, useEffect } from "react";
import ClothingGridSection from "./ClothingGridSection";
import PillButton from "./PillButton";
import { useRouter } from "next/navigation";

export default function StyleChallengeCard() {
  const router = useRouter();
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [selectedShoe, setSelectedShoe] = useState(null);

  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [shoes, setShoes] = useState([]);

  const refreshItems = (itemType, setItemOfType) => {
    fetch(`${server_url}/api/challenge/refresh/${itemType}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // sends cookies with the request
    })
      .then((response) => {
        if (response.status === 401) {
          console.log("Not logged in");
          router.push("/");
          return Promise.resolve(null);
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("Closet fetch successful!", data);
          setItemOfType(data.items);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    refreshItems("tops", setTops);
    refreshItems("pants", setBottoms);
    refreshItems("shoes", setShoes);
  }, [server_url, router]);

  // const tops = [
  //   { id: "top1", imageUrl: "/Mock Clothes/top1.jpg" },
  //   { id: "top2", imageUrl: "/Mock Clothes/top2.jpg" },
  //   { id: "top3", imageUrl: "/Mock Clothes/top3.jpg" },
  // ];

  // const bottoms = [
  //   { id: "bottom1", imageUrl: "/Mock Clothes/pants1.jpg" },
  //   { id: "bottom2", imageUrl: "/Mock Clothes/pants2.jpg" },
  //   { id: "bottom3", imageUrl: "/Mock Clothes/pants3.jpg" },
  // ];

  // const shoes = [
  //   { id: "shoe1", imageUrl: "/Mock Clothes/shoe1.jpg" },
  //   { id: "shoe2", imageUrl: "/Mock Clothes/shoe2.jpg" },
  //   { id: "shoe3", imageUrl: "/Mock Clothes/shoe3.jpg" },
  // ];

  const handleNext = () => {
    if (selectedTop && selectedBottom && selectedShoe) {
      // In a real app, you'd save this to global state or query params
      router.push("/suggestion");
    } else {
      alert("Please select a top, bottom, and shoes to continue.");
    }
  };

  return (
    <div className="w-9/10 max-w-md bg-[#EF6A3F] rounded-2xl p-6">
      <h2 className="text-white text-lg font-alexandria text-center mb-5">
        Daily Style Challenge
      </h2>

      <ClothingGridSection
        title="Choose a top"
        items={tops}
        selectedItemId={selectedTop}
        onSelect={setSelectedTop}
        onRefresh={() => refreshItems("tops", setTops)}
      />

      <ClothingGridSection
        title="Choose a bottom"
        items={bottoms}
        selectedItemId={selectedBottom}
        onSelect={setSelectedBottom}
        onRefresh={() => refreshItems("pants", setBottoms)}
      />

      <ClothingGridSection
        title="Choose a shoe"
        items={shoes}
        selectedItemId={selectedShoe}
        onSelect={setSelectedShoe}
        onRefresh={() => refreshItems("shoes", setShoes)}
      />

      <div className="pt-2">
        <PillButton text="next" onClick={handleNext} />
      </div>
    </div>
  );
}
