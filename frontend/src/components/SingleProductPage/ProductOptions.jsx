const ProductOptions = ({ title, options, selectedOption, onSelectOption }) => (
    <div className='flex flex-col gap-2'>
        <span className='font-semibold text-xl'>{title}</span>
        <div className='flex flex-row justify-start items-center gap-4'>
            {options.map((option, id) => (
                <button
                    className={`w-10 h-10 rounded-md ${selectedOption === option ? 'bg-text-secondary text-white' : 'bg-quaternary'}`}
                    key={id}
                    onClick={() => onSelectOption(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    </div>
);

export default ProductOptions;