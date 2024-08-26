import { useState } from 'react'

interface SetStarRatingProps {
  initialRating: number
  onRatingChange: (rating: number) => void
}

const SetStarRating = ({
  initialRating,
  onRatingChange,
}: SetStarRatingProps) => {
  const [rating, setRating] = useState(initialRating)

  const handleRatingChange = (newRating: number) => {
    if (newRating < 0.5) {
      newRating = 0.5
    }
    setRating(newRating)
    onRatingChange(newRating)
  }

  return (
    <div className="rating rating-lg rating-half">
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-yellow-400"
        onChange={() => handleRatingChange(0.5)}
        checked={rating === 0.5}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-2 bg-yellow-400"
        onChange={() => handleRatingChange(1)}
        checked={rating === 1}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-yellow-400"
        onChange={() => handleRatingChange(1.5)}
        checked={rating === 1.5}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-2 bg-yellow-400"
        onChange={() => handleRatingChange(2)}
        checked={rating === 2}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-yellow-400"
        onChange={() => handleRatingChange(2.5)}
        checked={rating === 2.5}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-2 bg-yellow-400"
        onChange={() => handleRatingChange(3)}
        checked={rating === 3}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-yellow-400"
        onChange={() => handleRatingChange(3.5)}
        checked={rating === 3.5}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-2 bg-yellow-400"
        onChange={() => handleRatingChange(4)}
        checked={rating === 4}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-1 bg-yellow-400"
        onChange={() => handleRatingChange(4.5)}
        checked={rating === 4.5}
      />
      <input
        type="radio"
        name="rating-10"
        className="mask mask-star-2 mask-half-2 bg-yellow-400"
        onChange={() => handleRatingChange(5)}
        checked={rating === 5}
      />
    </div>
  )
}

export default SetStarRating
