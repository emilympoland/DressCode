"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StyleChallengeCard from "@/components/StyleChallengeCard";
import StyleChallengeSummary from "@/components/StyleChallengeSummary";
import OutfitSavedConfirmation from "@/components/OutfitSavedConfirimation";
import WeatherHeader from "@/components/WeatherHeader";

export default function Challenge() {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [username, setUsername] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // Track which card to display
  const [summaryData, setSummaryData] = useState(null); // Store data for StyleChallengeSummary
  const mockWeather = "Sunny";
  const mockTemperature = 75;
  const router = useRouter();

  useEffect(() => {
    fetch(`${server_url}/api/user/me`, {
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
          setUsername(data.username);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [server_url, router]);

  // Handle transitions between cards
  const handleNext = (data) => {
    if (currentStep === 1) {
      // Transition from StyleChallengeCard to StyleChallengeSummary
      setSummaryData(data); // Save the data returned from the server
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Transition from StyleChallengeSummary to OutfitSavedConfirmation
      setCurrentStep(3);
    }
  };

  return (
    <div className="bg-[#F9F4E7] flex flex-col justify-around items-center">
      <WeatherHeader
        username={username}
        weather={mockWeather}
        temperature={mockTemperature}
      />
      {currentStep === 1 && (
        <StyleChallengeCard server_url={server_url} onNext={handleNext} />
      )}
      {currentStep === 2 && (
        <StyleChallengeSummary
          imageUrls={summaryData.image_urls}
          summary={summaryData.summary}
          onNext={handleNext}
        />
      )}
      {currentStep === 3 && (
        <OutfitSavedConfirmation
          imageUrls={summaryData.image_urls} // Pass the image URLs
          outfitItemIds={summaryData.outfit_ids} // Pass the clothing item IDs
          username={username} // Pass the username
          // profilePicUrl={profilePicUrl} // Pass the profile picture URL
        />
      )}
    </div>
  );
}