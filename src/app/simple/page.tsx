"use client";
import React from 'react';
import Image from 'next/image';
import { useIsMobile } from '@/utils/mobile';

const SimpleView: React.FC = () => {
  const isMobile = useIsMobile();

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
            <h1 className="text-xl font-bold text-white">Fidel Fúnez C.</h1>
            <div className="hidden md:flex space-x-6">
              <a href="/simple/about" className="text-white/80 hover:text-white transition-colors">About</a>
              <a href="/simple/projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
              <a href="/simple/experience" className="text-white/80 hover:text-white transition-colors">Experience</a>
              <a href="/simple/contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          {!isMobile && (
            <div className="flex items-center space-x-4">
              <a 
                href="/dashboard" 
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
              >
                Try FidOS
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Image 
              src="/avatar.webp" 
              alt="Fidel Fúnez C." 
              width={128}
              height={160}
              className="w-32 h-40 rounded-full mx-auto mb-6 border-4 border-white/20 shadow-2xl object-cover"
              priority
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
            Fidel Fúnez C.
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Data Engineer & Full-Stack Developer
          </p>
          <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
            Building data systems, ETL pipelines, and full-stack applications. Fluent in English and Spanish, based in CST timezone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/simple/projects" className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              View Projects
            </a>
            <a href="/Resume.pdf" download="Fidel_Funez_Resume.pdf" className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 transition-colors inline-block text-center">
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* Subtle Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                Software Engineer with strong experience building and shipping production-ready web platforms end-to-end. 
                Proven ability to design backend systems, data models, and APIs; integrate complex third-party services; 
                and deliver modern, responsive frontends. Product-focused engineer who owns features from concept to deployment.
              </p>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, 
                or diving into messy datasets to find the story in the data. I believe in writing clean, maintainable code 
                and staying up-to-date with industry best practices.
              </p>
              <div className="flex gap-4">
                <a href="/simple/about" className="text-orange-300 hover:text-orange-200 font-semibold transition-colors">
                  Learn More →
                </a>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/60">Experience:</span>
                  <span className="text-white font-semibold">6+ Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Projects Completed:</span>
                  <span className="text-white font-semibold">23</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Technologies:</span>
                  <span className="text-white font-semibold">15+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Location:</span>
                  <span className="text-white font-semibold">Remote</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Skills & Technologies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Data & ETL</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/80">Python</span>
                  <span className="text-orange-300">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">SQL</span>
                  <span className="text-orange-300">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Pandas</span>
                  <span className="text-orange-300">90%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Apache Spark</span>
                  <span className="text-orange-300">80%</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Cloud & Databases</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/80">AWS</span>
                  <span className="text-orange-300">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">PostgreSQL</span>
                  <span className="text-orange-300">90%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Docker</span>
                  <span className="text-orange-300">80%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Terraform</span>
                  <span className="text-orange-300">75%</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">BI & Backend</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/80">Power BI</span>
                  <span className="text-orange-300">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Flask</span>
                  <span className="text-orange-300">90%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">FastAPI</span>
                  <span className="text-orange-300">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">dbt</span>
                  <span className="text-orange-300">80%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
              <div className="h-48 bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center">
                <div className="text-4xl">₿</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">PaidIn - Bitcoin Payroll Platform</h3>
                <p className="text-white/60 mb-4">Product-focused, full-stack SaaS platform for Bitcoin-native payroll, invoicing, and business operations.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full">Python</span>
                  <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full">Flask</span>
                  <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full">React</span>
                </div>
                <a href="/simple/projects" className="text-orange-300 hover:text-orange-200 font-semibold">
                  View Project →
                </a>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
              <div className="h-48 bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center">
                <div className="text-4xl">💼</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">BitHire - Developer Recruitment</h3>
                <p className="text-white/60 mb-4">Modern recruitment platform connecting U.S. companies with vetted remote developers from Latin America.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full">React</span>
                  <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full">TypeScript</span>
                  <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full">Vite</span>
                </div>
                <a href="/simple/projects" className="text-orange-300 hover:text-orange-200 font-semibold">
                  View Project →
                </a>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
              <div className="h-48 bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center">
                <div className="text-4xl">💻</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">FidOS - macOS Portfolio</h3>
                <p className="text-white/60 mb-4">A modern portfolio website that mimics the macOS interface with a fully interactive desktop environment.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full">Next.js</span>
                  <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full">TypeScript</span>
                  <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full">React</span>
                </div>
                <a href="/simple/projects" className="text-orange-300 hover:text-orange-200 font-semibold">
                  View Project →
                </a>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <a href="/simple/projects" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20">
              View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and collaborate on interesting projects. 
            Let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/simple/contact" className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all transform hover:scale-105">
              Get In Touch
            </a>
            <a href="/simple/experience" className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 transition-colors">
              View Experience
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

export default SimpleView; 