'use client';
import '../app/globals.css';

export default function FeedPost({ post, onItemClick }) {
  return (
    <div className="post-container">
      <div className="post-header">
        <img src="anonymous_profile.png" id="user-avatar" />
        <div className="username">@{post.username}</div>
      </div>

      <div className="caption">
        {post.caption}
      </div>
      
      <div className={`items-container ${post.isOutfit ? 'outfit-layout' : 'single-item'}`}>
        {post.items.map(item => (
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
              BORROW
            </button>
          </div>
        ))}
      </div>
      
    </div>
  );
}