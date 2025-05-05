'use client';
import { useEffect, useState } from 'react';
import '../app/globals.css';

export default function FeedPost({ post, onItemClick }) {
  const [items, setItems] = useState([]); // Store item details
  const [loading, setLoading] = useState(true); // Track loading state

  const backendUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000'; // Use environment variable or fallback to localhost:8000

  // Fetch item details based on outfit_item_ids
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const fetchedItems = await Promise.all(
          post.outfit_item_ids.map(async (itemId) => {
            const response = await fetch(`${backendUrl}/api/closet/item/${itemId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include', // Include cookies for authentication
            });

            if (!response.ok) {
              throw new Error(`Failed to fetch item with ID ${itemId}`);
            }

            return await response.json();
          })
        );
        console.log('Fetched items:', fetchedItems);
        setItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching item details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [post.outfit_item_ids, backendUrl]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching items
  }

  return (
    <div className="post-container">
      <div className="post-header">
        <img src={post.profile_pic_url || "anonymous_profile.png"} id="user-avatar" alt="User Avatar" />
        <div className="username font-alexandria">@{post.poster_username}</div>
      </div>

      <div className="caption font-bricolage">
        {post.caption}
      </div>

      <div className={`items-container ${items.length > 1 ? 'outfit-layout' : 'single-item'}`}>
        {items.map(item => (
          <div key={item.id} className="item-box">
            <img
              src={item.image_url}
              alt={item.name}
              className="item-image"
              onClick={() => onItemClick(item)} // Pass the full item object
            />
            <button
              className="item-request-button"
              onClick={() => onItemClick(item)} // Pass the full item object
            >
              borrow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}