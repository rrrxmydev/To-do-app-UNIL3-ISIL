/*import FirstPage from "./FirstPage"

export default function LoginInput({InputName, InputPlaceHolder}){

    return(
        <div style={{fontFamily:"Righteous",display:"flex",flexDirection:"column"
                    ,gap:"10px"
        }}> 
            <label>
                {InputName}  
            </label>
            <input className="LoginInput" style={{width:"300px"}} type="text" placeholder={InputPlaceHolder} >
            
            </input>
        </div>


    )


}*/




/*
export default function LoginInput({ InputName, InputPlaceHolder,InputType }) {
    return (
      <div
        style={{
          fontFamily: "Righteous",
          display: "flex",
          flexDirection: "column", // Stacks label and input vertically
          alignItems: "flex-start", // Aligns them to the top-left
          gap: "10px", // Adds spacing between the label and input
          marginBottom: "20px", // Adds spacing between multiple LoginInput components
          margin:"40px"
        }}
      >
        <label style={{fontSize:"20px"}}>{InputName}</label>
        <input
          className="LoginInput"
          
          style={{
            width: "350px",
            height:"25px",
            margin: 0,
            borderRadius:"5px" ,
          }}
          type={InputType}
          placeholder={InputPlaceHolder} 
        />
      </div>
    );
  }*/

    export default function LoginInput({ InputName, InputPlaceHolder, InputType }) {
      return (
          <div
              style={{
                  fontFamily: "Righteous",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "10px",
                  marginBottom: "20px",
                  margin: "40px",
              }}
          >
              <label style={{ fontSize: "20px",fontWeight:"200" }}>{InputName}</label>
              <input
                  className="LoginInput"
                  style={{
                      width: "350px",
                      height: "45px",fontFamily:'Corbel',
                      margin: 0,
                      borderRadius: "5px",
                      border: "3px solid #1A4372", // Static border color
                      outline: "none", // Remove default outline on focus
                  }}
                  type={InputType}
                  placeholder={InputPlaceHolder}
                  onFocus={(e) => (e.target.style.borderColor = "#1A4372")} // Ensures border stays static
                  onBlur={(e) => (e.target.style.borderColor = "#1A4372")}
              />
          </div>
      );
  }
  
  