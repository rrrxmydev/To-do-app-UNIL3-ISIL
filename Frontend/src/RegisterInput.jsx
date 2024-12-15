import { useState } from "react";

export default function RegisterInput({RegisterInputName,RegisterInputPlaceholder, RegisterInputType}){
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    
    return(
        <div style={{ display: "flex",
            flexDirection: "column",marginTop:"20px",
            alignItems: "flex-start",borderBottom:"solid #1A4372 3px"}}>
            <label style={{fontSize:"20px",color:"#1A4372",fontSize:"15px"}}>{RegisterInputName}</label>
            <input type={RegisterInputType} style={{width:"80%",padding:"10px 10px",gap:"10px",border:"none",outline: isFocused ? "none" : "none",}}  onFocus={handleFocus}
                onBlur={handleBlur} placeholder={RegisterInputPlaceholder}></input>
            
            
        </div>


    )
}


