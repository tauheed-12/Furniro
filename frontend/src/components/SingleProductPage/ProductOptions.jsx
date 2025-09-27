const ProductOptions = ({ title, options, selectedOption, onSelectOption, disabled = false }) => (
    <div className='flex flex-col gap-2'>
        <span className='font-semibold text-xl'>{title}</span>
        <div className='flex flex-row justify-start items-center gap-4 flex-wrap'>
            {options.map((option, id) => (
                <button
                    key={id}
                    disabled={disabled}
                    className={`px-3 py-2 rounded-md border-2 ${selectedOption === option
                            ? 'bg-text-secondary text-white border-text-secondary'
                            : 'bg-quaternary border-slate-300'
                        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => onSelectOption(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    </div>
);

export default ProductOptions;
