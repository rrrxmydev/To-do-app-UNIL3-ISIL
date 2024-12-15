import LeftSlide from './LeftSlide'
import RightSlide from './RightSlide'
import FirstPageRightSlideButton from './FirstPageRightSlideButton';
import RegisterInput from './RegisterInput';

import './FirstPage'

export default function RegisterPage(){

    const RegisterInfos = [
        {id: 1, name:"Full Name", ph:"ex. John Smith"},
        {id: 2, name:"Email", ph:"user@gmail.com"},
        {id: 3, name:"Password", ph:"**********", type:"password"},
        {id: 4, name:"Phone Number", ph:"+213 66 12 34 56"}

    ]



    const RegisterInfosAffichage = RegisterInfos.map((RegisterInp) => {

        if(RegisterInp.name == null || RegisterInp.name == "")
            {
                return(<div></div>)
            }

        return(<RegisterInput key={RegisterInp.id} RegisterInputName={RegisterInp.name} RegisterInputPlaceholder={RegisterInp.ph} RegisterInputType={RegisterInp.type} />)

    }




    )

    return(

        <div style={{ 
            textAlign:"center", 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh",backgroundColor:"#1A4372" }}>
            
            <div className='whiteTable' style={{height:"100%",width:"100%",
                    display: "flex",
                    flexDirection: "column", // Stack children vertically
                    justifyContent: "center",
                    alignItems: "center",alignContent:"center"}}>
                

                <div style={{  textAlign:"center", 
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.8)",
                    width: "70%",
                    height:"90%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0px",position:"relative"}}
                     className='RegisterSection'>
                        <p className="RegisterResponsiveLogo" style={{
                            position: "absolute", // Position the logo
                             // top: "3%",
                            // right: "4%",
                            width: "40px", // Adjust size
                            height: "40px",
                            zIndex: "10",fontFamily:"Righteous",color:"#1A4372",
                            lineHeight:0.8,}}>
                                
                                TO<br/>DO
                        </p>

                    <p  style={{ letterSpacing: "3px",
                        color:"#1A4372",fontFamily:"Righteous",
                        margin:"0"}} className='RegisterTitle'>
                        Register</p>

                                    
                    
                    <div style={{width:"350px",marginBottom:"10px"}}>
                    {RegisterInfosAffichage}
                    </div>

                    <div className='RegisterConfirmationSection' style={{margin:"10px"}}>
                        <input type="checkbox" style={{backgroundColor:"green",border:" solid #1A4372 3px"}} /> 
                        <label style={{color:"gray",fontSize:"15px",marginTop:"10px"}}>
                            I have read and agree to the <br/>{" "}
                            <a href="/privacy-policy" target="_blank" style={{ color: "#1A4372", textDecoration: "underline" }}>
                            Privacy Policy
                            </a>{" "}
                            and{" "}
                            <a href="/terms-of-service" target="_blank" style={{ color: "#1A4372", textDecoration: "underline" }}>
                            Terms of Service
                            </a>.
                        </label>
                        {/* <label style={{color:"gray",fontSize:"10px"}}>Reading privacy and policy rules</label> */}
                    </div>
                    <div style={{margin:"20px"}}>
                        <FirstPageRightSlideButton style={{}} nameButton="Create Account"/>
                    </div>

                        
                </div>

               
               
            </div>


            

        </div>
        

    );



}



