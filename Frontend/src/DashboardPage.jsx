/*

import React from "react";
import DSection from "./DSection";
import DTopBar from "./DTopBar";
import isExpanded from "./DSection"

export default function DashboardPage() {
    const [sections, setSections] = React.useState([
      { id: 1, title: "A great start", desc: "Hey Hey Hey Hey Hey" },
      { id: 2, title: "Some struggle", desc: "Wsup pwoqeipqwpoeiqwopiepqw" },
      { id: 3, title: "Pure hatred", desc: "sdfljskdfjsdjflksdjlkfsdlkfjsdlkfjsdlkfj" },
      { id: 4, title: "Idk why", desc: "sdklfjklsdjfklsdjfsdkflsdjfklsdjflksdjlkfjlsdkjflskdj" },
      { id: 5, title: "did I even try", desc: "vl;xckvl;xckv;lxckvl;xcklvcx" },
      { id: 4, title: "Idk why", desc: "sdklfjklsdjfklsdjfsdkflsdjfklsdjflksdjlkfjlsdkjflskdj" },
      { id: 5, title: "did I even try", desc: "vl;xckvl;xckv;lxckvl;xcklvcx" },
      { id: 6, title: "Seems like a good title", desc: "qwpoeiopqweioqpwieopqw" },
      { id: 7, title: "did I even try", desc: "vl;xckvl;xckv;lxckvl;xcklvcx" },
      { id: 8, title: "Last one", desc: "qwpoeiopqweioqpwieopqw" },
    ]);
  
    const handleDeleteSection = (id) => {
      setSections(sections.filter((section) => section.id !== id));
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "50vh",
          backgroundColor: "#f5f5f5",marign:"0",padding:"0"
        }}
      >
        <DTopBar sections={sections} />
        <div
          style={{
            // display:"inline-grid",
            // flexWrap: "wrap", // Allow sections to wrap to the next row
            // gap: "20px",
            // padding: "20px",
            // backgroundColor: "#1A4372",
            // flexGrow: 1,
            // overflowY: "auto", // Allow vertical scrolling
            // justifyContent: "center", // Center sections


            // display: "grid",
            // gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Flexible column layout
            // gap: "20px", // Spacing between grid items
            // padding: "20px",
            // backgroundColor: "#1A4372",
            // flexGrow: 1,
            // overflowY: "auto", // Allow vertical scrolling if needed

            // display: "grid",
            display:"table",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", // Flexible column layout
            gap: "10px", // Compact spacing between sections
            padding: "10px",
            backgroundColor: "#1A4372",
            flexGrow: 1,
            overflowY: "auto", // Enable scrolling if needed

            
          }}
        >
          {sections.map((section) => (
            <div
              style={{
                flex: "1 1 300px", // Allow sections to shrink, grow, and have a basis of 300px
                maxWidth: "400px", // Limit maximum width of a section
                boxSizing: "border-box",
              }}
              key={section.id}
            >
              <DSection
                title={section.title}
                description={section.desc}
                deleteSection={() => handleDeleteSection(section.id)}
              />
            </div>
            




          ))}
          
        </div>
      </div>
    );
}
*/







// li lfou9 hiya lbest one mchi hedi
/*
import React from "react";
import DSection from "./DSection";
import DTopBar from "./DTopBar";

export default function DashboardPage() {
  const [sections, setSections] = React.useState([
    { id: 1, title: "A great start", desc: "Hey Hey Hey Hey Hey" },
    { id: 2, title: "Some struggle", desc: "Wsup pwoqeipqwpoeiqwopiepqw" },
    { id: 3, title: "Pure hatred", desc: "sdfljskdfjsdjflksdjlkfsdlkfjsdlkfjsdlkfj" },
    { id: 4, title: "Idk why", desc: "sdklfjklsdjfklsdjfsdkflsdjfklsdjflksdjlkfjlsdkjflskdj" },
    { id: 5, title: "did I even try", desc: "vl;xckvl;xckv;lxckvl;xcklvcx" },
    { id: 6, title: "Seems like a good title", desc: "qwpoeiopqweioqpwieopqw" },
    { id: 7, title: "did I even try", desc: "vl;xckvl;xckv;lxckvl;xcklvcx" },
    { id: 8, title: "Last one", desc: "qwpoeiopqweioqpwieopqw" },
  ]);

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        margin: 0,
        padding: 0,
      }}
    >
      <DTopBar sections={sections} />

      <div
        style={{
          display: "flex", // Split the layout horizontally
          flexGrow: 1,
        }}
      >
        
        <div
          style={{
            flex: 2, // Takes two-thirds of the screen
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "10px",
            padding: "10px",
            backgroundColor: "#1A4372",
            overflowY: "auto", // Enable scrolling for sections
          }}
        >
          {sections.map((section) => (
            <div
              style={{
                flex: "1 1 300px", // Allow sections to shrink, grow, and have a basis of 300px
                maxWidth: "400px", // Limit maximum width of a section
                boxSizing: "border-box",
              }}
              key={section.id}
            >
              <DSection
                title={section.title}
                description={section.desc}
                deleteSection={() => handleDeleteSection(section.id)}
              />
            </div>
          ))}
        </div>


        <div
          style={{
            flex: 1, // Takes one-third of the screen
            backgroundColor: "#FFFFFF",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            position: "sticky",
            top: 0,
            height: "100vh", // Full screen height
          }}
        >
          <h2 style={{ margin: "0 0 20px", color: "#1A4372" }}>Statistics</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>
              <strong>Total Sections:</strong> {sections.length}
            </li>
            <li style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>
              <strong>Completed Tasks:</strong> 5 
              
            </li>
            <li style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>
              <strong>Pending Tasks:</strong> 10 
              
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
*/



