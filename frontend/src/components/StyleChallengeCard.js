'use client';
import { useState, useEffect } from 'react';
import ClothingGridSection from './ClothingGridSection';
import PillButton from './PillButton';

export default function StyleChallengeCard({ server_url, onNext }) {
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [selectedShoe, setSelectedShoe] = useState(null);

  const [tops, setTops] = useState([]);
  const [bottoms, setBottoms] = useState([]);
  const [shoes, setShoes] = useState([]);

  // Fetch clothing items from the server
  const refreshItems = (itemType, setItemOfType) => {
    fetch(`${server_url}/api/challenge/refresh/${itemType}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies with the request
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch ${itemType}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          setItemOfType(data.items);
        }
      })
      .catch((error) => {
        console.error(`Error fetching ${itemType}:`, error);
      });
  };

  // Fetch items on component mount
  useEffect(() => {
    refreshItems('tops', setTops);
    refreshItems('pants', setBottoms);
    refreshItems('shoes', setShoes);
  }, [server_url]);

  // Handle the "Next" button click
  const handleSubmit = async () => {
    if (!selectedTop || !selectedBottom || !selectedShoe) {
      alert('Please select a top, bottom, and shoe.');
      return;
    }

    try {
      console.log('selected clothes ids', selectedTop, selectedBottom, selectedShoe);
      const response = await fetch(`${server_url}/api/challenge/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({
          top_id: selectedTop,
          bottom_id: selectedBottom,
          shoe_id: selectedShoe,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit outfit');
      }

      const data = await response.json();
      onNext(data); // Pass the server response to the parent component
    } catch (error) {
      console.error('Error submitting outfit:', error);
    }
  };

  return (
    <div className="w-9/10 max-w-md bg-[#EF6A3F] rounded-2xl p-6">
      <h2 className="text-white text-lg font-alexandria text-center mb-5">
        Daily Style Challenge
      </h2>

      {/* Render clothing items */}
      <ClothingGridSection
        title="Choose a top"
        items={tops}
        selectedItemId={selectedTop}
        onSelect={setSelectedTop}
        onRefresh={() => refreshItems('tops', setTops)}
      />

      <ClothingGridSection
        title="Choose a bottom"
        items={bottoms}
        selectedItemId={selectedBottom}
        onSelect={setSelectedBottom}
        onRefresh={() => refreshItems('pants', setBottoms)}
      />

      <ClothingGridSection
        title="Choose a shoe"
        items={shoes}
        selectedItemId={selectedShoe}
        onSelect={setSelectedShoe}
        onRefresh={() => refreshItems('shoes', setShoes)}
      />

      <div className="pt-2">
        <PillButton text="Next" onClick={handleSubmit} />
      </div>
    </div>
  );
}