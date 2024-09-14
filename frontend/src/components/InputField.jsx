const InputField = ({ label, name, value, onChange, type = "text", placeholder = "" }) => {
    const inputCss = 'border-solid border-[1px] border-black text-lg px-5 py-2 rounded-xl w-full';
    const labelCss = 'text-lg font-semibold mb-1';
    const inputDivCss = 'flex flex-col justify-start items-start w-full';

    return (
        <div className={inputDivCss}>
            <label className={labelCss}>{label}</label>
            <input
                className={inputCss}
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;