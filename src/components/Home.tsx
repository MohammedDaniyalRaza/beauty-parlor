import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Services from './Services';
import Gallery from './Gallery';
// import Reviews from './Reviews';
import Contact from './Contact';
import Testimonials from './Testimonials';

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <Services />
      <Gallery />
      <Testimonials/>
      <Contact />
    </motion.div>
  );
}

export default Home;