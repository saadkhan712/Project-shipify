// import React from 'react'

// function FrameD() {
//   return (
//     <div>FrameD</div>
//   )
// }

// export default FrameD
import React, { useState, useEffect } from 'react';
import './FrameD.css'; // Renamed the CSS file
import logoo from '../assists/truck.jpg'

const cardsContent = [
  { title: 'Card 1', description: 'The large truck take 45rs/- km and less if the route is clear and having no rush ' },
  { title: 'Card 2', description: 'The large truck take 45rs/- km and less if the route is clear and having no rush .' },
  { title: 'Card 3', description: 'This is the description of the third card.' }
];

const CardApp = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleNextCard = () => {
    setActiveCardIndex((previousIndex) => (previousIndex + 1) % cardsContent.length);
  };

  // Detect swipe gestures
  useEffect(() => {
    let initialX = 0;

    const onTouchStart = (e) => {
      initialX = e.touches[0].clientX;
    };

    const onTouchEnd = (e) => {
      const finalX = e.changedTouches[0].clientX;
      if (initialX - finalX > 50) {
        handleNextCard(); // Detect swipe left
      }
    };

    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div className="frame-d">
      <div className="frame-d-written-area">
        <h1>Find a better card deal in few easy steps.</h1>
        <p>make your best affordable plan according to your luggage and the distance of your locations. choose the best vehicle and make your plan success in just one click </p>
        <button>know more</button>
      </div>
      <div className="card-containerr" onClick={handleNextCard}>
      {cardsContent.map((card, idx) => (
        <div
          key={idx}
          className={`card-item ${idx === activeCardIndex ? 'active' : ''}`}
        >
          <img src={logoo} alt="" />
          {/* <h2>{card.title}</h2> */}
          <p>{card.description}</p>
          <button className='card-button'>know more</button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default CardApp;
