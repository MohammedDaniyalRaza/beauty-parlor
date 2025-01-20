import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserButton, useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Scissors } from 'lucide-react';

function Navbar() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Scissors className="w-8 h-8 text-rose-500" />
            <span className="text-xl font-bold text-rose-500">Qurra Beauty</span>
          </Link>

          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <button
                  onClick={() => navigate('/booking')}
                  className="px-4 py-2 text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
                >
                  Book Appointment
                </button>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/sign-in')}
                  className="px-4 py-2 text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/sign-up')}
                  className="px-4 py-2 text-sm font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;