const FooterLinkSection = ({ title, links }) => (
    <nav className='flex flex-col gap-4'>
        <span className='text-gray-600'>{title}</span>
        <ul className='flex flex-col gap-2'>
            {links.map((link, index) => (
                <li key={index} className='font-semibold hover:underline cursor-pointer'>
                    {link}
                </li>
            ))}
        </ul>
    </nav>
);

export default FooterLinkSection;