// app/explore/page.js

'use client';
import { useState } from 'react';
import FeedPost from '../../components/FeedPost';
import ExpandedPost from '../../components/ExpandedPost';
import DateSelector from '../../components/DateSelector';
import '../globals.css';

export default function Explore() {
  // Updated posts data to include both single items and outfits
  const dummyPosts = [
    {
      id: 1,
      username: 'sophia_style',
      userAvatar: '/avatar1.jpg',
      caption: 'Some of my favorite pieces this season!',
      isOutfit: true, // This is an outfit post with multiple items
      items: [
        { id: 'top1', image: '/Mock Clothes/top1.jpg', name: 'White Button Shirt', category: 'Tops' },
        { id: 'bottom2', image: '/Mock Clothes/pants2.jpg', name: 'Black Jeans', category: 'Bottoms' },
        { id: 'shoe3', image: '/Mock Clothes/shoe3.jpg', name: 'Ankle Boots', category: 'Shoes' }
      ]
    },
    {
      id: 2,
      username: 'fashion_forward',
      userAvatar: '/avatar2.jpg',
      caption: 'My new favorite shirt!',
      isOutfit: false, // This is a single item post
      items: [
        { id: 'top2', image: '/Mock Clothes/top2.jpg', name: 'Blue Sweater', category: 'Tops' }
      ]
    },
    {
      id: 3,
      username: 'style_maven',
      userAvatar: '/avatar3.jpg',
      caption: 'Perfect combo for fall weather.',
      isOutfit: true,
      items: [
        { id: 'top3', image: '/Mock Clothes/top3.jpg', name: 'Striped Tee', category: 'Tops' },
        { id: 'bottom1', image: '/Mock Clothes/pants1.jpg', name: 'Denim Jeans', category: 'Bottoms' },
        { id: 'shoe1', image: '/Mock Clothes/shoe1.jpg', name: 'Casual Sneakers', category: 'Shoes' }
      ]
    }
  ];

  // We'll still track borrow requests in state, but won't display them in the feed
  const [borrowRequests, setBorrowRequests] = useState([]);
  const [view, setView] = useState('feed'); // 'feed', 'detail', 'dateSelect', 'requestSent'
  const [selectedItem, setSelectedItem] = useState(null);
  
  // individual item click in feed
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setView('detail');
  };
  
  // back button
  const handleBack = () => {
    if (view === 'detail') {
      setView('feed');
    } else if (view === 'dateSelect') {
      setView('detail');
    } else if (view === 'requestSent') {
      setView('feed');
    }
  };
  
  // request to borrow
  const handleRequestBorrow = () => {
    setView('dateSelect');
  };
  
  // confirm date
  const handleConfirmDate = () => {
    // Create a new borrow request with selected item data
    const newRequest = {
      id: Date.now(),
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      itemImage: selectedItem.image,
      borrower: 'You',
      dateRange: 'April 26 - May 3, 2025',
      status: 'pending'
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
          <div className="feed-toggle">Friends Feed</div>
          
          {dummyPosts.map(post => (
            <FeedPost 
              key={post.id} 
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
        <div className="flex items-center justify-center min-h-screen -mt-8">
          <div className="feed-container">
            <div className="text-center px-5 py-10">
              <h2>Request Sent!</h2>
              <p>Your borrow request for {selectedItem?.name} has been sent to the owner.</p>
              <button 
                className="borrow-button mx-auto max-w-[200px] px-8"
                onClick={handleBack}
              >
                Back to Feed
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}