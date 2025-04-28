'use client';
import '../app/globals.css';

export default function ExpandedPost({ item, onBack, onRequestBorrow }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="item-detail flex flex-col items-center justify-center p-4 rounded-2xl bg-[#EB6D39] w-[90%] max-w-md mx-auto -mt-16">
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
            BACK
          </button>
          <button className="expanded-borrow-button" onClick={onRequestBorrow}>
            BORROW
          </button>
        </div>
      </div>
    </div>
  );
}