import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './components/Home';
import BookingForm from './components/BookingForm';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-rose-50">
      <Navbar />
      
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route
            path="/sign-in/*"
            element={
              <div className="min-h-screen pt-16 flex items-center justify-center">
                <SignIn routing="path" path="/sign-in" />
              </div>
            }
          />
          <Route
            path="/sign-up/*"
            element={
              <div className="min-h-screen pt-16 flex items-center justify-center">
                <SignUp routing="path" path="/sign-up" />
              </div>
            }
          />
          <Route
            path="/booking"
            element={
              <>
                <SignedIn>
                  <BookingForm />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;