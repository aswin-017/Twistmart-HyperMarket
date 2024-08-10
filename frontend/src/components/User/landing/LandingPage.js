
// export default OwlSlider;
import React from 'react'
import Navbar from './Navbar'
import Brands from './Brands'
import OfferCard from './OfferCard'
import Top from './Top'
import Twocard from './Twocard'
import TopCard from './TopCard'
import OfferCard1 from './Offercard1'
import Footer from './footer1'
import Twocard1 from './Twocard1'
import Carouselcard from './Carouselcard'

const Landing = () => {
  return (
    <div style={{overflowY: 'hidden',width:'auto'}}>      
      {/* <Navbar /> */}
     <OfferCard />
  <TopCard />
  <Carouselcard />
    <Top />   
    <Brands />
    {/* <Twocard /> */}
{/* <Twocard1 /> */}
    <OfferCard1 />
        {/* <Footer /> */}
  
    </div>
  )
}

export default Landing