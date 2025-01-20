import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const services = [
  {
    title: "Hair Styling",
    description: "Cut, color, and styling by expert professionals",
    price: "From Rs=/1500",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80"
  },
  {
    title: "Facial Treatment",
    description: "Revitalizing facials for glowing skin",
    price: "From Rs=/2000",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80"
  },
  {
    title: "Makeup",
    description: "Professional makeup for any occasion",
    price: "From Rs=/2500",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&q=80"
  },
  {
    title: "Nail Care",
    description: "Manicure and pedicure services",
    price: "From Rs=/700",
    image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80"
  },
  {
    title: "Hair Coloring",
    description: "Professional hair coloring services",
    price: "From Rs=/2000",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&q=80"
  },
  {
    title: "Bridal Makeup",
    description: "Complete bridal beauty packages",
    price: "From Rs=/7000",
    image: "https://images.unsplash.com/photo-1595867818082-083862f3d630?auto=format&fit=crop&q=80"
  },
  {
    title: "Hair Spa",
    description: "Luxurious hair spa treatments",
    price: "From Rs=/2000",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80"
  },
  {
    title: "Threading & Waxing",
    description: "Professional hair removal services",
    price: "From Rs=/800",
    image: "https://media.istockphoto.com/id/486722700/photo/beautiful-woman-in-spa-salon-receiving-epilation-or-correction-eyebrow.jpg?s=2048x2048&w=is&k=20&c=2OT5mfgOygVoxfDtqVApTWg-FubZkwOwJkE3qQ5fmLM="
  }
];

function Services() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-600">Discover our range of professional beauty services</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-rose-500" />
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-rose-500 font-semibold">{service.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;