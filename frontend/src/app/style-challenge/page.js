import StyleChallengeCard from "@/components/StyleChallengeCard";
import StyleChallengeSummary from "@/components/StyleChallengeSummary";
import OutfitSavedConfirmation from "@/components/OutfitSavedConfirimation";
import WeatherHeader from "@/components/WeatherHeader";
import { Outfit } from "next/font/google";

export default function Challenge() {
  // Mock data
  const mockUsername = "John Doe";
  const mockWeather = "Sunny";
  const mockTemperature = 75;

  return (
    <div className=" bg-[#F9F4E7] flex flex-col justify-around items-center">
      <WeatherHeader
        username={mockUsername}
        weather={mockWeather}
        temperature={mockTemperature}
      />
      {/* <StyleChallengeCard /> */}
      {/* <StyleChallengeSummary /> */}
      <OutfitSavedConfirmation />
    </div>
  );
}