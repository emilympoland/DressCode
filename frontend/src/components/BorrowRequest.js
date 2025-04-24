'use client'; // needed if you plan to use client-side interactivity

import Link from 'next/link';
import '../app/globals.css';
// components/MessagePreview.js

export default function BorrowRequest({name, time, message, id }) {
    return (
        <Link href={`/messages/${id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <div className="message-preview-container">
            <div className="message-content">
                <div className="message-preview-avatar"></div>
                <div className="text-content">
                <p className="message-preview-name">{name}</p>
                <p className="message-preview-message">{message}</p>
                </div>
            </div>
            <div className="message-preview-time">{time}</div>
    </div>
    </Link>
    )
  }
  