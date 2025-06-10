// import React, { useState, useEffect, useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import icon1 from "../assets/about-icon-1.png";
// import icon2 from "../assets/about-icon-2.png";
// import icon3 from "../assets/about-icon-3.png";
// import icon4 from "../assets/about-icon-4.png";

// const originalCards = [
//   { title: "Quality", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, ad", icon: icon1 },
//   { title: "Innovation", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, ad!", icon: icon2 },
//   { title: "Idea", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, ad!", icon: icon3 },
//   { title: "Core Strength", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus, ad!", icon: icon4 },
// ];

// const cards = [originalCards[originalCards.length - 1], ...originalCards, originalCards[0]];

// const cardVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: (index) => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       ease: "easeOut",
//       delay: index * 0.2, 
//     },
//   }),
// };

// const Card = () => {
//   const [currentIndex, setCurrentIndex] = useState(1);
//   const [isTransitioning, setIsTransitioning] = useState(true);
//   const [startX, setStartX] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const containerRef = useRef(null);
//   const sectionRef = useRef(null);
//   const autoSlideRef = useRef(null);
//   const isInView = useInView(sectionRef, { margin: "-100px" });

//   useEffect(() => {
//     startAutoSlide();
//     return () => clearInterval(autoSlideRef.current);
//   }, [currentIndex]);

//   const startAutoSlide = () => {
//     clearInterval(autoSlideRef.current);
//     if (!isDragging) {
//       autoSlideRef.current = setInterval(() => {
//         setCurrentIndex((prev) => prev + 1);
//         setIsTransitioning(true);
//       }, 4000);
//     }
//   };

//   const goToSlide = (index) => {
//     setIsTransitioning(true);
//     setCurrentIndex(index);
//   };

//   useEffect(() => {
//     const container = containerRef.current;
//     const handleTransitionEnd = () => {
//       if (currentIndex === cards.length - 1) {
//         setIsTransitioning(false);
//         setTimeout(() => setCurrentIndex(1), 20);
//       } else if (currentIndex === 0) {
//         setIsTransitioning(false);
//         setTimeout(() => setCurrentIndex(cards.length - 2), 20);
//       }
//     };

//     container.addEventListener("transitionend", handleTransitionEnd);
//     return () => container.removeEventListener("transitionend", handleTransitionEnd);
//   }, [currentIndex]);

//   const handleTouchStart = (e) => {
//     clearInterval(autoSlideRef.current);
//     setStartX(e.touches[0].clientX);
//     setIsDragging(true);
//   };

//   const handleTouchMove = (e) => {
//     if (!isDragging) return;
//     const currentX = e.touches[0].clientX;
//     const diffX = currentX - startX;
//     containerRef.current.style.transform = `translateX(calc(-${currentIndex * 100}% + ${diffX}px))`;
//   };

//   const handleTouchEnd = (e) => {
//     const endX = e.changedTouches[0].clientX;
//     const diff = endX - startX;
//     const threshold = 50;

//     if (diff > threshold) {
//       goToSlide(currentIndex - 1);
//     } else if (diff < -threshold) {
//       goToSlide(currentIndex + 1);
//     } else {
//       goToSlide(currentIndex); 
//     }

//     setIsDragging(false);
//     startAutoSlide();
//   };

//   return (
//     <section  className="py-20 px-6 md:px-16 bg-gray-100" ref={sectionRef}>
//       <div className="max-w-7xl mx-auto text-center">

//         <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {originalCards.map((card, index) => (
//             <motion.div
//               key={index}
//               variants={cardVariants}
//               initial="hidden"
//               animate={isInView ? "visible" : "hidden"}
//               custom={index}
//             >
//               <CardItem card={card} />
//             </motion.div>
//           ))}
//         </div>

//         <div
//           className="sm:hidden overflow-hidden w-full max-w-md mx-auto relative"
//           onTouchStart={handleTouchStart}
//           onTouchMove={handleTouchMove}
//           onTouchEnd={handleTouchEnd}
//         >
//           <div
//             ref={containerRef}
//             className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
//             style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//           >
//             {cards.map((card, index) => (
//               <motion.div
//                 key={index}
//                 className="w-full flex-shrink-0 px-4"
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate={isInView && index === currentIndex ? "visible" : "hidden"}
//                 custom={0}
//               >
//                 <CardItem card={card} />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };



