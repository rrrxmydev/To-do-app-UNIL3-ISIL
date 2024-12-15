export default function InviteReq() {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Black transparent background
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000, // Ensure it appears above everything
        }}
      >
        <div
          style={{
            backgroundColor: "white", // Notification box background
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            minWidth: "300px",
          }}
        >
          <h2 style={{ margin: "0 0 10px", color: "#333" }}>Invite Request</h2>
          <p style={{ margin: "10px 0", color: "#555" }}>
            <strong>John Doe</strong> has sent you an invite. What would you like to do?
          </p>
          <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px" }}>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Accept
            </button>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    );
  }
  