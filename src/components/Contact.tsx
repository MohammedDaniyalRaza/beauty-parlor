import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Clock } from 'lucide-react';
// Instagram, Facebook,

function Contact() {
  return (
    <section className="py-20 bg-rose-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Visit Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-rose-500" />
                  <p className="text-gray-800">+92 3347715261</p>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  <p className="text-gray-800">House no D-32 North Nazimabad No 3 Near Abbassi Hospital, Karachi PK</p>
                </div>
                {/* <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <Instagram className="w-5 h-5 text-rose-500" />
                    <Facebook className="w-5 h-5 text-rose-500" />
                  </div>
                  <p className="text-gray-800">@qurrabeauty</p>
                </div> */}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Opening Hours</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-rose-500" />
                  <div>
                    <p className="font-medium">Monday - Saturday</p>
                    <p className="text-gray-600">4:00 PM - 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-rose-500" />
                  <div>
                    <p className="font-medium">Sunday</p>
                    <p className="text-gray-600">3:00 PM - 10:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;