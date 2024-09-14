import InfoRow from "./InfoTab";

const AdditionalInfoTab = ({ product }) => (
    <div className='flex flex-col justify-start items-start gap-3'>
        <InfoRow label="Dimensions" value={`${product.dimensions.length} x ${product.dimensions.width} x ${product.dimensions.height}`} />
        <InfoRow label="Colors" value={product.color.join(', ')} />
        <InfoRow label="Materials" value={product.material} />
        <InfoRow label="Features" value={product.features.join(', ')} />
    </div>
);

export default AdditionalInfoTab;