const ContactDetails = ({ font, title, description }) => (
  <div className='flex flex-row gap-3 items-start w-full'>
    <span className='font-bold text-xl'>{font}</span>
    <div>
      <span className='font-semibold text-lg'>{title}</span>
      <p>{description}</p>
    </div>
  </div>
)

export default ContactDetails;