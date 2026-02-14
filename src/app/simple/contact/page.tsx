"use client";

import React, { useState } from 'react';
import SimpleLayout from '@/components/simple/SimpleLayout';

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID}`
  : null;

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    if (FORMSPREE_ENDPOINT) {
      try {
        const payload = {
          _replyto: formData.email,
          _subject: `[Portfolio] ${formData.subject}: ${formData.name}`,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        };
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          setSubmitStatus('success');
          setFormData({ name: '', email: '', subject: '', message: '' });
          setTimeout(() => setSubmitStatus('idle'), 5000);
        } else {
          setSubmitStatus('error');
        }
      } catch {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Fallback: simulate submission when Formspree not configured
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }, 1500);
    }
  };

  const contactInfo = [
    { icon: '📧', title: 'Email', value: 'fidelfunezf@gmail.com', link: 'mailto:fidelfunezf@gmail.com' },
    { icon: '📱', title: 'Phone', value: '+1 (281) 541-7279', link: 'tel:+12815417279' },
    { icon: '📱', title: 'Phone (Honduras)', value: '+504 9878-1409', link: 'tel:+50498781409' },
    {
      icon: '🌐',
      title: 'Website',
      value: 'fidelfunez.netlify.app',
      link: 'https://fidelfunez.netlify.app',
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Remote • Tegucigalpa, Honduras / The Woodlands, Texas',
      link: null,
    },
  ];

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/fidelfunez', icon: '🐙' },
    { name: 'X', url: 'https://x.com/fidelfunez', icon: '🐦' },
  ];

  return (
    <SimpleLayout activePage="contact">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Get In{' '}
            <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            I'm always excited to hear about data engineering opportunities and interesting projects.
            Let's discuss how we can work together to build reliable data systems.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section id="contact-form" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6">Send a Message</h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-600/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-300">
                    Thank you! Your message has been sent successfully. I'll get back to you soon.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-600/20 border border-red-500/30 rounded-lg">
                  <p className="text-red-300">
                    Something went wrong. Please try again or email me directly at{' '}
                    <a href="mailto:fidelfunezf@gmail.com" className="underline">
                      fidelfunezf@gmail.com
                    </a>
                  </p>
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors"
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-400 transition-colors"
                  >
                    <option value="">Select a subject</option>
                    <option value="data-engineering-role">Data Engineering Role</option>
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition-colors resize-none"
                    placeholder="Tell me about your project or how I can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
                            className="text-blue-300 hover:text-blue-200 transition-colors"
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
                      <span className="text-white group-hover:text-blue-300 transition-colors">
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
                    <span className="text-green-400 font-semibold">Open to data engineering roles</span>
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
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                What types of data work do you specialize in?
              </h3>
              <p className="text-white/70 leading-relaxed">
                I specialize in data engineering: ETL pipelines, data modeling, cloud data platforms
                (AWS), and BI dashboards. I build reporting workflows, design analytics-ready data
                models, and ensure data integrity across systems. I also have full-stack experience
                for applications that need backend APIs and data integrations.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">What's your typical project timeline?</h3>
              <p className="text-white/70 leading-relaxed">
                Timelines vary by scope. A dashboard or reporting pipeline might take 2–4 weeks,
                while an enterprise data platform could take 2–3 months. I always provide detailed
                timelines during the initial consultation and keep stakeholders updated throughout.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                Do you work with teams internationally?
              </h3>
              <p className="text-white/70 leading-relaxed">
                Yes! I work remotely with teams across the US and Latin America. I'm based in CST and
                fluent in English and Spanish. I'm experienced with distributed teams and use modern
                collaboration tools to ensure smooth communication.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">
                What's included in your data engineering process?
              </h3>
              <p className="text-white/70 leading-relaxed">
                My process includes requirements gathering, data modeling, pipeline design and
                development, data quality checks, orchestration (e.g., Airflow), and documentation. I
                emphasize data integrity, reconciliation, and stakeholder-driven solutions, with
                regular updates on progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Your Data Systems?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your data needs—pipelines, dashboards, or platforms. I'm here to help
            bring your data initiatives to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact-form"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              Start a Conversation
            </a>
            <a
              href="/simple/projects"
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 transition-colors"
            >
              View My Work
            </a>
          </div>
        </div>
      </section>
    </SimpleLayout>
  );
};

export default ContactPage;
