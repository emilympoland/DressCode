'use client';
import '../app/globals.css';

// Mock function to map outfit_item_ids to item details
// Replace this with actual logic to fetch item details if needed
const getItemDetails = (itemId) => {
  const mockItems = {
    1: { id: 1, name: "Top", image: "top.jpg" },
    2: { id: 2, name: "Bottom", image: "bottom.jpg" },
    3: { id: 3, name: "Shoes", image: "shoes.jpg" },
  };
  return mockItems[itemId] || { id: itemId, name: "Unknown", image: "placeholder.jpg" };
};

export default function FeedPost({ post, onItemClick }) {
  console.log('post is', post);

  // Map outfit_item_ids to item details
  const items = post.outfit_item_ids.map(getItemDetails);

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
              src={item.image} 
              alt={item.name} 
              className="item-image"
              onClick={() => onItemClick(item)}
            />
            <button 
              className="item-request-button"
              onClick={() => onItemClick(item)}
            >
              borrow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}