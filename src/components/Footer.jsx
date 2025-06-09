import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const slideVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const hoverVariants = {
  hover: {
    scale: 1.05,
    color: '#ffffff',
    transition: { duration: 0.3 },
  },
};

const Footer = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: '-100px' }); 

  return (
    <motion.footer
      className="bg-gray-900 text-white px-6 py-12 md:px-20"
      ref={sectionRef}
      variants={slideVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <motion.div
          className="md:col-span-2"
          variants={slideVariants}
        >
          <h1 className="text-2xl font-bold mb-2">LOGO</h1>
          <p className="mb-2 text-gray-300">
            Guiding businesses toward success since day one.
          </p>
          <p className="text-sm text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, expedita natus. Laudantium atque, laboriosam nostrum rem temporibus, nulla fugiat numquam illum qui repudiandae dicta, dolorum totam ipsum ullam quibusdam ipsa.
          </p>
        </motion.div>

        <motion.div variants={slideVariants}>
          <h2 className="text-xl font-semibold mb-4">Services</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              'Corporate Services',
              'Financial Technology',
              'Digital Marketing',
              'Branding & Design',
              'Web & App Development',
              'Consulting & Outsourcing',
            ].map((service, index) => (
              <motion.li
                key={index}
                whileHover="hover"
                variants={hoverVariants}
                className="flex items-center gap-2"
              >
                <span>-</span> {service}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={slideVariants}>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              { text: 'Home', href: '#' },
              { text: 'About Us', href: '#' },
              { text: 'Services', href: '#' },
              { text: 'Blog', href: '#' },
              { text: 'Contact Us', href: '#' },
            ].map((link, index) => (
              <motion.li
                key={index}
                whileHover="hover"
                variants={hoverVariants}
                className="flex items-center gap-2"
              >
                <a href={link.href} className="hover:text-white transition">
                  - {link.text}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="mt-12 border-t border-gray-700 pt-4 text-center text-sm text-gray-400"
        variants={slideVariants}
      >
        © {new Date().getFullYear()} Copyright. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;