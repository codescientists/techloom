"use client"

import { useToast } from "@/components/ui/use-toast";
import { createReview } from "@/lib/actions/review.action";
import { IReview } from "@/lib/database/models/review.model";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

type reviewParams = {
  productId: string,
  userId: string,
  reviews: [IReview],
}
const Reviews = ({productId, userId, reviews}: reviewParams) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { toast } = useToast();
 
  const handleCommentChange = (e: any) => {
    setComment(e.target.value);
  };

  const handleRating = (rate: number) => {
    setRating(rate)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const newReview = await createReview({
      userId: userId,
      productId: productId,
      rating: rating,
      comment: comment,
      path: `/products/${productId}`
    })

    if(newReview) {
      toast({
        title: "Success: Review Added!",
      })
      setComment('');
      setRating(0);
    }

  };

  
 

  return (
    <div>
      <div className="review-form container">
          <div className="mx-auto mt-8 p-8 bg-gray-100 rounded-md">
          <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Rating
                  initialValue={rating}
                  onClick={handleRating}
                  allowFraction={true}
                  size={35}
              />
              {rating}
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-semibold text-gray-600">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                value={comment}
                onChange={handleCommentChange}
                className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:border-blue-500"
                rows={2}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:shadow-outline-blue active:bg-red-800"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>


      <div className="reviews container my-10">
        {
          reviews.map((review)=>(
            <div className="flex mb-6">
              <div className="flex-shrink-0">
                <img src={review.user.photo} alt="User" className="w-10 h-10 rounded-full" />
              </div>

              <div className="ml-4">
                <div className="flex flex-col items-start mb-2">
                  <span className="font-semibold text-lg">{review.user.name}</span>
                  <Rating
                      initialValue={review.rating}
                      allowFraction={true}
                      allowHover={false}
                      size={18}
                  />
                </div>

                <p className="text-gray-600">{review.text}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Reviews