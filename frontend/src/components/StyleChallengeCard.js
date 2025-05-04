"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import ClothingItem from "./ClothingItem";
import PillButton from "./PillButton";

export default function StyleChallengeCard() {
  const [challenge, setChallenge] = useState(null); // Challenge data
  const [selectedTop, setSelectedTop] = useState(null); // Selected top ID
  const [selectedBottom, setSelectedBottom] = useState(null); // Selected bottom ID
  const [selectedShoe, setSelectedShoe] = useState(null); // Selected shoe ID

  // Fetch challenge data on component mount
  useEffect(() => {
    axios
      .get("/api/challenge/today")
      .then((response) => {
        setChallenge(response.data);
      })
      .catch((error) => {
        console.error("Error fetching challenge:", error);
      });
  }, []);

  // Handle "Next" button click
  const handleNext = () => {
    if (!selectedTop || !selectedBottom || !selectedShoe) {
      alert("Please select a top, bottom, and shoe.");
      return;
    }

    axios
      .post("/api/challenge/submit", {
        top_id: selectedTop,
        bottom_id: selectedBottom,
        shoe_id: selectedShoe,
      })
      .then((response) => {
        alert(response.data.summary); // Display the summary from the backend
      })
      .catch((error) => {
        console.error("Error submitting outfit:", error);
      });
  };

  if (!challenge) {
    return <p>Loading...</p>; // Show a loading message while fetching data
  }

  return (
    <div className="w-9/10 max-w-md bg-[#EF6A3F] rounded-2xl p-6">
      <h2 className="text-white text-lg font-alexandria text-center mb-5">
        {challenge.prompt}
      </h2>

      <div className="flex">
        {/* Top Clothing Items */}
        <div className="rounded-lg w-1/3 mr-2 flex flex-col items-center justify-between">
          {challenge.tops.map((item) => (
            <ClothingItem
              key={item.id}
              imageUrl={item.image_url}
              name={item.name}
              size={30}
              isSelected={selectedTop === item.id}
              onClick={() => setSelectedTop(item.id)}
            />
          ))}
        </div>

        {/* Bottom Clothing Items */}
        <div className="rounded-lg w-1/3 mx-2 flex flex-col items-center justify-between">
          {challenge.bottoms.map((item) => (
            <ClothingItem
              key={item.id}
              imageUrl={item.image_url}
              name={item.name}
              size={30}
              isSelected={selectedBottom === item.id}
              onClick={() => setSelectedBottom(item.id)}
            />
          ))}
        </div>

        {/* Shoe Clothing Items */}
        <div className="rounded-lg w-1/3 ml-2 flex flex-col items-center justify-between">
          {challenge.shoes.map((item) => (
            <ClothingItem
              key={item.id}
              imageUrl={item.image_url}
              name={item.name}
              size={30}
              isSelected={selectedShoe === item.id}
              onClick={() => setSelectedShoe(item.id)}
            />
          ))}
        </div>
      </div>

      <div className="pt-4">
        <PillButton text="Next" onClick={handleNext} />
      </div>
    </div>
  );
}