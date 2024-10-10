// import React from 'react';
 import './FrameB.css';

 import React, { useState, useEffect } from 'react'; 
 const cardsData = [
   { title: 'Track Shipments in Real Time', content: 'Real-time tracking of items will be possible with the platform thanks to integrated GPS technology. Customers will benefit from increased trust and transparency since they can always view the precise position of their cargo.' },
   { title: 'Card 2', content: 'This is the content of the second card.' },
   { title: 'Card 3', content: 'This is the content of the third card.' }
 ];
 
 const App = () => {
   const [currentCardIndex, setCurrentCardIndex] = useState(0);
 
   const showNextCard = () => {
     setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cardsData.length);
   };
 
   // Swipe gesture detection
   useEffect(() => {
     let startX = 0;
 
     const handleTouchStart = (e) => {
       startX = e.touches[0].clientX;
     };
 
     const handleTouchEnd = (e) => {
       const endX = e.changedTouches[0].clientX;
       if (startX - endX > 50) {
         showNextCard(); // Swipe left
       }
     };
 
     document.addEventListener('touchstart', handleTouchStart);
     document.addEventListener('touchend', handleTouchEnd);
 
     return () => {
       document.removeEventListener('touchstart', handleTouchStart);
       document.removeEventListener('touchend', handleTouchEnd);
     };
   }, []);
 
   return (
    <>
    <div className="frame-b section__padding">
      <div className="frame-b-sub-area-1">
        <h1 className='the-other-h1'>get to know more about 
        Haulix</h1>
        <p className='paragraph'>you can read about our facilities here </p>
        <p className='instructor'>(swipe the cards to know more)</p>
        <button>know more</button>
      </div>
     <div className="card-stack" onClick={showNextCard}>
       {cardsData.map((card, index) => (
         <div
           key={index}
           className={`card ${index === currentCardIndex ? 'visible' : ''}`}
         >
           <h2>{card.title}</h2>
           <p>{card.content}</p>
           <button className='card-button'>know more</button>
         </div>
       ))}
     </div>
     </div>
     </>
   );
 };
 
 export default App;
 
