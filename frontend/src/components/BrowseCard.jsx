const BrowseCard = ({ imgName, alt, title }) => (
    <div className='flex flex-col justify-center items-center gap-5'>
        <img src={imgName} alt={alt} className='rounded-lg' />
        <span className='text-xl font-semibold'>{title}</span>
    </div>
);

export default BrowseCard;