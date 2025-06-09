import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import heroImg from "../assets/hero-image.png"; 

const slideFadeVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const buttonHoverVariants = {
  hover: {
    scale: 1.1,
    boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const Particle = ({ delay }) => {
  const width = typeof window !== "undefined" ? window.innerWidth : 1200;
  const height = typeof window !== "undefined" ? window.innerHeight : 800;

  return (
    <motion.div
      style={{
        position: "absolute",
        width: "12px",
        height: "12px",
        background: "rgba(59, 130, 246, 0.6)", 
        borderRadius: "50%",
        boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
      }}
      initial={{
        x: Math.random() * width,
        y: Math.random() * height,
        scale: Math.random() * 0.5 + 0.5,
        opacity: 0.5,
      }}
      animate={{
        x: Math.random() * width,
        y: Math.random() * height,
        scale: Math.random() * 0.5 + 0.5,
        rotate: 360,
        opacity: [0.3, 1, 0.3],
      }}
      transition={{
        duration: 12,
        repeat: Infinity,
        repeatType: "reverse",
        delay: delay,
        ease: "easeInOut",
      }}
    />
  );
};

const Hero = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" });
  const particles = Array.from({ length: 30 }, (_, i) => (
    <Particle key={i} delay={i * 0.3} />
  ));

  return (
    <section
    id="home"
      className="min-h-screen flex items-center justify-center bg-blue-900 px-6 md:px-16 py-20 relative overflow-hidden"
      ref={sectionRef}
    >
      <motion.div
        className="absolute inset-0 z-0"
        variants={slideFadeVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {particles}
      </motion.div>

      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        <motion.div
          variants={slideFadeVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-[80px] font-extrabold text-white leading-tight mt-8 md:mt-0">
            IGNITING LIFE
          </h1>
          <p className="text-lg md:text-3xl text-white">
            Into Your Business
          </p>
          <motion.button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
            whileHover="hover"
            variants={buttonHoverVariants}
          >
            Let’s Start
          </motion.button>
        </motion.div>

        <motion.div
          variants={slideFadeVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex justify-center"
        >
          <img
            src={heroImg}
            alt="Hero Visual"
            className="w-full max-w-[500px] h-auto object-contain drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;