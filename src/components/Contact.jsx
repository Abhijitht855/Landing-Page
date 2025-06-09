import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import contactImage from '../assets/hero-image.png';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const slideScaleVariants = {
  hidden: { opacity: 1, scale: 0.9, x: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validate = () => {
    let temp = {};
    if (!formData.name.trim()) temp.name = "Name is required.";
    if (!formData.email.trim()) temp.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) temp.email = "Email is invalid.";
    if (!formData.phone.trim()) temp.phone = "Phone number is required.";
    if (!formData.message.trim()) temp.message = "Message is required.";
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  };

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: '-100px' }); 

  return (
    <section id="contact" className="px-6 py-20 md:px-16 bg-gray-100 text-gray-800" ref={sectionRef}>
      {/* Top Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <motion.div
          className="space-y-4"
          variants={slideScaleVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-600" />
              <p><strong>Location:</strong> 123 Main Street, City, Country</p>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-600" />
              <p><strong>Phone:</strong> +91 98765 43210</p>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-blue-600" />
              <p><strong>Email:</strong> example@pips.com</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={slideScaleVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h1 className="text-3xl font-bold mb-4">Social Media</h1>
          <div className="flex gap-4 flex-wrap">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-pink-500 text-white p-3 rounded-full hover:bg-pink-600 transition"><FaInstagram /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-blue-800 text-white p-3 rounded-full hover:bg-blue-900 transition"><FaLinkedinIn /></a>
            <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition"><FaWhatsapp /></a>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h2
            className="text-2xl font-bold mb-2"
            variants={slideScaleVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            STILL HAVE QUESTIONS?
          </motion.h2>
          <motion.p
            className="mb-6"
            variants={slideScaleVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            We’re ready to answer your questions and jump start your project. Set an appointment with us today!
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            variants={slideScaleVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <input
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <input
                name="phone"
                type="text"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
              Submit
            </button>
          </motion.form>
        </div>

        <motion.div
          variants={slideScaleVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <img src={contactImage} alt="Contact" className="w-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;