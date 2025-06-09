import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import aboutImage from '../assets/about-home-thumb.png';

const scaleVariants = {
  hidden: { opacity: 1, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: '-100px' }); 

  return (
    <section id="about" className="py-20 px-6 md:px-16 bg-gray-100" ref={sectionRef}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div
          className="md:w-1/2"
          variants={scaleVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <img
            src={aboutImage}
            alt="About Example Company"
            className="w-full h-auto rounded-lg object-cover"
          />
        </motion.div>

        <motion.div
          className="md:w-1/2 text-left"
          variants={scaleVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
          <h3 className="text-2xl font-semibold text-blue-700 mb-6">Example Corp</h3>
          
          <p className="text-gray-700 mb-6 leading-relaxed">
            Empowering innovation through technology and collaboration.
          </p>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            At Example Corp, we specialize in delivering cutting-edge solutions tailored to meet the unique needs of our clients. From enterprise applications to scalable digital platforms, we bring ideas to life with a focus on quality, speed, and user experience.
          </p>

          <h4 className="text-xl font-semibold text-gray-800 mb-2">Vision and Mission</h4>
          <p className="text-gray-600 mb-3 leading-relaxed">
            Our mission is to drive progress by building technology that matters. We believe in empowering businesses to thrive in an ever-changing digital landscape.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our vision is to be a global leader in tech innovation, setting new standards for excellence, sustainability, and impact in every solution we deliver.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;