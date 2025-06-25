import { motion } from "framer-motion";
import { Card,  Navbar } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import  Card2 from './Card2'
import Nav from './Nav'
import My from "./My";
import Scroll from "./Scroll";
import DB from "./DB";
function Home() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const navigate = useNavigate(); // ✅ Get the navigate function

  return (
    

            <div className="bg-black min-h-screen flex flex-col justify-center"> 
           <Nav/>
           <My/>
           <Scroll/>
              <Card2/>
   <div className="text-center">
    <h1 className="text-white py-2 font-bold">
      Up Coming <span className="text-blue-500">Projects</span>
    </h1>
   </div>
    <DB/>
    </div>


  );
}

export default Home;
