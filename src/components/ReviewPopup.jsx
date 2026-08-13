import { useEffect } from 'react'

export default function ReviewPopup({ review, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="review-popup-overlay open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="review-popup">
        <button className="review-popup-close" onClick={onClose} aria-label="Close">&#x2715;</button>
        <div className="review-popup-header">
          <span className="review-popup-laurel">&#10022;</span>
          <h3 className="review-popup-title">{review.title}</h3>
          <span className="review-popup-laurel">&#10022;</span>
        </div>
        <div className="review-popup-stars">{review.stars}</div>
        <p className="review-popup-meta">
          <span>{review.user}</span>&nbsp;·&nbsp;<span>{review.date}</span>
        </p>
        <p className="review-popup-body">{review.full}</p>
      </div>
    </div>
  )
}
