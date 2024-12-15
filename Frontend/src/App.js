import React, { useState } from "react";
import InviteReq from "./InviteReq";

export default function App() {
  const [showInvite, setShowInvite] = useState(true);

  const handleAccept = () => {
    alert("Invite Accepted!");
    setShowInvite(false);
  };

  const handleDecline = () => {
    alert("Invite Declined!");
    setShowInvite(false);
  };

  return (
    <div>
      {showInvite && (
        <InviteReq
          senderName="John Doe"
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      )}
      <h1>Welcome to the App</h1>
    </div>
  );
}
