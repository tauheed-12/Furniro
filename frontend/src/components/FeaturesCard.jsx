const FeaturesCard = ({ imgName, title, description }) => (
    <div className='flex flex-row gap-2 justify-center items-center'>
        <img src={imgName} className='' alt="" />
        <div className='flex flex-col justify-center items-start'>
            <h1 className='text-xl font-bold'>{title}</h1>
            <p className='text-text-primary'>{description}</p>
        </div>
    </div>
)

export default FeaturesCard;