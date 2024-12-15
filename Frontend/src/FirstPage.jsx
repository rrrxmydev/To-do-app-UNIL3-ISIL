import LeftSlide from './LeftSlide'
import RightSlide from './RightSlide'
import FirstPageLeftSlideButton from './FirstPageLeftSlideButton';


export default function FirstPage(){

    return(

        <div className="ResponsiveContainer" > 

{/* style={{ flexDirection: "column",flex:"",display: "flex", width: "100%", height: "100vh" }} */}
            <LeftSlide/>
            <RightSlide/>


        </div>

    );



}