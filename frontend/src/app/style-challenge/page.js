import StyleChallengeCard from "@/components/StyleChallengeCard";
import WeatherHeader from "@/components/WeatherHeader";

export default function Challenge() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col content-center items-center">
        <WeatherHeader />
        <StyleChallengeCard />
    </div>
  );
}