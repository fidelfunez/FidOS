"use client";

import React from 'react';
import Image from 'next/image';
import SimpleLayout from '@/components/simple/SimpleLayout';

const featuredProjects = [
  {
    title: 'End-to-End Cloud Data Platform',
    description: 'Enterprise-grade cloud data platform supporting batch and streaming data ingestion, ETL pipelines, and analytics across multiple countries.',
    technologies: ['AWS', 'Apache Airflow', 'Spark', 'Python', 'dbt', 'Terraform'],
    href: '/simple/projects',
    icon: '☁️',
  },
  {
    title: 'IMF Capacity Development Dashboard',
    description: 'Interactive Power BI dashboard analyzing capacity development indicators across 25 IMF member countries with Python data pipelines.',
    technologies: ['Power BI', 'Python', 'Pandas', 'IMF/World Bank APIs'],
    href: '/simple/projects',
    icon: '📊',
  },
  {
    title: 'FidOS - macOS Portfolio',
    description: 'A modern portfolio website that mimics the macOS interface with a fully interactive desktop environment.',
    technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS'],
    href: '/simple/projects',
    icon: '💻',
  },
];

const SimpleView: React.FC = () => {
  return (
    <SimpleLayout>
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
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Fidel Fúnez C.
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Data Engineer & Full-Stack Developer
          </p>
          <p className="text-lg text-white/60 mb-12 max-w-2xl mx-auto">
            Building data systems, ETL pipelines, and full-stack applications. Fluent in English and
            Spanish, based in CST timezone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/simple/projects"
              className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Projects
            </a>
            <a
              href="/Resume.pdf"
              download="Fidel_Funez_Resume.pdf"
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 transition-colors inline-block text-center"
            >
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
                Data Engineer with 6+ years of experience building and shipping production-ready data
                systems end-to-end. Proven ability to design data models, build ETL pipelines, and
                deliver analytics platforms; integrate complex data sources; and ensure data integrity
                across systems. Product-focused engineer who owns data initiatives from concept to
                deployment.
              </p>
              <p className="text-lg text-white/80 mb-6 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to
                open-source projects, or diving into messy datasets to find the story in the data. I
                believe in writing clean, maintainable code and staying up-to-date with industry best
                practices.
              </p>
              <div className="flex gap-4">
                <a
                  href="/simple/about"
                  className="text-blue-300 hover:text-blue-200 font-semibold transition-colors"
                >
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
                  <span className="text-white/60">Public Repos:</span>
                  <span className="text-white font-semibold">10+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Technologies:</span>
                  <span className="text-white font-semibold">15+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Location:</span>
                  <span className="text-white font-semibold">Remote (CST)</span>
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
                  <span className="text-blue-300">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">SQL</span>
                  <span className="text-blue-300">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Pandas</span>
                  <span className="text-blue-300">90%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Apache Spark</span>
                  <span className="text-blue-300">80%</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">Cloud & Databases</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/80">AWS</span>
                  <span className="text-blue-300">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">PostgreSQL</span>
                  <span className="text-blue-300">90%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Docker</span>
                  <span className="text-blue-300">80%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Terraform</span>
                  <span className="text-blue-300">75%</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">BI & Backend</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-white/80">Power BI</span>
                  <span className="text-blue-300">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">Flask</span>
                  <span className="text-blue-300">90%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">FastAPI</span>
                  <span className="text-blue-300">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/80">dbt</span>
                  <span className="text-blue-300">80%</span>
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
            {featuredProjects.map((project) => (
              <a
                key={project.title}
                href={project.href}
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all block group"
              >
                <div className="h-48 bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <div className="text-5xl group-hover:scale-110 transition-transform">{project.icon}</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/60 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-blue-300 hover:text-blue-200 font-semibold">
                    View Project →
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="/simple/projects"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20"
            >
              View All Projects
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Build Your Data Systems?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            I'm always excited to take on new data engineering challenges and collaborate on
            interesting projects. Let's discuss how we can bring your data initiatives to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/simple/contact"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              Get In Touch
            </a>
            <a
              href="/simple/experience"
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 transition-colors"
            >
              View Experience
            </a>
          </div>
        </div>
      </section>
    </SimpleLayout>
  );
};

export default SimpleView;
