import './FirstPage.css'
import FirstPageLeftSlideButton from './FirstPageLeftSlideButton'

export default function LeftSlide(){

    return(

        <div className="LeftSlide" style={{alignContent:"center",position:"flex",
                     color:"white",padding:"10px 0px"}}>
            <div style={{textAlign:"center",alignContent:"center",position:"flex",padding:"0px",margin:"0px"}} className="LeftSlideLogo" >
                <p style={{padding:"0px",margin:"0px"}} className='LeftSlideLogo'>
                    TO<br/>DO
                </p>

            </div>

            <div>
                <div style={{fontSize:"25px",margin:"50px"}} className="LeftSlideP">
                    <p>Welcome to TODO's official website, 
                    the largest tasks management platform on the web, 
                    join us now!</p>
                </div>

            </div>

            <div style={{textAlign:"center"}}>
                <FirstPageLeftSlideButton nameButton={'REGISTER'}/>
            </div>

        </div>




        
    // <div className="LeftSlide">
    //   <div className="LeftSlideLogo">
    //     <p style={{ fontSize: '230px', margin: '0', lineHeight: '0.8' }}>
    //       TO<br />
    //       DO
    //     </p>
    //   </div>
    //   <div className="LeftSlideP">
    //     <p>
    //       Welcome to TODO's official website, the largest tasks management platform on the web, join us now!
    //     </p>
    //   </div>
    //   <div>
    //     <FirstPageLeftSlideButton nameButton="REGISTER" />
    //   </div>
    // </div>



    )


}