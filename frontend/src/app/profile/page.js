'use client';

// app/profile/page.js
import Filter from "./filter";
import "./page.css";
import { useState } from 'react';

export default function Profile() {
    const [activeTab, setActiveTab] = useState('myCloset');
    return (
        <>
        <div id="header-profile">
            <img src="anonymous_profile.png" id="profile_picture"/>
            <div id="header-info">
                <h2>John Doe</h2>
                <h4>@johndoe</h4>
            </div>
        </div>
        <div className="pageContainer">
      <div className="tabs">
      <button
          className={`tabButton ${activeTab === 'myCloset' ? 'activeTab' : ''}`}
          onClick={() => setActiveTab('myCloset')}
        >
          My Closet
        </button>
        <button
          className={`tabButton ${activeTab === 'savedOutfits' ? 'activeTab' : ''}`}
          onClick={() => setActiveTab('savedOutfits')}
        >
          Saved Outfits
        </button>
      </div>

      <div className="tabContent">
        {activeTab === 'savedOutfits' && (
          <div>
            <h2>Saved Outfits</h2>

          </div>
        )}
        {activeTab === 'myCloset' && (
          <div>
            <h2>My Closet</h2>
            <img src="shirt.png"/>
            <img src="shirt.png"/>
            <img src="shirt.png"/>
            <img src="shirt.png"/>
            <img src="shirt.png"/>            
            <img src="shirt.png"/>
          </div>
        )}
      </div>
    </div>
        </>

    );
  }