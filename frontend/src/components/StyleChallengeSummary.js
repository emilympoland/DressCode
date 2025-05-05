'use client';
import PillButton from './PillButton';
import ClothingItem from './ClothingItem';

export default function StyleChallengeSummary({ imageUrls, summary, onNext }) {
  return (
    <div className="w-9/10 max-w-md bg-[#EF6A3F] rounded-2xl p-6">
      <h2 className="text-white text-lg font-alexandria text-center mb-5">
        Outfit Suggestion For Today
      </h2>

      <div className="flex">
        {/* Left Column */}
        <div className="rounded-lg w-2/5 mr-2 flex flex-col items-center justify-between">
          {imageUrls.map((imageUrl, index) => (
            <ClothingItem
              key={index}
              imageUrl={imageUrl}
              name={`Item ${index + 1}`}
              size={30}
            />
          ))}
        </div>

        {/* Right Column */}
        <div className="bg-[#F9F4E7] p-4 rounded-lg w-3/5 ml-2 flex">
          <p className="text-[#EF6A3F] font-bricolage font-extralight text-sm">
            {summary}
          </p>
        </div>
      </div>

      <div className="pt-4">
        <PillButton text="Next" onClick={onNext} />
      </div>
    </div>
  );
}