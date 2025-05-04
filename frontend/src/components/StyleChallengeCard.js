'use client';
import { useState } from 'react';
import ClothingGridSection from './ClothingGridSection';
import PillButton from './PillButton';
import { useRouter } from 'next/navigation';

export default function StyleChallengeCard() {
    const router = useRouter();

    const [selectedTop, setSelectedTop] = useState(null);
    const [selectedBottom, setSelectedBottom] = useState(null);
    const [selectedShoe, setSelectedShoe] = useState(null);

    const tops = [
        { id: 'top1', imageUrl: '/Mock Clothes/top1.jpg' },
        { id: 'top2', imageUrl: '/Mock Clothes/top2.jpg' },
        { id: 'top3', imageUrl: '/Mock Clothes/top3.jpg' },
    ];

    const bottoms = [
        { id: 'bottom1', imageUrl: '/Mock Clothes/pants1.jpg' },
        { id: 'bottom2', imageUrl: '/Mock Clothes/pants2.jpg' },
        { id: 'bottom3', imageUrl: '/Mock Clothes/pants3.jpg' },
    ];

    const shoes = [
        { id: 'shoe1', imageUrl: '/Mock Clothes/shoe1.jpg' },
        { id: 'shoe2', imageUrl: '/Mock Clothes/shoe2.jpg' },
        { id: 'shoe3', imageUrl: '/Mock Clothes/shoe3.jpg' },
    ];

    const handleNext = () => {
        if (selectedTop && selectedBottom && selectedShoe) {
            // In a real app, you'd save this to global state or query params
            router.push('/suggestion');
        } else {
            alert('Please select a top, bottom, and shoes to continue.');
        }
    };

    return (
        <div className="w-9/10 max-w-md bg-[#EF6A3F] rounded-2xl p-6">

            <h2 className="text-white text-lg font-alexandria text-center mb-5">Daily Style Challenge</h2>

            <ClothingGridSection
                title="Choose a top"
                items={tops}
                selectedItemId={selectedTop}
                onSelect={setSelectedTop}
                onRefresh={() => console.log('refresh tops')}
            />

            <ClothingGridSection
                title="Choose a bottom"
                items={bottoms}
                selectedItemId={selectedBottom}
                onSelect={setSelectedBottom}
                onRefresh={() => console.log('refresh bottoms')}
            />

            <ClothingGridSection
                title="Choose a shoe"
                items={shoes}
                selectedItemId={selectedShoe}
                onSelect={setSelectedShoe}
                onRefresh={() => console.log('refresh shoes')}
            />

            <div className="pt-2">
                <PillButton text="next" onClick={handleNext} />
            </div>
        </div>
    );
}
