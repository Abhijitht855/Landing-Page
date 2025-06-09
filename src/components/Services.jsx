import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import service1 from '../assets/service-icon-1.png';
import service2 from '../assets/service-icon-2.png';
import service3 from '../assets/service-icon-5.png';
import service4 from '../assets/service-icon-4.png';
import service5 from '../assets/service-icon-05.png';
import service6 from '../assets/service-icon-6.png';

const services = [
  {
    title: "Corporate Services",
    description: "Streamlined Corporate Services that tends to your Needs & Uplifts Your Business above the predetermined standards",
    image: service1,
  },
  {
    title: "Financial Technology",
    description: "Equip cutting edge Financial technologies for brokerages and institutions",
    image: service2,
  },
  {
    title: "Digital Marketing",
    description: "Build a reachable and engaging digital presence",
    image: service3,
  },
  {
    title: "Branding & Design",
    description: "Memorable and unique branding and designing",
    image: service4,
  },
  {
    title: "Web & App Development",
    description: "Smooth user Interface through Interactive web designs and robust applications",
    image: service5,
  },
  {
    title: "Consulting & Outsourcing",
    description: "Hitting a bulls eye on all business goals through comprehensive planning",
    image: service6,
  },
];

const textVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.1 },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: index * 0.2 },
  }),
};

const Services = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: '-100px' }); 

  return (
    <section id="services" className="py-20 px-6 md:px-16 bg-white text-center" ref={sectionRef}>
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-4"
        variants={textVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={0}
      >
        Our Core Services
      </motion.h1>
      <motion.h2
        className="text-xl text-gray-600 mb-10"
        variants={textVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        custom={1}
      >
        Expand your business
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="group relative bg-gray-100 rounded-xl shadow-md overflow-hidden p-6 transition duration-300 flex flex-col items-center text-center"
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            custom={index}
          >
            <div className="absolute inset-0 bg-blue-500 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-in-out z-0 rounded-xl" />

            <div className="relative z-10 transition duration-300 group-hover:text-white flex flex-col items-center">
              <img
                src={service.image}
                alt={service.title}
                className="w-20 h-20 object-contain mb-4 transition duration-300 group-hover:brightness-0 group-hover:invert"
              />
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-base">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;