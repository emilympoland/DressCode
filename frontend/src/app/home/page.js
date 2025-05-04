"use client";

import StyleChallengeCard from "@/components/StyleChallengeCard";
import StyleChallengeSummary from "@/components/StyleChallengeSummary";
import OutfitSavedConfirmation from "@/components/OutfitSavedConfirimation";
import WeatherHeader from "@/components/WeatherHeader";
import { Outfit } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Challenge() {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const [username, setUsername] = useState("");
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

  return (
    <div className=" bg-[#F9F4E7] flex flex-col justify-around items-center">
      <WeatherHeader
        username={username}
        weather={mockWeather}
        temperature={mockTemperature}
      />
      <StyleChallengeCard />
      {/* <StyleChallengeSummary /> */}
      {/* <OutfitSavedConfirmation /> */}
    </div>
  );
}
