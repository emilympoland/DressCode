'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FeedPost from '../../components/FeedPost';
import ExpandedPost from '../../components/ExpandedPost';
import DateSelector from '../../components/DateSelector';
import PillButton from '../../components/PillButton';
import '../globals.css';

export default function Explore() {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();

  const [posts, setPosts] = useState([]); // Store posts fetched from the API
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [view, setView] = useState('feed'); // 'feed', 'detail', 'dateSelect', 'requestSent'
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch feed data from the backend
  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(`${server_url}/api/feed`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Include cookies for authentication
        });

        if (response.status === 401) {
          console.log('Not logged in');
          router.push('/'); // Redirect to login if not authenticated
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log('feed data', data)
        setPosts(data); // Save the fetched posts to state
      } catch (error) {
        console.error('Error fetching feed data:', error);
      }
    };

    fetchFeed();
  }, [server_url, router]); // Re-fetch feed data when the page is loaded

  // Individual item click in feed
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setView('detail');
  };

  // Back button
  const handleBack = () => {
    if (view === 'detail') {
      setView('feed');
    } else if (view === 'dateSelect') {
      setView('detail');
    } else if (view === 'requestSent') {
      setView('feed');
    }
  };

  // Request to borrow
  const handleRequestBorrow = () => {
    setView('dateSelect');
  };

  // Confirm date
  const handleConfirmDate = () => {
    // Create a new borrow request with selected item data
    const newRequest = {
      id: Date.now(),
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      itemImage: selectedItem.image,
      borrower: 'You',
      dateRange: 'April 26 - May 3, 2025',
      status: 'pending',
    };

    // Add this request to the borrowRequests state
    setBorrowRequests([...borrowRequests, newRequest]);

    // Set view to show success message and then return to feed
    setView('requestSent');
  };

  return (
    <main>
      {view === 'feed' && (
        <div className="feed-container">
          {posts.map((post, index) => (
            <FeedPost
              key={post.id || index} // Use post.id if available, otherwise fallback to index
              post={post}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
      )}

      {view === 'detail' && selectedItem && (
        <ExpandedPost
          item={selectedItem}
          onBack={handleBack}
          onRequestBorrow={handleRequestBorrow}
        />
      )}

      {view === 'dateSelect' && selectedItem && (
        <DateSelector
          item={selectedItem}
          onBack={handleBack}
          onConfirm={handleConfirmDate}
        />
      )}

      {view === 'requestSent' && (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-10">
          <img src={"/check.png"} alt="check" className="w-1/2 h-auto object-cover rounded-md mb-4" />
          <h1 className="font-bricolage font-extralight text-[22px] text-black text-center mb-4">
            Request Sent!
            Your borrow request has been sent to the owner.
          </h1>
          <PillButton
            text="return to home"
            onClick={() => setView('feed')} // Set the view back to 'feed'
            bgColor={'bg-[#EF6A3F]'}
            textColor={'text-[#F9F4E7]'}
          />
        </div>
      )}
    </main>
  );
}
