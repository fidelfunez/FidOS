"use client";
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      value: "fidelfunezf@gmail.com",
      link: "mailto:fidelfunezf@gmail.com"
    },
    {
      icon: "📱",
      title: "Phone",
      value: "+1 (281) 541-7279",
      link: "tel:+12815417279"
    },
    {
      icon: "📱",
      title: "Phone (Honduras)",
      value: "+504 9878-1409",
      link: "tel:+50498781409"
    },
    {
      icon: "🌐",
      title: "Website",
      value: "fidelfunez.netlify.app",
      link: "https://fidelfunez.netlify.app"
    },
    {
      icon: "📍",
      title: "Location",
      value: "Remote • Tegucigalpa, Honduras / The Woodlands, Texas",
      link: null
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/fidelfunez",
      icon: "🐙",
      color: "hover:text-gray-400"
    },
    {
      name: "X",
      url: "https://x.com/fidelfunez",
      icon: "🐦",
      color: "hover:text-gray-400"
    }
  ];

  return (
    <div
        className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #c2410c 50%, #0f172a 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
      }}
    >
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/simple" className="text-xl font-bold text-white">Fidel Fúnez C.</a>
            <div className="hidden md:flex space-x-6">
              <a href="/simple/about" className="text-white/80 hover:text-white transition-colors">About</a>
              <a href="/simple/projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
              <a href="/simple/experience" className="text-white/80 hover:text-white transition-colors">Experience</a>
              <a href="/simple/contact" className="text-white hover:text-orange-300 transition-colors">Contact</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="/dashboard" 
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
            >
              Try FidOS
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In <span className="bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            I'm always excited to hear about new opportunities and interesting projects. 
            Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6">Send a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-600/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-300">Thank you! Your message has been sent successfully. I'll get back to you soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white font-semibold mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-white font-semibold mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-orange-400 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="project-inquiry">Project Inquiry</option>
                    <option value="job-opportunity">Job Opportunity</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-orange-400 transition-colors resize-none"
                    placeholder="Tell me about your project or how I can help you..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="text-2xl">{info.icon}</div>
                      <div>
                        <h3 className="text-white font-semibold">{info.title}</h3>
                        {info.link ? (
                          <a 
                            href={info.link} 
                            className="text-orange-300 hover:text-orange-200 transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white/70">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Connect With Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all group"
                    >
                      <span className="text-2xl">{social.icon}</span>
                      <span className="text-white group-hover:text-orange-300 transition-colors">
                        {social.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">Availability</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-white/70">Status:</span>
                    <span className="text-green-400 font-semibold">Available for new projects</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Response Time:</span>
                    <span className="text-white">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Preferred Contact:</span>
                    <span className="text-white">Email</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">What types of projects do you work on?</h3>
              <p className="text-white/70 leading-relaxed">
                I specialize in full-stack web development, including e-commerce platforms, SaaS applications, 
                portfolio websites, and custom business solutions. I'm also experienced with mobile app development 
                and API integrations.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">What's your typical project timeline?</h3>
              <p className="text-white/70 leading-relaxed">
                Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, 
                while a complex web application could take 2-3 months. I always provide detailed timelines during 
                the initial consultation.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Do you work with clients internationally?</h3>
              <p className="text-white/70 leading-relaxed">
                Yes! I work remotely with clients from around the world. I'm comfortable with different time zones 
                and use modern collaboration tools to ensure smooth communication throughout the project.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">What's included in your development process?</h3>
              <p className="text-white/70 leading-relaxed">
                My process includes initial consultation, project planning, design mockups, development phases, 
                testing, deployment, and post-launch support. I maintain clear communication throughout and provide 
                regular updates on progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your ideas and create something amazing together. 
            I'm here to help bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact-form" className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all transform hover:scale-105">
              Start a Conversation
            </a>
            <a href="/simple/projects" className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 transition-colors">
              View My Work
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="text-white/60 mb-4 md:mb-0">
              © 2026 Fidel Fúnez C. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com/fidelfunez" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">GitHub</a>
              <a href="https://x.com/fidelfunez" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">X</a>
              <a href="mailto:fidelfunezf@gmail.com" className="text-white/60 hover:text-white transition-colors">Email</a>
            </div>
          </div>
          <div className="text-sm text-white/40">
            Built with Next.js, TypeScript, and Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage; 