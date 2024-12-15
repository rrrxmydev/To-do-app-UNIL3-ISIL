

/*
import React, { useState, useRef } from "react";
import "./DashboardCSS.css";

export default function DTopBar({ sections }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchBarRef = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const results = [];
  
    if (query.trim() !== "") {
      sections.forEach((section) => {
        if (section.title.toLowerCase().includes(query.toLowerCase())) {
          results.push({ type: "Title", content: section.title, sectionId: section.id });
        }
  
        if (section.desc.toLowerCase().includes(query.toLowerCase())) {
          results.push({ type: "Description", content: section.desc, sectionId: section.id });
        }
  
        // Ensure tasks exist before iterating
        if (section.tasks && Array.isArray(section.tasks)) {
          section.tasks.forEach((task) => {
            if (task.title.toLowerCase().includes(query.toLowerCase())) {
              results.push({ type: "Task", content: task.title, sectionId: section.id });
            }
          });
        }
      });
    }
  
    setSearchResults(results);
  };
  

  const handleResultClick = (sectionId, content) => {
    const element = document.querySelector(`[data-section-id="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      const highlightEl = element.querySelector(`[data-content="${content}"]`);
      if (highlightEl) {
        highlightEl.style.backgroundColor = "yellow";

        // Remove highlight after a timeout
        setTimeout(() => {
          highlightEl.style.backgroundColor = "transparent";
        }, 3000);
      }
    }
    setSearchResults([]); // Close the search results dropdown
  };

  return (
    <div
      style={{
        width: "100%",
        height: "70px",
        backgroundColor: "#16375D",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
    
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div>
          <p
            style={{
              fontFamily: "Righteous",
              color: "white",
              lineHeight: "25px",
              margin: 0,
              fontSize: "30px",
              marginRight: "25px",
            }}
          >
            TO<br />
            DO
          </p>
        </div>
        <div
          style={{
            position: "relative", // Needed for the dropdown
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "11px",
            padding: "5px 10px",
            width: "300px",
            height: "40px",
            gap: "10px",
          }}
          className="SearchBar"
        >
          <i className="material-icons" style={{ fontSize: "23px", fontWeight: "500", color: "#1A4372" }}>
            search
          </i>
          <input
            type="text"
            ref={searchBarRef}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            style={{ border: "none", outline: "none", width: "100%", fontSize: "14px" }}
          />
          
          {searchResults.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                left: "0",
                width: "100%",
                maxHeight: "200px",
                overflowY: "auto",
                backgroundColor: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                borderRadius: "8px",
                padding: "5px",
              }}
            >
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleResultClick(result.sectionId, result.content)}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #e0e0e0",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  <strong>{result.type}:</strong> {result.content}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          className="pfp"
          style={{ width: "50px", height: "50px", borderRadius: "100%" }}
          src={require("./pfp.jpg")}
          alt="Profile"
        />
      </div>
    </div>
  );
} 
  */











//version before adding a profile tab
/*
import React, { useState, useRef } from "react";
import "./DashboardCSS.css";

export default function DTopBar({ sections }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchBarRef = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const results = [];

    if (query.trim() !== "") {
      sections.forEach((section) => {
        const sectionResults = { sectionTitle: section.title, matches: [] };

        const regex = new RegExp(`(${query})`, "i"); // Case-insensitive match

        // Check for matches in the description
        if (regex.test(section.desc)) {
          sectionResults.matches.push({
            type: "Description",
            content: section.desc.replace(regex, `<span style='color:#1A4372'>$1</span>`),
          });
        }

        // Check for matches in tasks
        if (section.tasks && Array.isArray(section.tasks)) {
          section.tasks.forEach((task) => {
            if (regex.test(task.title)) {
              sectionResults.matches.push({
                type: "Task",
                content: task.title.replace(regex, `<span style='color:#1A4372'>$1</span>`),
              });
            }
          });
        }

        if (sectionResults.matches.length > 0) {
          results.push(sectionResults);
        }
      });
    }

    setSearchResults(results);
  };

  const handleResultClick = (sectionId, content) => {
    const element = document.querySelector(`[data-section-id="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      const highlightEl = element.querySelector(`[data-content="${content}"]`);
      if (highlightEl) {
        highlightEl.style.backgroundColor = "yellow";

        // Remove highlight after a timeout
        setTimeout(() => {
          highlightEl.style.backgroundColor = "transparent";
        }, 3000);
      }
    }
    setSearchResults([]); // Close the search results dropdown
  };

  return (
    <div
      style={{
        width: "100%",
        height: "70px",
        backgroundColor: "#16375D",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
    
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div>
          <p
            style={{
              fontFamily: "Righteous",
              color: "white",
              lineHeight: "25px",
              margin: 0,
              fontSize: "30px",
              marginRight: "25px",userSelect:"none"
            }}
          >
            TO<br />
            DO
          </p>
        </div>
        <div
          style={{
            position: "relative", // Needed for the dropdown
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "11px",
            padding: "5px 10px",
            width: "300px",
            height: "40px",
            gap: "10px",
          }}
          className="SearchBar"
        >
          <i
            className="material-icons"
            style={{ fontSize: "23px", fontWeight: "500", color: "#1A4372" }}
          >
            search
          </i>
          <input
            type="text"
            ref={searchBarRef}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            style={{ border: "none", outline: "none", width: "100%", fontSize: "14px",color:"black"}}
          />
          
          {searchResults.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                left: "0",
                width: "100%",
                maxHeight: "200px",
                overflowY: "auto",
                backgroundColor: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                borderRadius: "8px",
                padding: "5px",
              }}
            >
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  style={{ padding: "10px", borderBottom: "1px solid #e0e0e0" }}
                >
                  <strong style={{ fontSize: "16px", color: "#1A4372" }}>
                    {result.sectionTitle}
                  </strong>
                  {result.matches.map((match, idx) => (
                    <div
                      key={idx}
                      dangerouslySetInnerHTML={{
                        __html: `<div style='font-size: 14px; margin-top: 5px'>${match.content}</div>`,
                      }}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleResultClick(result.sectionId, match.content)}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          className="pfp"
          style={{ width: "50px", height: "50px", borderRadius: "100%" }}
          src={require("./pfp.jpg")}
          alt="Profile"
        />
      </div>
    </div>
  );
}
*/









