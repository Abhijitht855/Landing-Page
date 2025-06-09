import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import blogImg1 from "../assets/blog-1.jpg";
import blogImg2 from "../assets/blog-2.jpg";
import blogImg3 from "../assets/blog-3.jpg";

const originalBlogPosts = [
  {
    date: "March 11, 2018",
    title: "Live support, key of satisfaction",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt consectetur itaque odio, saepe repudiandae corrupti voluptate?",
    image: blogImg1,
  },
  {
    date: "April 5, 2019",
    title: "Creating digital experiences",
    description:
      "Possimus, asperiores, doloremque voluptatibus quod perspiciatis libero quas in maxime eius placeat, ab corporis!",
    image: blogImg2,
  },
  {
    date: "May 20, 2020",
    title: "Modern marketing techniques",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit laborum sapiente modi alias molestiae voluptas!",
    image: blogImg3,
  },
];

const blogCards = [
  originalBlogPosts[originalBlogPosts.length - 1],
  ...originalBlogPosts,
  originalBlogPosts[0],
];

const scaleSlideVariants = {
  hidden: { opacity: 1, scale: 0.9, x: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0); 

  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const autoSlideRef = useRef(null);
  const isInView = useInView(sectionRef, { margin: "-100px" }); 

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(autoSlideRef.current);
  }, []);

  const startAutoSlide = () => {
    clearInterval(autoSlideRef.current);
    if (!isDragging) {
      autoSlideRef.current = setInterval(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(true);
      }, 4000);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const handleTransitionEnd = () => {
      if (currentIndex === blogCards.length - 1) {
        setIsTransitioning(false);
        setTimeout(() => setCurrentIndex(1), 20);
      } else if (currentIndex === 0) {
        setIsTransitioning(false);
        setTimeout(() => setCurrentIndex(blogCards.length - 2), 20);
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
    const diffX = currentX - startX;
    setDragOffset(diffX); 
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    const threshold = 50;

    if (diff > threshold) {
      setCurrentIndex((prev) => prev - 1);
      setIsTransitioning(true);
    } else if (diff < -threshold) {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }
    setDragOffset(0); 
    startAutoSlide();
  };

  const baseTranslateX = -currentIndex * 100;
  const containerWidth = containerRef.current?.offsetWidth || 1;
  const dragTranslateX = (dragOffset / containerWidth) * 100;

  return (
    <section className="py-20 px-6 md:px-16 bg-gray-100" ref={sectionRef}>
      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 mb-12"
        variants={scaleSlideVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        BLOG
      </motion.h1>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {originalBlogPosts.map((post, index) => (
          <motion.div
            key={index}
            variants={scaleSlideVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <BlogCard post={post} />
          </motion.div>
        ))}
      </div>

      <div
        className="sm:hidden overflow-hidden w-full max-w-md mx-auto relative"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={containerRef}
          className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
          style={{ transform: `translateX(calc(${baseTranslateX}% + ${dragTranslateX}%))` }}
        >
          {blogCards.map((post, index) => (
            <motion.div
              key={index}
              className="w-full flex-shrink-0 px-4"
              variants={scaleSlideVariants}
              initial="hidden"
              animate={isInView && index === currentIndex ? "visible" : "hidden"}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogCard = ({ post }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden">
    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
    <div className="p-6 flex flex-col gap-3">
      <p className="text-sm text-gray-500">{post.date}</p>
      <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
      <p className="text-gray-600">{post.description}</p>
      <a href="#" className="mt-2 text-blue-600 hover:underline font-medium w-fit">
        Read More →
      </a>
    </div>
  </div>
);

export default Blog;
