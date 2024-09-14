import InputField from "./InputField";

const FeatureInput = ({ features, handleAddFeature, handleFeatureChange }) => {
    return (
        <div className='flex flex-col'>
            <label className='text-lg font-semibold mb-1'>Features</label>
            {features.map((feature, index) => (
                <InputField
                    key={index}
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e)}
                    placeholder="Enter Feature"
                />
            ))}
            <button type="button" className='px-4 py-2 bg-main rounded-2xl mt-4' onClick={handleAddFeature}>Add+</button>
        </div>
    );
};

export default FeatureInput;