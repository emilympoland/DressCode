'use client';

import "./page.css";
import { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function Profile() {
  //hard coded
  const items = [
    { src: "shirt.png", type: "Shirts" },
    { src: "Clothes/pants2.jpg", type: "Pants" },
    { src: "Clothes/shoe1.jpg", type: "Shoes" },
    { src: "Clothes/top1.jpg", type: "Tops" },
    { src: "Clothes/top2.jpg", type: "Tops" },
    { src: "shirt.png", type: "Shirts" },
    { src: "Clothes/pants1.jpg", type: "Pants" }
  ];
  const categories = ["Shirts", "Pants", "Shoes", "Tops"];

  //clothing lists
  const [allClosetItems, setAllClosetItems] = useState([]);
  const [currClosetItems, setCurrClosetItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]); 
  const [savedOutfits, setSavedOutfits] = useState([]); 

  //keep track of state
  const [activeTab, setActiveTab] = useState('myCloset');
  const [filterCategory, setFilterCategory] = useState(null);
  const [selectMode, setSelectMode] = useState(false); 

  //helperss
  const handleSelect = (item) => {
    if (selectMode) {
      if (selectedItems.includes(item)) {
        setSelectedItems(selectedItems => selectedItems.filter(i => i !== item)); 
      } else {
        setSelectedItems(selectedItems => [...selectedItems, item]); 
      }
    }
  }
  const handleFilter = (item) => {
    if (filterCategory) {
      setCurrClosetItems(allClosetItems.filter(item => item.type === filterCategory));
    } else {
      setCurrClosetItems(allClosetItems);
    }
  }

  const addSavedOutfit = () => {
    if (selectMode) {
      if (selectedItems.length > 0) {
        setSavedOutfits(prev => [...prev, selectedItems]); 
        setSelectedItems([]);
      }
    }
    setSelectMode(!selectMode); 
  }


  useEffect(() => {
    setCurrClosetItems(items);
    setAllClosetItems(items);
  }, []);

  return (
    <>
      <div id="header-profile">
        <img src="anonymous_profile.png" id="profile_picture" />
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
            <div id="savedOutfits">
              {savedOutfits.map((outfit) => (
                <div id="saved-outfits-container">
                  <div id="saved-outfit-item">
                    {outfit.map((item) => (
                      <img src={item.src} id="saved-item"/>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'myCloset' && (
            <div id="myClosetitems">
              {currClosetItems.map((item, index) => (
                <div onClick={() => handleSelect(item)} style={{opacity: selectedItems.includes(item) ? '30%' : '100%' }}>
                  {selectMode ? (<img src={item.src} className="item-object"/>) : (
                    <Popup trigger={<img src={item.src} className="item-object"/>} modal contentStyle={{ backgroundColor: "#F9F4E7", width: '350px', height: '450px', borderRadius: '30px' }}>
                      {close => (
                        <div className="modal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <img src={item.src} className="item-popup"/>
                          <div className="actions">
                            <button className="popup-button" onClick={close}>
                              Back
                            </button>
                            <button className="popup-button" onClick={() => {
                              setCurrClosetItems(CurrClosetItems => CurrClosetItems.filter((i) => i !== index));
                              close();
                            }}>
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Popup>
                  )}
                </div>
              ))}

            </div>
          )}
          <div id="buttons-area">
          <Popup trigger={<div className="action-buttons">Filter</div>} modal contentStyle={{ backgroundColor: "#F9F4E7", width: '350px', height: '450px', borderRadius: '30px', padding: "30px" }} >
              {close => (
                <div className="modal">
                  <div className="header" >Select a Category</div>
                  <div className="content">
                    <p style={{color: "black"}}>Clothing Type</p>
                    {categories.map((category) => (
                      <div onClick={() => {setFilterCategory(category);}}
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                          backgroundColor: filterCategory === category ? '#EF6A3F' :'#DDDDDD',
                          color: filterCategory === category ? '#F9F4E7' :'black',
                          marginTop: '20px',
                          margin: '5px',
                          display: 'inline-block',
                          flexDirection: 'column',
                          borderRadius: '30px',
                          alignContent: 'center',
                          width: 'auto',
                          paddingLeft: '30px',
                          paddingRight: '30px'

                        }}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                  <div className="actions">
                    <button className="action-buttons" onClick={() => {
                      handleFilter(item);
                      close();
                    }}>Apply Filter</button>
                    <button className="action-buttons" onClick={() => {
                      setFilterCategory(null);
                      setCurrClosetItems(allClosetItems);
                      close();
                    }}>Clear Filter</button>
                  </div>
                </div>
              )}
            </Popup>
            <div
                className="action-buttons"
                onClick={() => {addSavedOutfit()}}
              >
                {selectMode ? 'Save Outfit' : 'Select'}
              </div>
          </div>
          
          
        </div>
      </div>
    </>
  );
}
