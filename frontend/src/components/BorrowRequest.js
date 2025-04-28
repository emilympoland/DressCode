'use client'; // needed if you plan to use client-side interactivity

import Link from 'next/link';
import '../app/globals.css';
// components/MessagePreview.js

export default function BorrowRequest({ requestInfo, handleAction }) {
  if (!requestInfo) return null;

  return (
    <div className="request-card">
      {requestInfo.status === 'pending' && (
        <div className="borrow-request pending">
          <h2>Requests to Borrow</h2>
          <img src='/Mock Clothes/shoe1.jpg' alt={requestInfo.itemName} className="item-image" />
          <p className="date-range">{requestInfo.dateRange}</p>
          <div className="action-buttons">
            <button 
              className="decline-button"
              onClick={() => handleAction('decline')}
            >
              decline
            </button>
            <button 
              className="accept-button"
              onClick={() => handleAction('accept')}
            >
              accept
            </button>
          </div>
        </div>
      )}

      {requestInfo.status === 'approved' && (
        <div className="borrow-request approved">
          <h2>You've Lent Nicole</h2>
          <img src='/Mock Clothes/shoe1.jpg' alt={requestInfo.itemName} className="item-image" /> 
          <p className="date-range">{requestInfo.dateRange}</p>
        </div>
      )}
    </div>
  );
}

  