/*import LoginInput from "./LoginInput"

export default function RightSlide(){

    return(

        <div className="RightSlide" style={{alignContent:"center",position:"flex",width:"50vw",height:"100vh",
            }}>

            <h1 style={{fontSize:"55px",letterSpacing:"3px",textAlign:"center"}}>Log in</h1>
           
           

                <LoginInput  InputName="Name" InputPlaceHolder="ex.John Jones" />
                <LoginInput  InputName="Password" InputPlaceHolder="********" />


        </div>
    )


}*/

import FirstPageRightSlideButton from "./FirstPageRightSlideButton";
import LoginInput from "./LoginInput";

export default function RightSlide() {
  return (
    <div
      className="RightSlide"
      // style={{
      //   display: "flex", // Enables flexbox layout
      //   justifyContent: "center", // Centers content horizontally
      //   alignItems: "center", // Centers content vertically
      //   //width: "50vw",
      //   //height: "100vh",
      // }}
    >
      {/* <div style={{ width: "fit-content", textAlign: "left",justifyItems:"center" }}>
        
        <h1 style={{ fontSize: "85px", letterSpacing: "3px", textAlign: "center" }}>
          Log in
        </h1>
        <LoginInput InputName="Name" InputPlaceHolder="ex. John Jones" />
        <LoginInput InputName="Password" InputPlaceHolder="********" InputType="password" />
        <FirstPageRightSlideButton nameButton={"Log in"}/>
      </div> */}


      <div style={{ width: 'fit-content', textAlign: 'left',justifyItems:"center" }}>
        <h1 style={{ fontSize: '85px', letterSpacing: '3px', textAlign: 'center' }}>Log in</h1>
        <LoginInput InputName="Name" InputPlaceHolder="ex. John Jones" />
        <LoginInput InputName="Password" InputPlaceHolder="********" InputType="password" />
        <FirstPageRightSlideButton nameButton="Log in" />
      </div>


    </div>
  );
}
