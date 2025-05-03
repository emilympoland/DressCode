"use client";

import "./page.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export default function Profile() {
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();

  // State for closet items
  const [allClosetItems, setAllClosetItems] = useState([]);
  const [currClosetItems, setCurrClosetItems] = useState([]);

  // Other state variables...
  const [selectedItems, setSelectedItems] = useState([]);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [activeTab, setActiveTab] = useState("myCloset");
  const [filterCategory, setFilterCategory] = useState(null);
  const [selectMode, setSelectMode] = useState(false);
  const categories = ["Shirts", "Pants", "Shoes", "Tops"];

  useEffect(() => {
    fetch(`${server_url}/api/closet`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // sends cookies with the request
    })
      .then((response) => {
        if (response.status === 401) {
          console.log("Not logged in");
          router.push("/login");
          return Promise.resolve(null);
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("Closet fetch successful!", data);
          setAllClosetItems(data);
          setCurrClosetItems(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching closet data:", error);
      });
  }, [server_url, router]);

  //helperss
  const handleSelect = (item) => {
    if (selectMode) {
      if (selectedItems.includes(item)) {
        setSelectedItems((selectedItems) =>
          selectedItems.filter((i) => i !== item)
        );
      } else {
        setSelectedItems((selectedItems) => [...selectedItems, item]);
      }
    }
  };
  const handleFilter = () => {
    if (filterCategory) {
      setCurrClosetItems(
        allClosetItems.filter((item) => item.clothing_type === filterCategory)
      );
    } else {
      setCurrClosetItems(allClosetItems);
    }
  };

  const addSavedOutfit = () => {
    if (selectMode) {
      if (selectedItems.length > 0) {
        setSavedOutfits((prev) => [...prev, selectedItems]);
        setSelectedItems([]);
      }
    }
    setSelectMode(!selectMode);
  };

  return (
    <>
      <div id="header-profile">
        <img src="anonymous_profile.png" id="profile_picture" alt="Profile" />
        <div id="header-info">
          <h2>John Doe</h2>
          <h4>@johndoe</h4>
        </div>
      </div>

      <div className="pageContainer">
        <div className="tabs">
          <button
            className={`tabButton ${
              activeTab === "myCloset" ? "activeTab" : ""
            }`}
            onClick={() => setActiveTab("myCloset")}
          >
            My Closet
          </button>
          <button
            className={`tabButton ${
              activeTab === "savedOutfits" ? "activeTab" : ""
            }`}
            onClick={() => setActiveTab("savedOutfits")}
          >
            Saved Outfits
          </button>
        </div>

        <div className="tabContent">
          {/* //saved outfits tab */}
          {activeTab === "savedOutfits" && (
            <div id="savedOutfits">
              {savedOutfits.map((outfit) => (
                <div id="saved-outfits-container">
                  <div id="saved-outfit-item">
                    {outfit.map((item) => (
                      <img src={item.image_url} id="saved-item" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* my closet tab */}
          {activeTab === "myCloset" && (
            <div id="myClosetitems">
              {currClosetItems.map((item, index) => (
                <div
                  onClick={() => handleSelect(item)}
                  style={{
                    opacity: selectedItems.includes(item) ? "30%" : "100%",
                  }}
                >
                  {selectMode ? (
                    <img src={item.image_url} className="item-object" />
                  ) : (
                    <Popup
                      trigger={
                        <img src={item.image_url} className="item-object" />
                      }
                      modal
                      contentStyle={{
                        backgroundColor: "#F9F4E7",
                        width: "350px",
                        height: "450px",
                        borderRadius: "30px",
                      }}
                    >
                      {(close) => (
                        <div
                          className="modal"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <img src={item.image_url} className="item-popup" />
                          <div className="actions">
                            <button className="popup-button" onClick={close}>
                              Back
                            </button>
                            <button
                              className="popup-button"
                              onClick={() => {
                                setCurrClosetItems((CurrClosetItems) =>
                                  CurrClosetItems.filter((i) => i !== index)
                                );
                                close();
                              }}
                            >
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
            <Popup
              trigger={<div className="action-buttons">Filter</div>}
              modal
              contentStyle={{
                backgroundColor: "#F9F4E7",
                width: "350px",
                height: "450px",
                borderRadius: "30px",
                padding: "30px",
              }}
            >
              {(close) => (
                <div className="modal">
                  <div className="header">Select a Category</div>
                  <div className="content">
                    <p style={{ color: "black" }}>Clothing Type</p>
                    {categories.map((category) => (
                      <div
                        onClick={() => {
                          setFilterCategory(category);
                        }}
                        style={{
                          padding: "10px",
                          cursor: "pointer",
                          backgroundColor:
                            filterCategory === category ? "#EF6A3F" : "#DDDDDD",
                          color:
                            filterCategory === category ? "#F9F4E7" : "black",
                          marginTop: "20px",
                          margin: "5px",
                          display: "inline-block",
                          flexDirection: "column",
                          borderRadius: "30px",
                          alignContent: "center",
                          width: "auto",
                          paddingLeft: "30px",
                          paddingRight: "30px",
                        }}
                      >
                        {category}
                      </div>
                    ))}
                  </div>
                  <div className="actions">
                    <button
                      className="action-buttons"
                      onClick={() => {
                        handleFilter();
                        close();
                      }}
                    >
                      Apply Filter
                    </button>
                    <button
                      className="action-buttons"
                      onClick={() => {
                        setFilterCategory(null);
                        setCurrClosetItems(allClosetItems);
                        close();
                      }}
                    >
                      Clear Filter
                    </button>
                  </div>
                </div>
              )}
            </Popup>
            <div
              className="action-buttons"
              onClick={() => {
                addSavedOutfit();
              }}
            >
              {selectMode ? "Save Outfit" : "Select"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