//third idk first time cutting it into 2
/*
import React from "react";
import DSection from "./DSection";
import DTopBar from "./DTopBar";

export default function DashboardPage() {
  const [sections, setSections] = React.useState([
    { id: 1, title: "A great start", desc: "Hey Hey Hey Hey Hey", progress: 100 },
    { id: 2, title: "Some struggle", desc: "Wsup pwoqeipqwpoeiqwopiepqw", progress: 60 },
    { id: 3, title: "Pure hatred", desc: "sdfljskdfjsdjflksdjlkfsdlkfjsdlkfjsdlkfj", progress: 30 },
    { id: 4, title: "Idk why", desc: "sdklfjklsdjfklsdjfsdkflsdjfklsdjflksdjlkfjlsdkjflskdj", progress: 50 },
    { id: 5, title: "did I even try", desc: "vl;xckvl;xckv;lxckvl;xcklvcx", progress: 10 },
    { id: 6, title: "Seems like a good title", desc: "qwpoeiopqweioqpwieopqw", progress: 80 },
    { id: 7, title: "did I even try", desc: "vl;xckvl;xckv;lxckvl;xcklvcx", progress: 90 },
    { id: 8, title: "Last one", desc: "qwpoeiopqweioqpwieopqw", progress: 20 },
  ]);

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        margin: 0,
        padding: 0,
        backgroundColor: "#f5f5f5",
      }}>
      
      <DTopBar sections={sections} />
      
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1A4372",
          padding: "10px",
          overflowY: "auto", // Scrollable sections
        }}
      >
        

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "10px",
            width: "80%",
            margin: "0 auto", // Center sections horizontally
          }}
        >
          {sections.map((section) => (
            <div
              style={{
                flex: "1 1 300px",
                maxWidth: "400px",
                boxSizing: "border-box",
              }}
              key={section.id}
            >
              <DSection
                title={section.title}
                description={section.desc}
                deleteSection={() => handleDeleteSection(section.id)}
              />
            </div>
          ))}
        </div>
      </div>


      <div
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          padding: "20px",
          boxShadow: "-2px 0px 10px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: 0,
          height: "1400px", // Full screen height
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#1A4372" }}>Statistics</h2>

        <ul style={{ listStyle: "none", padding: 0, fontSize: "16px", color: "#333" }}>
          <li style={{ marginBottom: "10px" }}>
            <strong>Total Sections:</strong> {sections.length}
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Average Progress:</strong> {" "}
            {(
              sections.reduce((total, section) => total + section.progress, 0) /
              sections.length
            ).toFixed(2)}%
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Completed Sections:</strong> {" "}
            {sections.filter((section) => section.progress === 100).length}
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>In Progress:</strong> {" "}
            {sections.filter((section) => section.progress > 0 && section.progress < 100).length}
          </li>
          <li style={{ marginBottom: "10px" }}>
            <strong>Not Started:</strong> {" "}
            {sections.filter((section) => section.progress === 0).length}
          </li>
        </ul>
      </div>
    </div>
  );
}
*/