// bullshit nothing changed

/*
import React, { useState, useRef } from "react";
import "./DashboardCSS.css";

export default function DTopBar({ sections }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const searchBarRef = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const results = [];

    if (query.trim() !== "") {
      sections.forEach((section) => {
        const sectionResults = { sectionTitle: section.title, matches: [] };

        const regex = new RegExp(query, "i"); // Case-insensitive match

        // Check for matches in the description
        if (regex.test(section.desc)) {
          sectionResults.matches.push({
            type: "Description",
            content: section.desc.replace(regex, `<span style='color:#1A4372'>${query}</span>`),
          });
        }

        if (sectionResults.matches.length > 0) {
          results.push(sectionResults);
        }
      });
    }

    setSearchResults(results);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "70px",
        backgroundColor: "#16375D",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
    
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div>
          <p
            style={{
              fontFamily: "Righteous",
              color: "white",
              lineHeight: "25px",
              margin: 0,
              fontSize: "30px",
              marginRight: "25px",
              userSelect: "none",
            }}
          >
            TO<br />
            DO
          </p>
        </div>
        <div
          style={{
            position: "relative", // Needed for the dropdown
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "11px",
            padding: "5px 10px",
            width: "300px",
            height: "40px",
            gap: "10px",
          }}
          className="SearchBar"
        >
          <i
            className="material-icons"
            style={{ fontSize: "23px", fontWeight: "500", color: "#1A4372" }}
          >
            search
          </i>
          <input
            type="text"
            ref={searchBarRef}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            style={{ border: "none", outline: "none", width: "100%", fontSize: "14px", color: "black" }}
          />
        </div>
      </div>

      
      <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
        <img
          className="pfp"
          style={{ width: "50px", height: "50px", borderRadius: "100%", cursor: "pointer" }}
          src={require("./pfp.jpg")}
          alt="Profile"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        />
        {showProfileMenu && (
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "10px",
              width: "200px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "15px",
              textAlign: "center",
            }}
          >
            <img
              src={require("./pfp.jpg")}
              alt="Profile"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "100%",
                marginBottom: "10px",
              }}
            />
            <p
              style={{
                fontSize: "18px",
                color: "#1A4372",
                margin: "0 0 15px",
              }}
            >
              User Name
            </p>
            <button
              style={{
                display: "block",
                width: "100%",
                padding: "10px 0",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "16px",
                color: "#1A4372",
                cursor: "pointer",
                marginBottom: "10px",
              }}
              onClick={() => alert("Logged Out")}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

*/


// MAYBE THE FINAL VERSION OF THE PFP MENU

