'use client';
import PillButton from './PillButton';
import ClothingItem from './ClothingItem';

export default function StyleChallengeSummary() {
    const clothingItems = [
        { id: 'item1', imageUrl: '/Mock Clothes/top1.jpg', name: 'Top 1' },
        { id: 'item2', imageUrl: '/Mock Clothes/pants1.jpg', name: 'Pants 1' },
        { id: 'item3', imageUrl: '/Mock Clothes/shoe1.jpg', name: 'Shoes 1' },
    ];

    return (
        <div className="w-9/10 max-w-md bg-[#EF6A3F] rounded-2xl p-6">
            <h2 className="text-white text-lg font-alexandria text-center mb-5">
                Outfit Suggestion For Today
            </h2>

            <div className="flex">
                {/* Left Column */}
                <div className="rounded-lg w-2/5 mr-2 flex flex-col items-center justify-between">
                    {clothingItems.map((item) => (
                        <ClothingItem
                            key={item.id}
                            imageUrl={item.imageUrl}
                            name={item.name}
                            size={30}
                        />
                    ))}
                </div>

                {/* Right Column */}
                <div className="bg-[#F9F4E7] p-4 rounded-lg w-3/5 ml-2 flex">
                    <p className="text-[#EF6A3F] font-bricolage font-extralight text-sm">
                        FILL ME WITH AI CONTENT
                    </p>
                </div>
            </div>

            <div className="pt-4">
                <PillButton text="next" onClick={() => { }} />
            </div>
        </div>
    );
}