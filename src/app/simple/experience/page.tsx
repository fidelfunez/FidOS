"use client";
import React from 'react';

const ExperiencePage: React.FC = () => {
  const experiences = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Freelance",
      location: "Tegucigalpa, Honduras",
      period: "2022 - Present",
      description: "Designed, built, and maintained production-ready web applications with a strong focus on backend APIs and system design.",
      achievements: [
        "Developed RESTful services using Python (Flask) and SQLAlchemy, implementing authentication, authorization, and business logic",
        "Designed relational database schemas and wrote optimized SQL queries to support scalable application features",
        "Integrated third-party services such as payment providers, authentication services, and external APIs",
        "Owned features end-to-end, from initial design through deployment and ongoing improvements"
      ],
      technologies: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "React", "TypeScript", "RESTful APIs"],
      type: "Freelance"
    },
    {
      id: 2,
      title: "Software & Systems Analyst",
      company: "AmityAge Academy",
      location: "Roatán, Honduras",
      period: "2024 - 2025",
      description: "Designed and implemented internal data tracking systems to support operational and financial workflows.",
      achievements: [
        "Led analytics and reporting initiatives, building dashboards to visualize program performance and adoption metrics",
        "Coordinated merchant data integration efforts, ensuring consistency and data integrity across systems",
        "Worked closely with stakeholders to translate operational needs into technical solutions"
      ],
      technologies: ["Data Analytics", "Reporting", "System Integration", "Data Visualization"],
      type: "Full-time"
    },
    {
      id: 3,
      title: "Systems Analyst (Recruiting Platforms)",
      company: "Connected Health Care",
      location: "Austin, TX",
      period: "2023 - 2024",
      description: "Managed and optimized internal systems and data pipelines supporting recruiting operations.",
      achievements: [
        "Integrated ATS/CRM tools to improve data flow and recruitment efficiency",
        "Ensured robust data compliance and governance across client organizations by leveraging internal HR data platforms",
        "Collaborated effectively with data and reporting teams to monitor key recruitment metrics and hiring funnel KPIs",
        "Analyzed and visualized recruitment metrics to identify bottlenecks and improve overall pipeline efficiency"
      ],
      technologies: ["ATS/CRM Integration", "Data Pipelines", "HR Systems", "Data Analytics"],
      type: "Full-time"
    },
    {
      id: 4,
      title: "HR Systems Analyst",
      company: "Boxer Property Management",
      location: "Houston, TX",
      period: "2021 - 2023",
      description: "Maintained and optimized internal HR systems and databases supporting compliance and reporting workflows.",
      achievements: [
        "Ensured data accuracy, integrity, and consistency across internal platforms",
        "Collaborated with IT and reporting teams to improve system reliability and data accessibility",
        "Analyzed operational data to identify inefficiencies and support process improvements"
      ],
      technologies: ["HR Systems", "Database Management", "Data Analysis", "Reporting"],
      type: "Full-time"
    },
    {
      id: 5,
      title: "Data Operations Analyst",
      company: "Agero, Inc.",
      location: "Remote (LATAM)",
      period: "2020 - 2021",
      description: "Administered complex payroll systems, prioritizing data integrity and regulatory compliance.",
      achievements: [
        "Managed sensitive employee datasets and implemented robust data validation steps during processing",
        "Assisted with system transitions and improvements to payroll and benefits workflows",
        "Collaborated with finance to reconcile monthly payroll reports, ensuring clean data handoffs"
      ],
      technologies: ["Payroll Systems", "Data Validation", "ETL Processes", "Financial Reporting"],
      type: "Full-time"
    },
    {
      id: 6,
      title: "Junior Data Operations Analyst",
      company: "Agero, Inc.",
      location: "Remote (LATAM)",
      period: "2018 - 2020",
      description: "Maintained and optimized HR databases, significantly improving data accuracy and integrity.",
      achievements: [
        "Improved data accuracy and integrity through automation and systematic data cleanup initiatives",
        "Supported IT in critical cross-team data-related initiatives, including data migrations and reporting",
        "Managed onboarding and offboarding systems, contributing to the development of structured data pipelines",
        "Developed custom Excel reports and dashboards for leadership, utilizing advanced functions to summarize employee trends"
      ],
      technologies: ["Database Management", "Data Automation", "Excel", "Reporting"],
      type: "Full-time"
    }
  ];

  const education = [
    {
      id: 1,
      degree: "Computer Science Engineer",
      school: "Universidad Tecnológica de Honduras (UTH)",
      period: "2019 - 2022",
      description: "Focused on software engineering, algorithms, and web development.",
      achievements: [
        "Completed comprehensive coursework in computer science fundamentals",
        "Developed strong foundation in software engineering principles",
        "Gained expertise in system design and development methodologies"
      ]
    },
    {
      id: 2,
      degree: "Computer Science",
      school: "Universidad Privada de San Pedro Sula (USAP)",
      period: "2017 - 2019",
      description: "Early foundation in computer science principles and programming fundamentals.",
      achievements: [
        "Established core understanding of computer science concepts",
        "Developed programming skills and problem-solving abilities",
        "Prepared for advanced studies in software engineering"
      ]
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "Technical Skills",
      issuer: "Self-Taught & Professional Experience",
      date: "2018 - Present",
      description: "Languages: Python, SQL, Bash. Backend & APIs: Flask, FastAPI, RESTful API design, authentication (JWT), relational data modeling. Frontend: React, TypeScript, Tailwind CSS. Databases: PostgreSQL, SQLAlchemy. Cloud & DevOps: AWS (S3, Glue, Athena, Redshift), Docker, Git."
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
              <a href="/simple/experience" className="text-white hover:text-orange-300 transition-colors">Experience</a>
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
            Work <span className="bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">Experience</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            My professional journey from data operations to software engineering, building production-ready platforms and systems.
          </p>
        </div>
      </section>

      {/* Work Experience */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Professional Experience</h2>
          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{experience.title}</h3>
                        <p className="text-orange-300 font-semibold text-lg mb-1">{experience.company}</p>
                        <p className="text-white/60 mb-2">{experience.location}</p>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full">
                          {experience.type}
                        </span>
                      </div>
                    </div>
                    <p className="text-white/80 mb-4 leading-relaxed">{experience.description}</p>
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="text-white/70 flex items-start">
                            <span className="text-orange-300 mr-2">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                      <h4 className="text-lg font-semibold text-white mb-4">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span key={tech} className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="text-white/60 text-sm">{experience.period}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Education</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {education.map((edu) => (
              <div key={edu.id} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{edu.degree}</h3>
                    <p className="text-orange-300 font-semibold mb-1">{edu.school}</p>
                    <p className="text-white/60 text-sm">{edu.period}</p>
                  </div>
                </div>
                <p className="text-white/80 mb-4 leading-relaxed">{edu.description}</p>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Achievements:</h4>
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-white/70 flex items-start">
                        <span className="text-orange-300 mr-2">•</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Certifications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <div key={cert.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-4">🏆</div>
                  <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                  <p className="text-orange-300 font-medium mb-1">{cert.issuer}</p>
                  <p className="text-white/60 text-sm">{cert.date}</p>
                </div>
                <p className="text-white/70 text-center leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Timeline */}
      <section className="py-20 px-6 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Skills Evolution</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-orange-500 to-amber-500"></div>
            
            <div className="space-y-12">
              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white"></div>
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-bold text-white mb-2">2022 - Present</h3>
                  <p className="text-white/80">Software Engineering</p>
                  <div className="mt-3">
                    <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full mr-2">Python</span>
                    <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full mr-2">Flask</span>
                    <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full">React</span>
                  </div>
                </div>
                <div className="w-5/12 pl-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <p className="text-white/70">Building production-ready web platforms, designing backend systems, integrating third-party services</p>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full border-4 border-white"></div>
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-bold text-white mb-2">2021 - 2024</h3>
                  <p className="text-white/80">Systems & Data Analysis</p>
                  <div className="mt-3">
                    <span className="px-3 py-1 bg-amber-600/20 text-amber-300 text-sm rounded-full mr-2">Data Analytics</span>
                    <span className="px-3 py-1 bg-amber-600/20 text-amber-300 text-sm rounded-full mr-2">HR Systems</span>
                    <span className="px-3 py-1 bg-amber-600/20 text-amber-300 text-sm rounded-full">Reporting</span>
                  </div>
                </div>
                <div className="w-5/12 pl-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <p className="text-white/70">Optimizing internal systems, ensuring data integrity, building dashboards and analytics</p>
                  </div>
                </div>
              </div>

              <div className="relative flex items-center">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-400 rounded-full border-4 border-white"></div>
                <div className="w-5/12 pr-8 text-right">
                  <h3 className="text-xl font-bold text-white mb-2">2018 - 2021</h3>
                  <p className="text-white/80">Data Operations</p>
                  <div className="mt-3">
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full mr-2">Database Management</span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full mr-2">Data Validation</span>
                    <span className="px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full">ETL Processes</span>
                  </div>
                </div>
                <div className="w-5/12 pl-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <p className="text-white/70">Maintaining HR databases, improving data accuracy, developing automated reporting systems</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Work Together?</h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            With 6+ years of experience building modern web applications, I'm ready to help bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/simple/contact" className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all transform hover:scale-105">
              Get In Touch
            </a>
            <a href="/simple/projects" className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 transition-colors">
              View Projects
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

export default ExperiencePage; 