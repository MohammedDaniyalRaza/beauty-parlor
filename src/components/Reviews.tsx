import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Edit2, Trash2 } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  updateDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';

interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
  image: string;
  userId: string;
  createdAt: string;
}

function Reviews() {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [newReview, setNewReview] = useState({ text: '', rating: 5 });
  const [editingId, setEditingId] = useState<string | null>(null);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  // Fetch reviews from Firebase
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsQuery = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(reviewsQuery);
        const reviewsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Review[];
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast.error('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) {
      navigate('/sign-in');
      return;
    }

    try {
      const review = {
        name: user.fullName || 'Anonymous',
        text: newReview.text,
        rating: newReview.rating,
        image: user.imageUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80",
        userId: user.id,
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'reviews'), review);
      setReviews([{ ...review, id: docRef.id }, ...reviews]);
      setNewReview({ text: '', rating: 5 });
      toast.success('Review added successfully!');
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review');
    }
  };

  const handleEdit = (id: string) => {
    const review = reviews.find(r => r.id === id);
    if (review) {
      setEditingId(id);
      setNewReview({ text: review.text, rating: review.rating });
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const reviewRef = doc(db, 'reviews', id);
      await updateDoc(reviewRef, {
        text: newReview.text,
        rating: newReview.rating,
        updatedAt: new Date().toISOString()
      });

      setReviews(reviews.map(review => 
        review.id === id 
          ? { ...review, text: newReview.text, rating: newReview.rating }
          : review
      ));
      setEditingId(null);
      setNewReview({ text: '', rating: 5 });
      toast.success('Review updated successfully!');
    } catch (error) {
      console.error('Error updating review:', error);
      toast.error('Failed to update review');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'reviews', id));
      setReviews(reviews.filter(review => review.id !== id));
      toast.success('Review deleted successfully!');
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading reviews...</p>
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600">Read testimonials from our satisfied customers</p>
        </motion.div>

        {isSignedIn && (
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={editingId ? () => handleUpdate(editingId) : handleAddReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={newReview.text}
                  onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                  rows={4}
                  placeholder="Share your experience..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <select
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-rose-500 focus:border-rose-500"
                  required
                >
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <option key={rating} value={rating}>{rating} Stars</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-rose-500 text-white py-3 px-4 rounded-md font-medium hover:bg-rose-600 transition-colors"
              >
                {editingId ? 'Update Review' : 'Add Review'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setNewReview({ text: '', rating: 5 });
                  }}
                  className="w-full bg-gray-500 text-white py-3 px-4 rounded-md font-medium hover:bg-gray-600 transition-colors"
                >
                  Cancel Edit
                </button>
              )}
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedReviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <img 
                  src={review.image} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{review.name}</h3>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                {isSignedIn && user.id === review.userId && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(review.id)}
                      className="p-2 text-gray-600 hover:text-rose-500"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(review.id)}
                      className="p-2 text-gray-600 hover:text-rose-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-600 italic">{review.text}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          ))}
        </div>

        {reviews.length > 3 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-rose-500 text-white px-6 py-2 rounded-full hover:bg-rose-600 transition-colors"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Reviews;