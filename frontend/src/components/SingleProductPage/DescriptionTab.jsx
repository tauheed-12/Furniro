const DescriptionTab = ({ description, imagesUrl }) => (
    <div className='text-text-primary flex flex-col gap-4'>
        <p className='px-4 md:px-10'>{description}</p>
        <div className='flex flex-row flex-wrap justify-center items-center gap-6'>
            {imagesUrl.map((img, id) => (
                <img src={img} alt='product' className='h-48 w-48' key={id} />
            ))}
        </div>
    </div>
);

export default DescriptionTab;