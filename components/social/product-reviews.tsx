"use client";

import { useState } from "react";
import Image from "next/image";
import { Review, Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { formatPrice } from "@/lib/utils";

interface ProductReviewsProps {
  product: Product;
  reviews: Review[];
  onAddReview?: (review: Omit<Review, '$id' | 'createdAt'>) => void;
  canReview?: boolean;
  userHasPurchased?: boolean;
}

export default function ProductReviews({
  product,
  reviews,
  onAddReview,
  canReview = false,
  userHasPurchased = false
}: ProductReviewsProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    images: [] as string[]
  });

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0
  }));

  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => filterRating === null || review.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        case 'helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });

  const handleSubmitReview = () => {
    if (onAddReview && newReview.title && newReview.comment) {
      onAddReview({
        productId: product.$id,
        buyerId: 'current-user-id',
        buyerName: 'Current User',
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.comment,
        images: newReview.images,
        isVerifiedPurchase: userHasPurchased,
        helpful: 0
      });
      
      setNewReview({ rating: 5, title: '', comment: '', images: [] });
      setIsReviewModalOpen(false);
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    };

    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
    );
  };

  const renderInteractiveStars = (currentRating: number, onRatingChange: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRatingChange(star)}
            className={`w-6 h-6 transition-colors ${
              star <= currentRating ? 'text-yellow-500 fill-current' : 'text-gray-300 hover:text-yellow-400'
            }`}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-4">Customer Reviews</h3>
            <div className="flex items-center space-x-4 mb-4">
              <div className="text-4xl font-bold text-text-primary">
                {product.rating.toFixed(1)}
              </div>
              <div>
                {renderStars(product.rating, 'lg')}
                <p className="text-text-muted text-sm mt-1">
                  Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            {/* Write Review Button */}
            {canReview && (
              <Button
                onClick={() => setIsReviewModalOpen(true)}
                className="w-full md:w-auto"
              >
                Write a Review
              </Button>
            )}
          </div>

          {/* Rating Distribution */}
          <div>
            <h4 className="font-medium text-text-primary mb-3">Rating Distribution</h4>
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center space-x-3">
                  <button
                    onClick={() => setFilterRating(filterRating === rating ? null : rating)}
                    className={`flex items-center space-x-2 text-sm hover:text-text-primary transition-colors ${
                      filterRating === rating ? 'text-text-primary' : 'text-text-muted'
                    }`}
                  >
                    <span>{rating}</span>
                    <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </button>
                  <div className="flex-1 bg-background-secondary rounded-full h-2">
                    <div
                      className="bg-yellow-500 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-text-muted text-sm w-8 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="bg-background-secondary border border-neutral-700 text-text-primary rounded-md px-3 py-2 text-sm"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>

          {filterRating && (
            <Button
              onClick={() => setFilterRating(null)}
              variant="outline"
              size="sm"
            >
              Clear Filter
            </Button>
          )}
        </div>

        <div className="text-text-muted text-sm">
          Showing {filteredReviews.length} of {reviews.length} reviews
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <Card key={review.$id} className="p-6">
              <div className="flex items-start space-x-4">
                {/* Reviewer Avatar */}
                <div className="w-10 h-10 bg-background-secondary rounded-full overflow-hidden flex-shrink-0">
                  {review.buyerAvatar ? (
                    <Image
                      src={review.buyerAvatar}
                      alt={review.buyerName}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-primary font-medium">
                      {review.buyerName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-text-primary">{review.buyerName}</span>
                        {review.isVerifiedPurchase && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      {renderStars(review.rating, 'sm')}
                    </div>
                    <span className="text-text-muted text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <h4 className="font-medium text-text-primary mb-2">{review.title}</h4>
                  <p className="text-text-secondary mb-3">{review.comment}</p>

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex space-x-2 mb-3">
                      {review.images.map((image, index) => (
                        <div key={index} className="w-16 h-16 bg-background-secondary rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`Review image ${index + 1}`}
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Review Actions */}
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-text-muted hover:text-text-primary text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V18m-7-8a2 2 0 01-2-2V4a2 2 0 012-2h2.343M7 12h4m-4 0a2 2 0 01-2-2V4a2 2 0 012-2h2.343m0 0L9 1m0 3h4" />
                      </svg>
                      <span>Helpful ({review.helpful})</span>
                    </button>
                    
                    <button className="text-text-muted hover:text-text-primary text-sm">
                      Report
                    </button>
                  </div>

                  {/* Seller Response */}
                  {review.sellerResponse && (
                    <div className="mt-4 p-4 bg-background-secondary rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-text-primary">Seller Response</span>
                        <span className="text-text-muted text-sm">
                          {new Date(review.sellerResponse.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-text-secondary">{review.sellerResponse.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-6">
            <div className="text-center py-8">
              <span className="text-4xl">⭐</span>
              <h4 className="text-lg font-medium text-text-primary mt-2">No reviews yet</h4>
              <p className="text-text-muted">Be the first to review this artwork!</p>
            </div>
          </Card>
        )}
      </div>

      {/* Write Review Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Write a Review"
        size="lg"
      >
        <div className="space-y-6">
          {/* Product Info */}
          <div className="flex items-center space-x-4 p-4 bg-background-secondary rounded-lg">
            <div className="w-16 h-16 bg-background-tertiary rounded-lg overflow-hidden">
              {product.images[0] && (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              )}
            </div>
            <div>
              <h3 className="font-medium text-text-primary">{product.title}</h3>
              <p className="text-text-muted">by {product.sellerName}</p>
              <p className="text-text-primary font-medium">{formatPrice(product.price)}</p>
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Rating *
            </label>
            {renderInteractiveStars(newReview.rating, (rating) => 
              setNewReview(prev => ({ ...prev, rating }))
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Review Title *
            </label>
            <Input
              type="text"
              value={newReview.title}
              onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Summarize your experience"
              className="bg-background-tertiary border-neutral-700"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Your Review *
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              placeholder="Tell others about your experience with this artwork"
              rows={4}
              className="w-full bg-background-tertiary border border-neutral-700 text-text-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-text-primary resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3">
            <Button
              onClick={() => setIsReviewModalOpen(false)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitReview}
              disabled={!newReview.title || !newReview.comment}
            >
              Submit Review
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 