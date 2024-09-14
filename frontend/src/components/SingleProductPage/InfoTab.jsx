const InfoRow = ({ label, value }) => (
    <div className='flex flex-row gap-4'>
        <p>{label}:</p>
        <p>{value}</p>
    </div>
);

export default InfoRow;