/*

import React, { useState, useRef } from "react";
import "./DashboardCSS.css";

export default function DTopBar({ sections }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const searchBarRef = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const results = [];

    if (query.trim() !== "") {
      sections.forEach((section) => {
        const sectionResults = { sectionTitle: section.title, matches: [] };
        const regex = new RegExp(`(${query})`, "i"); // Case-insensitive match

        // Check for matches in the description
        if (regex.test(section.desc)) {
          sectionResults.matches.push({
            type: "Description",
            content: section.desc.replace(
              regex,
              `<span style='color:#1A4372'>$1</span>`
            ),
          });
        }

        // Check for matches in tasks
        if (section.tasks && Array.isArray(section.tasks)) {
          section.tasks.forEach((task) => {
            if (regex.test(task.title)) {
              sectionResults.matches.push({
                type: "Task",
                content: task.title.replace(
                  regex,
                  `<span style='color:#1A4372'>$1</span>`
                ),
              });
            }
          });
        }

        if (sectionResults.matches.length > 0) {
          results.push(sectionResults);
        }
      });
    }

    setSearchResults(results);
  };

  const handleResultClick = (sectionId, content) => {
    const element = document.querySelector(`[data-section-id="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      const highlightEl = element.querySelector(`[data-content="${content}"]`);
      if (highlightEl) {
        highlightEl.style.backgroundColor = "yellow";

        // Remove highlight after a timeout
        setTimeout(() => {
          highlightEl.style.backgroundColor = "transparent";
        }, 3000);
      }
    }
    setSearchResults([]); // Close the search results dropdown
  };

  return (
    <div
      style={{
        width: "100%",
        height: "70px",
        backgroundColor: "#16375D",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
    
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div>
          <p
            style={{
              fontFamily: "Righteous",
              color: "white",
              lineHeight: "25px",
              margin: 0,
              fontSize: "30px",
              marginRight: "25px",
              userSelect: "none",
            }}
          >
            TO<br />
            DO
          </p>
        </div>
        <div
          style={{
            position: "relative", // Needed for the dropdown
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "11px",
            padding: "5px 10px",
            width: "300px",
            height: "40px",
            gap: "10px",
          }}
          className="SearchBar"
        >
          <i
            className="material-icons"
            style={{ fontSize: "23px", fontWeight: "500", color: "#1A4372" }}
          >
            search
          </i>
          <input
            type="text"
            ref={searchBarRef}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "14px",
              color: "black",
            }}
          />

          {searchResults.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "45px",
                left: "0",
                width: "100%",
                maxHeight: "200px",
                overflowY: "auto",
                backgroundColor: "white",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                borderRadius: "8px",
                padding: "5px",
              }}
            >
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  style={{ padding: "10px", borderBottom: "1px solid #e0e0e0" }}
                >
                  <strong style={{ fontSize: "16px", color: "#1A4372" }}>
                    {result.sectionTitle}
                  </strong>
                  {result.matches.map((match, idx) => (
                    <div
                      key={idx}
                      dangerouslySetInnerHTML={{
                        __html: `<div style='font-size: 14px; margin-top: 5px'>${match.content}</div>`,
                      }}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleResultClick(result.sectionId, match.content)
                      }
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      
      <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
        <button
          style={{
            all: "unset", // Reset default button styles
            cursor: "pointer",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <img
            className="pfp"
            style={{ width: "50px", height: "50px", borderRadius: "100%" }}
            src={require("./pfp.jpg")}
            alt="Profile"
          />
        </button>
        {showProfileMenu && (
          <div
            style={{
              position: "absolute",
              top: "60px",
              right: "10px",
              width: "200px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              padding: "15px",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <img
              src={require("./pfp.jpg")}
              alt="Profile"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "100%",
                marginBottom: "10px",
              }}
            />
            <p
              style={{
                fontSize: "18px",
                color: "#1A4372",
                margin: "0 0 15px",
              }}
            >
              User Name
            </p>
            <button
              style={{
                display: "block",
                width: "100%",
                padding: "10px 0",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "16px",
                color: "#1A4372",
                cursor: "pointer",
                marginBottom: "10px",
              }}
              onClick={() => alert("Logged Out")}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}


*/





//well made na9es stats

// import React, { useState, useRef, useEffect } from "react";
// import "./DashboardCSS.css";


// let testfullname = 'Ramy Mohammed';

// function getInitials(fullName) {
//   // Split the full name into words
//   const nameParts = fullName.trim().split(" ");

//   // Extract the first character of the first two words
//   const initials = nameParts
//     .slice(0, 2) // Take the first two parts (if available)
//     .map(word => word[0]?.toUpperCase()) // Get the first letter of each word and capitalize it
//     .join(""); // Combine the initials into a string

//   return initials;
// }

import React, { useState, useRef, useEffect } from "react";
import "./DashboardCSS.css";

let testfullname = 'Ramy Mohammed';

function getInitials(fullName) {
  // Split the full name into words
  const nameParts = fullName.trim().split(" ");

  // Extract the first character of the first two words
  const initials = nameParts
    .slice(0, 2) // Take the first two parts (if available)
    .map(word => word[0]?.toUpperCase()) // Get the first letter of each word and capitalize it
    .join(""); // Combine the initials into a string

  return initials;
}

