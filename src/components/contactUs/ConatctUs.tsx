"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react'; // Icons for professional look

export default function ContactUs() {
    const [status, setStatus] = useState('');
    
    // Placeholder function for handling form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');
        
        // In a real application, you would send data here (e.g., fetch('/api/contact', { method: 'POST', body: formData }))

        // Simulate success/error
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Assuming success for this example
        setStatus('success');
        e.currentTarget.reset(); // Clear the form
    };

    return (
        // Main container: Dark background, padding for fixed navbar (pt-16)
        <div className="min-h-screen bg-gray-900 text-white pt-20 pb-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <header className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-cyan-400 mb-4">
                        Let's Launch Together
                    </h1>
                    <p className="text-xl text-gray-400">
                        Ready to begin your project's journey? Reach out below.
                    </p>
                </header>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* --- 1. CONTACT FORM (2/3 Width on Desktop) --- */}
                    <div className="lg:col-span-2 bg-gray-800 p-8 sm:p-10 rounded-xl shadow-2xl">
                        <h2 className="text-3xl font-bold mb-8 text-white">Send a Direct Message</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-150"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-150"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
                                <textarea 
                                    id="message" 
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition duration-150 resize-none"
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                disabled={status === 'submitting'}
                                className="w-full flex items-center justify-center space-x-2 py-3 px-6 border border-transparent rounded-lg text-lg font-semibold text-gray-900 bg-cyan-400 hover:bg-cyan-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'submitting' ? (
                                    'Sending...'
                                ) : (
                                    <>
                                        <Send size={20} />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>

                            {status === 'success' && (
                                <p className="text-green-400 mt-4 text-center">
                                    Message sent successfully! We'll be in touch soon.
                                </p>
                            )}
                        </form>
                    </div>

                    {/* --- 2. CONTACT INFO (1/3 Width on Desktop) --- */}
                    <div className="lg:col-span-1 space-y-8">
                        
                        <InfoCard 
                            icon={Mail} 
                            title="Email Address" 
                            content="hello@digitalartisan.com"
                            link="mailto:hello@digitalartisan.com"
                        />
                        
                        <InfoCard 
                            icon={Phone} 
                            title="Phone (Optional)" 
                            content="+1 (555) 123-4567"
                            link="tel:+15551234567"
                        />

                        <InfoCard 
                            icon={MapPin} 
                            title="Location" 
                            content="The Digital Cloud, Earth Orbit"
                            link="https://maps.google.com"
                        />
                    </div>
                </div>

                {/* Optional: Add a subtle map component or social links here */}

            </div>
        </div>
    );
}

// Reusable Info Card Component
interface InfoCardProps {
    icon: React.ElementType;
    title: string;
    content: string;
    link?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon: Icon, title, content, link }) => (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-cyan-500/30">
        <div className="flex items-start space-x-4">
            <div className="p-3 bg-cyan-700/50 rounded-full text-cyan-400">
                <Icon size={24} />
            </div>
            <div>
                <h3 className="text-xl font-bold mb-1 text-white">{title}</h3>
                {link ? (
                    <a href={link} className="text-lg text-gray-300 hover:text-cyan-400 transition-colors">
                        {content}
                    </a>
                ) : (
                    <p className="text-lg text-gray-300">{content}</p>
                )}
            </div>
        </div>
    </div>
);