// const CardItem = ({ card }) => (
//   <div className="bg-white p-6 pt-8 rounded-xl shadow-md text-center min-h-[350px] flex flex-col justify-center relative group overflow-hidden">
//     <div
//       className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 opacity-40 z-10"
//       style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
//     />
//     <div className="absolute inset-0 bg-blue-500 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 z-0 rounded-xl" />
//     <div className="relative z-20">
//       <img
//         src={card.icon}
//         alt={card.title}
//         className="mx-auto mb-4 w-16 h-16 group-hover:brightness-0 group-hover:invert transition duration-300"
//       />
//       <h3 className="text-2xl font-semibold text-black group-hover:text-white transition duration-300 mb-2">
//         {card.title}
//       </h3>
//       <p className="text-gray-600 text-sm group-hover:text-white transition duration-300">
//         {card.description}
//       </p>
//     </div>
//   </div>
// );

// export default Card;

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import icon1 from "../assets/about-icon-1.png";
import icon2 from "../assets/about-icon-2.png";
import icon3 from "../assets/about-icon-3.png";
import icon4 from "../assets/about-icon-4.png";

const originalCards = [
  { title: "Quality", description: "We believe in delivering solutions with a decisive competitive advantage.", icon: icon1 },
  { title: "Innovation", description: "Emphasis on innovation is implied in every project as we firmly believe that path breaking solutions need exceptional thinking.", icon: icon2 },
  { title: "Idea", description: "Our structured team works with tested methodology and knowledge delivering excellent products and services.", icon: icon3 },
  { title: "Core Strength", description: "Our strength lies in how our developers and designers perceive the client's vision and goals.", icon: icon4 },
];

const cards = [originalCards[originalCards.length - 1], ...originalCards, originalCards[0]];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      delay: index * 0.2,
    },
  }),
};

const Card = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const autoSlideRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(autoSlideRef.current);
  }, [currentIndex]);

  const startAutoSlide = () => {
    clearInterval(autoSlideRef.current);
    if (!isDragging) {
      autoSlideRef.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(true);
      }, 4000);
    }
  };

  const goToSlide = (index) => {
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const container = containerRef.current;
    const handleTransitionEnd = () => {
      if (currentIndex === cards.length - 1) {
        setIsTransitioning(false);
        setTimeout(() => setCurrentIndex(1), 20);
      } else if (currentIndex === 0) {
        setIsTransitioning(false);
        setTimeout(() => setCurrentIndex(cards.length - 2), 20);
      }
    };

    container.addEventListener("transitionend", handleTransitionEnd);
    return () => container.removeEventListener("transitionend", handleTransitionEnd);
  }, [currentIndex]);

  const handleTouchStart = (e) => {
    clearInterval(autoSlideRef.current);
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDragOffset(currentX - startX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    const threshold = 50;

    if (diff > threshold) {
      goToSlide(currentIndex - 1);
    } else if (diff < -threshold) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(currentIndex);
    }

    setDragOffset(0);
    setIsDragging(false);
    startAutoSlide();
  };

  return (
    <section className="py-20 px-6 md:px-16 bg-gray-100" ref={sectionRef}>
      <div className="max-w-7xl mx-auto text-center">

        {/* Desktop View */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {originalCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={index}
            >
              <CardItem card={card} />
            </motion.div>
          ))}
        </div>

        {/* Mobile View */}
        <div
          className="sm:hidden overflow-hidden w-full max-w-md mx-auto relative mt-10"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            ref={containerRef}
            className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
            }}
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className="w-full flex-shrink-0 px-4"
                variants={cardVariants}
                initial="hidden"
                animate={isInView && index === currentIndex ? "visible" : "hidden"}
                custom={0}
              >
                <CardItem card={card} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CardItem = ({ card }) => (
  <div className="bg-white p-6 pt-8 rounded-xl shadow-md text-center min-h-[350px] flex flex-col justify-center relative group overflow-hidden">
    <div
      className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 opacity-40 z-10"
      style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
    />
    <div className="absolute inset-0 bg-blue-500 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 z-0 rounded-xl" />
    <div className="relative z-20">
      <img
        src={card.icon}
        alt={card.title}
        className="mx-auto mb-4 w-16 h-16 group-hover:brightness-0 group-hover:invert transition duration-300"
      />
      <h3 className="text-2xl font-semibold text-black group-hover:text-white transition duration-300 mb-2">
        {card.title}
      </h3>
      <p className="text-gray-600 text-sm group-hover:text-white transition duration-300">
        {card.description}
      </p>
    </div>
  </div>
);

export default Card;
