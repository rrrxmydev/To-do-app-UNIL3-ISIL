


//   import React from "react";
// import IconButton from "./IconButton";

// export default function DSTask({ taskId, taskName, onDelete, isFirst, isLast }) {
//   if (!taskName) return null;

//   return (
//     <div
//       style={{
//         display: "flex",justifyContent: "space-between",
//         alignItems: "flex-start",padding: "10px",
//         margin: "0px 0",backgroundColor: "transparent",
//         position: "relative",
//         borderTop: isFirst ? "none" : "0.5px solid #b9b9b9",
         
//         taskborderBottom: isLast ? "none" : "0.5px solid #b9b9b9",
//       }}>
      
//       <label
//         style={{
//           flexGrow: 1,
//           color: "black",
//           letterSpacing: "1px",
//           fontSize: "15px",
//           fontWeight: "400",
//           textAlign: "left",
//           wordWrap: "break-word",
//         }}
//       >
//         {taskName}
//       </label>

//       {/* Buttons */}
//       <div style={{ display: "flex", gap: "5px", position: "absolute", top: "10px", right: "10px" }}>
        
//       <button
//           style={{
//             border: "none",
//             background: "transparent",
//             cursor: "pointer",}} onClick={() => onDelete(taskId)}>
//           <i style={{ fontSize: "19px", color: "#1A4372" }} className="material-icons">
//             delete
//           </i>
//         </button>

//         <button style={{ border: "none", background: "transparent", cursor: "pointer" }}>
//           <IconButton />
        
//         </button>
        
//       </div>
//     </div>
//   );
// }






// import React from "react";
// import IconButton from "./IconButton";

// export default function DSTask({ taskId, taskName, onDelete, isFirst, isLast, isSingleTask }) {
//   if (!taskName) return null;

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         padding: "10px",
//         margin: "0px 0",
//         backgroundColor: "transparent",
//         position: "relative",
//         borderTop: isSingleTask || isFirst ? "none" : "0.5px solid #b9b9b9",
//         borderBottom: isSingleTask || isLast ? "none" : "0.5px solid #b9b9b9",
//       }}
//     >
//       <label
//         style={{
//           flexGrow: 1,
//           color: "black",
//           letterSpacing: "1px",
//           fontSize: "15px",
//           fontWeight: "400",
//           textAlign: "left",
//           wordWrap: "break-word",
//         }}
//       >
//         {taskName}
//       </label>

//       {/* Buttons */}
//       <div
//         style={{
//           display: "flex",
//           gap: "5px",
//           position: "absolute",
//           top: "10px",
//           right: "10px",
//         }}
//       >
//         <button
//           style={{
//             border: "none",
//             background: "transparent",
//             cursor: "pointer",
//           }}
//           onClick={() => onDelete(taskId)}
//         >
//           <i
//             style={{ fontSize: "19px", color: "#1A4372" }}
//             className="material-icons"
//           >
//             delete
//           </i>
//         </button>

//         <button
//           style={{ border: "none", background: "transparent", cursor: "pointer" }}
//         >
//           <IconButton />
//         </button>
//       </div>
//     </div>
//   );
// }



import React from "react";
import IconButton from "./IconButton";

export default function DSTask({ taskId, taskName, onDelete, isFirst, isLast, isSingleTask }) {
  if (!taskName) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "10px",
        margin: "0px 0",
        backgroundColor: "transparent",
        position: "relative",
        borderTop: isSingleTask || isFirst ? "none" : "0.5px solid #b9b9b9",
        borderBottom: isSingleTask || isLast ? "none" : "0.5px solid #b9b9b9",
      }}
    >
      <label
        style={{
          flexGrow: 1,
          color: "black",
          letterSpacing: "1px",
          fontSize: "15px",
          fontWeight: "400",
          textAlign: "left",
          wordWrap: "break-word",
        }}
      >
        {taskName}
      </label>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          gap: "5px",
          position: "absolute",
          top: "10px",
          right: "10px",
        }}
      >
        <button
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
          onClick={() => onDelete(taskId)}
        >
          <i
            style={{ fontSize: "19px", color: "#1A4372" }}
            className="material-icons"
          >
            delete
          </i>
        </button>

        <button
          style={{ border: "none", background: "transparent", cursor: "pointer" }}
        >
          <IconButton />
        </button>
      </div>
    </div>
  );
}

