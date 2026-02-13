"use client";
import React, { useState } from 'react';

const ProjectsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "FidOS - macOS-Inspired Portfolio",
      description: "A modern portfolio website that mimics the macOS interface, featuring a desktop environment with various apps and a lock screen. Built with Next.js and TypeScript.",
      longDescription: "FidOS is my flagship project that showcases my creativity and technical skills. It features a fully functional macOS-inspired interface with working apps like Finder, Safari, Music, and more. The project demonstrates advanced state management, responsive design, and attention to detail in recreating the macOS experience.",
      image: "/avatar.webp",
      category: "web",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
      liveUrl: "https://fidelfunez.netlify.app",
      githubUrl: "https://github.com/fidelfunez",
      featured: true,
      year: "2024"
    },
    {
      id: 2,
      title: "PaidIn - Bitcoin-Native Payroll & Business Platform",
      description: "Product-focused, full-stack SaaS platform for Bitcoin-native payroll, invoicing, and business operations.",
      longDescription: "Product-focused, full-stack SaaS platform for Bitcoin-native payroll, invoicing, and business operations. Designed and built end-to-end with secure authentication, role-based access control, real-time financial data handling, and deep integrations with banking, payment, and Bitcoin/Lightning services.",
      image: "/avatar.webp",
      category: "web",
      technologies: ["Python", "Flask", "SQLAlchemy", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Plaid", "Stripe", "Strike", "Breez"],
      liveUrl: "https://www.paidin.io",
      githubUrl: null,
      featured: true,
      year: "2024"
    },
    {
      id: 3,
      title: "BitHire - Developer Recruitment Platform",
      description: "Modern, production-ready recruitment platform connecting U.S. companies with vetted remote developers from Latin America.",
      longDescription: "Modern, production-ready recruitment platform connecting U.S. companies with vetted remote developers from Latin America. Built with a strong focus on performance, accessibility, responsive design, and a polished, enterprise-grade user experience.",
      image: "/avatar.webp",
      category: "web",
      technologies: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
      liveUrl: "https://www.bithire.co",
      githubUrl: null,
      featured: true,
      year: "2024"
    },
    {
      id: 4,
      title: "End-to-End Cloud Data Platform - Regional Development Bank",
      description: "Enterprise-grade cloud data platform supporting batch and streaming data ingestion, transformation, and analytics across multiple countries.",
      longDescription: "Enterprise-grade cloud data platform supporting batch and streaming data ingestion, transformation, and analytics across multiple countries. Designed scalable ETL pipelines, data quality checks, orchestration workflows, and analytics-ready data models to support research and economic analysis.",
      image: "/avatar.webp",
      category: "backend",
      technologies: ["AWS", "S3", "Glue", "Redshift", "Kinesis", "Apache Airflow", "Spark", "Python", "SQL", "dbt", "Terraform"],
      liveUrl: null,
      githubUrl: "https://github.com/fidelfunez/RegionalBankDataPlatform",
      featured: false,
      year: "2024"
    },
    {
      id: 5,
      title: "Sisyphus II - Daily Task Management App",
      description: "Full-stack productivity application built around a daily-reset task model.",
      longDescription: "Full-stack productivity application built around a daily-reset task model. Implemented authenticated user workflows, REST APIs, relational data models, caching with Redis, and containerized services for reliable local development and deployment.",
      image: "/avatar.webp",
      category: "web",
      technologies: ["FastAPI", "React", "TypeScript", "PostgreSQL", "Redis", "Docker"],
      liveUrl: "https://sisyphus-ii.netlify.app",
      githubUrl: "https://github.com/fidelfunez",
      featured: false,
      year: "2024"
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Applications' },
    { id: 'backend', name: 'Backend APIs' }
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
              <a href="/simple/projects" className="text-white hover:text-orange-300 transition-colors">Projects</a>
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
            My <span className="bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            A collection of projects that showcase my skills, creativity, and passion for building exceptional digital experiences.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeFilter === category.id
                    ? 'bg-white text-black'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Featured Projects</h2>
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            {projects.filter(p => p.featured).map((project) => (
              <div key={project.id} className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group">
                <div className="h-64 bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl">🚀</div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-4">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                        >
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    <span className="text-white/60 text-sm">{project.year}</span>
                  </div>
                  <p className="text-white/80 mb-6 leading-relaxed">{project.longDescription}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-orange-300 hover:text-orange-200 font-semibold"
                      >
                        View Live →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white font-semibold"
                      >
                        View Code →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">All Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all group">
                <div className="h-48 bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center relative overflow-hidden">
                  <div className="text-4xl">💻</div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex space-x-2">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-white text-black text-sm rounded hover:bg-gray-100 transition-colors"
                        >
                          Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-black/50 text-white text-sm rounded hover:bg-black/70 transition-colors"
                        >
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <span className="text-white/60 text-sm">{project.year}</span>
                  </div>
                  <p className="text-white/60 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-orange-600/20 text-orange-300 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 text-white/60 text-xs rounded-full">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-4">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-orange-300 hover:text-orange-200 text-sm font-semibold"
                      >
                        Live Demo →
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white text-sm font-semibold"
                      >
                        View Code →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">23</div>
              <div className="text-white/60">Projects Completed</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">6+</div>
              <div className="text-white/60">Years Experience</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">15+</div>
              <div className="text-white/60">Technologies Used</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">100%</div>
              <div className="text-white/60">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Interested in Working Together?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            I'm always excited to take on new challenges and collaborate on interesting projects. 
            Let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/simple/contact" className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all transform hover:scale-105">
              Start a Project
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

export default ProjectsPage; 