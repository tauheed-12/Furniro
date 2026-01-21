import React from 'react';
import FooterLinkSection from './FooterLinkSection';

const Footer = () => {
    const linkSections = [
        {
            title: 'Links',
            links: ['Home', 'Shop', 'Blog', 'Contact'],
        },
        {
            title: 'Help',
            links: ['Payment Options', 'Return', 'Privacy Policy', 'Contact'],
        },
    ];

    return (
        <footer className="w-full bg-white px-6 sm:px-10 lg:px-16 py-12">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between gap-12">

                    {/* Brand Info */}
                    <div className="flex flex-col gap-4 text-center lg:text-left max-w-sm">
                        <h1 className="text-2xl font-semibold">Funiro</h1>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            400 University Drive Suite 200<br />
                            Coral Gables, FL 33134 USA
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col sm:flex-row gap-10 justify-center lg:justify-start">
                        {linkSections.map((section, index) => (
                            <FooterLinkSection
                                key={index}
                                title={section.title}
                                links={section.links}
                            />
                        ))}
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-4 text-center lg:text-left max-w-sm w-full">
                        <span className="text-gray-600 font-medium">Newsletter</span>

                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full border-b-2 border-black px-2 py-2 focus:outline-none"
                                aria-label="Enter your email address"
                            />
                            <button
                                className="whitespace-nowrap text-black font-bold border-b-2 border-black hover:bg-black hover:text-white transition-colors px-2 py-2"
                                aria-label="Subscribe to newsletter"
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-300" />

                {/* Bottom Section */}
                <div className="flex justify-center items-center text-center">
                    <p className="text-gray-600 text-sm">
                        © 2023 Funiro. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
