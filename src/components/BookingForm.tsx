import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/clerk-react';
import { Calendar, Clock } from 'lucide-react';

const SERVICES = [
  "Hair Styling",
  "Facial Treatment",
  "Makeup",
  "Nail Care",
  "Hair Coloring",
  "Hair Treatment",
  "Bridal Makeup",
  "Party Makeup",
  "Manicure",
  "Pedicure",
  "Waxing",
  "Threading",
  "Hair Spa",
  "Face Cleanup"
];

const TIMESLOTS = {
  monday: { start: "16:00", end: "21:00" },
  tuesday: { start: "16:00", end: "21:00" },
  wednesday: { start: "16:00", end: "21:00" },
  thursday: { start: "16:00", end: "21:00" },
  friday: { start: "16:00", end: "21:00" },
  saturday: { start: "16:00", end: "21:00" },
  sunday: { start: "15:00", end: "21:00" }
};

function BookingForm() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    service: SERVICES[0],
    date: '',
    time: '',
    notes: ''
  });

  const generateTimeSlots = (start: string, end: string) => {
    const slots = [];
    let currentTime = new Date(`2024-01-01 ${start}`);
    const endTime = new Date(`2024-01-01 ${end}`);

    while (currentTime <= endTime) {
      slots.push(currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
      currentTime = new Date(currentTime.getTime() + 30 * 60000); // Add 30 minutes
    }

    return slots;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const templateParams = {
        to_name: "Qurra Beauty Parlor",
        from_name: user?.fullName || user?.emailAddresses[0]?.emailAddress,
        from_email: user?.emailAddresses[0]?.emailAddress,
        service: formData.service,
        appointment_date: formatDate(formData.date),
        appointment_time: formData.time,
        notes: formData.notes || "No additional notes",
        message: `
          Booking Details:
          Service: ${formData.service}
          Date: ${formatDate(formData.date)}
          Time: ${formData.time}
          Additional Notes: ${formData.notes || "No additional notes"}
        `
      };

      await emailjs.send(
        'service_m310yo5',
        'template_m0r3hol',
        templateParams,
        '5txaOCMBXjBFJZhEt'
      );

      toast.success('Appointment booked successfully!');
      setFormData({
        service: SERVICES[0],
        date: '',
        time: '',
        notes: ''
      });
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getAvailableTimeSlots = () => {
    if (!formData.date) return [];
    
    const day = new Date(formData.date).getDay();
    const dayMap = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const schedule = TIMESLOTS[dayMap[day] as keyof typeof TIMESLOTS];
    
    return generateTimeSlots(schedule.start, schedule.end);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 pb-10"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Book Your Appointment</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service
              </label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                required
              >
                {SERVICES.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value, time: '' })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                  required
                />
              </div>
            </div>

            {formData.date && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                    required
                  >
                    <option value="">Select a time</option>
                    {getAvailableTimeSlots().map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                rows={4}
                placeholder="Any special requests or notes..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-rose-500 text-white py-3 px-4 rounded-md font-medium hover:bg-rose-600 transition-colors
                ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Booking...' : 'Book Appointment'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default BookingForm;