export default function DTopBar({ sections }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const searchBarRef = useRef(null);
  const profileMenuRef = useRef(null); // Reference for the profile menu

  const handleSearch = (query) => {
    setSearchQuery(query);
    const results = [];

    if (query.trim() !== "") {
      sections.forEach((section) => {
        const sectionResults = { sectionTitle: section.title, matches: [] };
        const regex = new RegExp(`(${query})`, "i");

        if (regex.test(section.desc)) {
          sectionResults.matches.push({
            type: "Description",
            content: section.desc.replace(
              regex,
              `<span style='color:#1A4372'>$1</span>`
            ),
          });
        }

        if (section.tasks && Array.isArray(section.tasks)) {
          section.tasks.forEach((task) => {
            if (regex.test(task.title)) {
              sectionResults.matches.push({
                type: "Task",
                content: task.title.replace(
                  regex,
                  `<span style='color:#1A4372'>$1</span>`
                ),
              });
            }
          });
        }

        if (sectionResults.matches.length > 0) {
          results.push(sectionResults);
        }
      });
    }

    setSearchResults(results);
  };

  const handleResultClick = (sectionId, content) => {
    const element = document.querySelector(`[data-section-id="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      const highlightEl = element.querySelector(`[data-content="${content}"]`);
      if (highlightEl) {
        highlightEl.style.backgroundColor = "yellow";

        setTimeout(() => {
          highlightEl.style.backgroundColor = "transparent";
        }, 3000);
      }
    }
    setSearchResults([]);
  };

  // Close profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "70px",
        backgroundColor: "#16375D",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div>
          <p
            style={{
              fontFamily: "Righteous",
              color: "white",
              lineHeight: "25px",
              margin: 0,
              fontSize: "30px",
              marginRight: "25px",
              userSelect: "none",
            }}
          >
            TO<br />
            DO
          </p>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: "11px",
            padding: "5px 10px",
            width: "300px",
            height: "40px",
            gap: "10px",
          }}
          className="SearchBar"
        >
          <i
            className="material-icons"
            style={{ fontSize: "23px", fontWeight: "500", color: "#1A4372" }}
          >
            search
          </i>
          <input
            type="text"
            ref={searchBarRef}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search..."
            style={{
              border: "none",
              outline: "none",
              width: "100%",
              fontSize: "14px",
              color: "black",
            }}
          />
        </div>
      </div>

      <div
        style={{ display: "flex", alignItems: "center", position: "relative" }}
      >
        <button
          style={{
            all: "unset",
            cursor: "pointer",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <div
            style={{
              width: "50px",
              height: "50px",
              backgroundColor: "#A3C7E7", // Lighter blue background
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              borderRadius: "100%",
              color: "#16375D", // Darker font color
            }}
          >
            <p
              style={{
                margin: 0,
                userSelect: "none",
              }}
            >
              {getInitials(testfullname)} {/* Display initials */}
            </p>
          </div>
        </button>
        {showProfileMenu && (
          <div
            ref={profileMenuRef}
            style={{
              position: "absolute",
              top: "65px",
              right: "10px",
              width: "200px",
              backgroundColor: "white",
              borderRadius: "10px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
              zIndex: 10,
              textAlign: "center",
              padding: "15px 0",
            }}
          >
            {/* Triangle pointer for the menu */}
            <div
              style={{
                position: "absolute",
                top: "-10px",
                right: "5px", // Adjusted to align with the profile picture
                width: "0",
                height: "0",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "10px solid white",
              }}
            ></div>

            {/* Profile icon container */}
            <div
              style={{
                width: "70px",
                height: "70px",
                backgroundColor: "#1A4372",
                margin: "0 auto", // Ensures the container is horizontally centered
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "35px",
                borderRadius: "100%",
              }}
            >
              <p
                style={{
                  color: "white",
                  margin: 0, // Removes default margins
                  paddingBottom: "5px",
                  userSelect: "none",
                }}
              >
                {getInitials(testfullname)} {/* Same initials logic */}
              </p>
            </div>

            {/* User name */}
            <p
              style={{
                fontSize: "18px",
                color: "#1A4372",
                margin: "15px 0",
                marginBottom: "35px",
              }}
            >
              {testfullname}
            </p>

            {/* Log out button */}
            <button
              style={{
                display: "block",
                width: "100%",
                padding: "10px 0",
                backgroundColor: "transparent",
                border: "none",
                fontSize: "16px",
                color: "#1A4372",
                cursor: "pointer",
                fontWeight: "500",
              }}
              onClick={() => alert("Logged Out")}
            >
              <p style={{ fontSize: "17px" }} className="material-icons">
                logout
              </p>{" "}
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
