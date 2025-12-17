"use client";
import React from 'react';
import Image from 'next/image';

const AboutPage: React.FC = () => {
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
              <a href="/simple/about" className="text-white hover:text-orange-300 transition-colors">About</a>
              <a href="/simple/projects" className="text-white/80 hover:text-white transition-colors">Projects</a>
              <a href="/simple/experience" className="text-white/80 hover:text-white transition-colors">Experience</a>
              <a href="/simple/contact" className="text-white/80 hover:text-white transition-colors">Contact</a>
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
            About <span className="bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Get to know more about my journey, passion for technology, and what drives me to create exceptional digital experiences.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Personal Info */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 sticky top-32">
                <div className="text-center mb-8">
                  <Image 
                    src="/avatar.webp" 
                    alt="Fidel Fúnez C." 
                    width={128}
                    height={160}
                    className="w-32 h-40 rounded-full mx-auto mb-6 border-4 border-white/20 shadow-2xl object-cover"
                    priority
                  />
                  <h2 className="text-2xl font-bold text-white mb-2">Fidel Fúnez C.</h2>
                  <p className="text-white/60">Software Engineer</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Personal Info</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/60">Age:</span>
                        <span className="text-white">25 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Location:</span>
                        <span className="text-white">Remote, Honduras</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Experience:</span>
                        <span className="text-white">6+ years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Languages:</span>
                        <span className="text-white">English, Spanish</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-white/60">📧</span>
                        <a href="mailto:fidel@paidin.io" className="text-white hover:text-orange-300 transition-colors">fidel@paidin.io</a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-white/60">📱</span>
                        <a href="tel:+12815417279" className="text-white hover:text-orange-300 transition-colors">+1 (281) 541-7279</a>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-white/60">🌐</span>
                        <a href="https://fidelfunez.netlify.app" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-300 transition-colors">fidelfunez.netlify.app</a>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Social</h3>
                    <div className="flex space-x-4">
                      <a href="https://github.com/fidelfunez" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">GitHub</a>
                      <a href="https://www.linkedin.com/in/fidel-funez" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">LinkedIn</a>
                      <a href="https://x.com/fidelfunez" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">X</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Story Section */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">My Story</h2>
                <div className="space-y-6 text-lg text-white/80 leading-relaxed">
                  <p>
                    My journey in software development began in 2018 when I started as a Junior Data Operations Analyst, 
                    working with HR systems and databases. This foundation in data operations and system administration 
                    gave me a deep understanding of how data flows through organizations and the importance of data integrity.
                  </p>
                  <p>
                    Over the past 6+ years, I've evolved from data operations to full-stack software engineering, working 
                    with diverse teams across various industries. From HR systems and recruiting platforms to building 
                    Bitcoin-native payroll solutions and enterprise cloud data platforms, each project has taught me 
                    something new about problem-solving, system design, and the ever-evolving landscape of web technologies.
                  </p>
                  <p>
                    I believe that great software is built on a foundation of clean code, thoughtful system design, and a deep 
                    understanding of user needs. My approach combines technical expertise with product-focused thinking, 
                    always striving to deliver solutions that are both elegant and functional, with an emphasis on reliability 
                    and scalability.
                  </p>
                </div>
              </div>

              {/* Education Section */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Education</h2>
                <div className="space-y-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-white">Computer Science Engineer</h3>
                      <span className="text-white/60 text-sm">2019 - 2022</span>
                    </div>
                    <p className="text-orange-300 font-medium mb-2">Universidad Tecnológica de Honduras (UTH)</p>
                    <p className="text-white/70">
                      Focused on software engineering, algorithms, and web development. Developed strong foundation 
                      in system design and development methodologies.
                    </p>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-white">Computer Science</h3>
                      <span className="text-white/60 text-sm">2017 - 2019</span>
                    </div>
                    <p className="text-orange-300 font-medium mb-2">Universidad Privada de San Pedro Sula (USAP)</p>
                    <p className="text-white/70">
                      Early foundation in computer science principles and programming fundamentals. Established core 
                      understanding of computer science concepts and developed programming skills.
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Technical Skills</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Frontend Development</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">React & Next.js</span>
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{width: '95%'}}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">TypeScript</span>
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{width: '90%'}}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Tailwind CSS</span>
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{width: '90%'}}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">FastAPI</span>
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{width: '80%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Backend Development</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">Python & Flask</span>
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{width: '90%'}}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">PostgreSQL</span>
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">SQLAlchemy</span>
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{width: '85%'}}></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80">RESTful APIs</span>
                        <div className="w-24 bg-white/20 rounded-full h-2">
                          <div className="bg-orange-400 h-2 rounded-full" style={{width: '90%'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interests Section */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Interests & Hobbies</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Technology</h3>
                    <ul className="space-y-2 text-white/80">
                      <li>• Open source contribution</li>
                      <li>• Learning new frameworks</li>
                      <li>• Bitcoin conferences & meetups</li>
                      <li>• Reading FinTech blogs</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-4">Personal</h3>
                    <ul className="space-y-2 text-white/80">
                      <li>• Combat sports</li>
                      <li>• Nutrition</li>
                      <li>• Weightlifting</li>
                      <li>• Music production</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Values Section */}
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">My Values</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Quality First</h3>
                    <p className="text-white/70">I believe in writing clean, maintainable code that stands the test of time.</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🤝</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Collaboration</h3>
                    <p className="text-white/70">Great products are built by great teams working together effectively.</p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-4">🚀</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Innovation</h3>
                    <p className="text-white/70">Always exploring new technologies and approaches to solve problems better.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div className="text-white/60 mb-4 md:mb-0">
              © 2025 Fidel Fúnez C. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com/fidelfunez" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/fidel-funez" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">LinkedIn</a>
              <a href="https://x.com/fidelfunez" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">X</a>
              <a href="mailto:fidel@paidin.io" className="text-white/60 hover:text-white transition-colors">Email</a>
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

export default AboutPage; 