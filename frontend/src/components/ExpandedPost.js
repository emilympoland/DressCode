'use client';
import '../app/globals.css';

export default function ExpandedPost({ item, onBack, onRequestBorrow }) {
  return (
    <div className="item-detail">
       <h3>{item.name}</h3>
      
      <img
        src={item.image}
        alt={item.name}
        className="detail-image"
      />
      
      <div className="item-info">
        <div className="categories">
          Category: {item.category}
        </div>
      </div>
      
      <div className="button-row">
        <button className="back-button" onClick={onBack}>
          back
        </button>
        <button className="borrow-button" onClick={onRequestBorrow}>
          REQUEST TO BORROW
        </button>
      </div>
    </div>
  );
}