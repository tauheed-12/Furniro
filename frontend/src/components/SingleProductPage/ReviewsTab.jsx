const ReviewsTab = ({ reviews }) => (
    <div className='flex flex-col justify-start items-start gap-4'>
        {reviews.map((review, id) => (
            <div key={id} className='flex flex-col gap-2 bg-slate-100 p-4 w-full'>
                <p>{review.comment}</p>
                <p className='flex flex-row gap-2 text-text-primary justify-end'>
                    <span>{review.rating}</span>
                    <span>{review.reviewerName}</span>
                </p>
            </div>
        ))}
    </div>
);

export default ReviewsTab;