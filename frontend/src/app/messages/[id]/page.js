"use client";

import { useParams } from "next/navigation";
import "../../../app/globals.css";
//import { useParams } from 'next/navigation';
import { useState, useEffect } from "react";
import Conversation from "@/components/Conversation";

export default function ConversationPage() {
  const { id } = useParams();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // hardcoded data for now
    const names = {
      1: "Nicole",
      2: "Emily",
      3: "Will",
      4: "Justin",
      5: "Jeffrey",
      6: "Bob",
      7: "Ryan",
      8: "Jasmine",
    };
    setUserName(names[id] || "User");
  }, [id]);

  return (
    <div className="conversation-page">
      <header className="conversation-header">
        <img src="../anonymous_profile.png" id="conversation-header-avatar" />
        <h1>{userName}</h1>
      </header>

      <Conversation conversationId={id} userName={userName} />
    </div>
  );
}