/*
import React from "react";
import DSection from "./DSection";
import DTopBar from "./DTopBar";

export default function DashboardPage() {
  const [sections, setSections] = React.useState([
    { id: 1, title: "A great start", desc: "Hey Hey Hey Hey Hey" },
    { id: 2, title: "Some struggle", desc: "Wsup pwoqeipqwpoeiqwopiepqw" },
    { id: 3, title: "Pure hatred", desc: "sdfljskdfjsdjflksdjlkfsdlkfjsdlkfjsdlkfj" },
    { id: 4, title: "Idk why", desc: "sdklfjklsdjfklsdjfsdkflsdjfklsdjflksdjlkfjlsdkjflskdj" },
    { id: 5, title: "did I even try", desc: "vl;xckvl;xckv;lxckvl;xcklvcx" },
    { id: 6, title: "Seems like a good title", desc: "qwpoeiopqweioqpwieopqw" },
    { id: 7, title: "did I even try", desc: "vl;xckvl;xckv;lxckvl;xcklvcx" },
    { id: 8, title: "Last one", desc: "qwpoeiopqweioqpwieopqw" },
  ]);

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        margin: 0,
        padding: 0,
      }}
    >
      <DTopBar sections={sections} />

      <div
        style={{
          display: "flex", // Split the layout horizontally
          flexGrow: 1,
        }}
      >
        
        <div
          style={{
            flex: 2, // Takes two-thirds of the screen
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "10px",
            padding: "10px",
            backgroundColor: "#1A4372",
            overflowY: "auto", // Enable scrolling for sections
          }}
        >
          {sections.map((section) => (
            <div
              style={{
                flex: "1 1 300px", // Allow sections to shrink, grow, and have a basis of 300px
                maxWidth: "400px", // Limit maximum width of a section
                boxSizing: "border-box",
              }} key={section.id}>
              <DSection
                title={section.title}
                description={section.desc}
                deleteSection={() => handleDeleteSection(section.id)}
              />
            </div>
          ))}
        </div>


        <div
          style={{
            flex: 1, // Takes one-third of the screen
            backgroundColor: "#FFFFFF",
            padding: "20px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            position: "sticky",
            top: 0,
            height: "100vh", // Full screen height
          }}
        >
          <h2 style={{ margin: "0 0 20px", color: "#1A4372" }}>Statistics</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>
              <strong>Total Sections:</strong> {sections.length}
            </li>
            <li style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>
              <strong>Completed Tasks:</strong> 5 
              
            </li>
            <li style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>
              <strong>Pending Tasks:</strong> 10 
              
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}*/














// MOST PERFECT ONE YET

import React from "react";
import DSection from "./DSection";
import DTopBar from "./DTopBar";

export default function DashboardPage() {
  const [sections, setSections] = React.useState([
    { id: 1, title: "A great start", desc: "Hey Hey Hey Hey Hey" },
    { id: 2, title: "Some struggle", desc: "Wsup pwoqeipqwpoeiqwopiepqw" },
    { id: 3, title: "Pure hatred", desc: "sdfljskdfjsdjflksdjlkfsdlkfjsdlkfjsdlkfj" },
    { id: 4, title: "Idk why", desc: "sdklfjklsdjfklsdjfsdkflsdjfklsdjflksdjlkfjlsdkjflskdj" },
    { id: 5, title: "did I even try", desc: "vl;xckvl;xckv;lxckvl;xcklvcx" },
    { id: 6, title: "Seems like a good title", desc: "qwpoeiopqweioqpwieopqw" },
    { id: 7, title: "did I even try", desc: "vl;xckvl;xckv;lxckvl;xcklvcx" },
    { id: 8, title: "Last one", desc: "qwpoeiopqweioqpwieopqw" },
  ]);

  const handleDeleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  return (
    <div style={{ minHeight: "calc (100% - 70px)", margin: 0, padding: 0, backgroundColor: "#f5f5f5" }}>
      <div style={{ width: "100%", backgroundColor: "#1A4372", color: "#fff", padding: "0px 0px" }}>
        <DTopBar sections={sections} />
      </div>


      <div style={{ display: "flex", flexGrow: 1 }}>
        
        <div
          style={{
            flex: 1, //How far the stats panel is
            padding: "10px",
            // backgroundColor: "#f0f0f0",
            backgroundColor: "#1A4372",
            overflowY: "auto",
            height: "calc(100vh - 70px)", // Deduct TopBar height
          }}
        >
          {sections.map((section) => (
            <div
              style={{
                backgroundColor: "transparent",
                marginBottom: "10px",
                padding: "0px 5px",
                borderRadius: "5px",
                // boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0)",
              }}
              key={section.id}
            >
              <DSection
                title={section.title}
                description={section.desc}
                deleteSection={() => handleDeleteSection(section.id)}
              />
            </div>
          ))}
        </div>


        <div
          style={{
            flex: 1,
            backgroundColor: "#ffffff",
            padding: "20px",
            boxShadow: "-2px 0px 5px rgba(0, 0, 0, 0.1)",
            position: "sticky",
            top: 0,
            height: "100vh",
          }}
        >
          <h2 style={{ margin: "0 0 20px", color: "#1A4372" }}>Statistics</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>
              <strong>Total Sections:</strong> {sections.length}
            </li>
            <li style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>
              <strong>Completed Tasks:</strong> 5
            </li>
            <li style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>
              <strong>Pending Tasks:</strong> {sections.length - 5}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}


