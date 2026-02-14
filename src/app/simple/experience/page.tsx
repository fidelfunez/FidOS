"use client";
import React from 'react';
import SimpleLayout from '@/components/simple/SimpleLayout';

const ExperiencePage: React.FC = () => {
  const experiences = [
    {
      id: 1,
      title: "Data & Systems Engineer",
      company: "Relay Human Cloud",
      location: "Remote",
      period: "2024 – Present",
      description: "Design and implement internal data tracking systems, reporting pipelines, and production-ready web applications with focus on backend APIs, data models, and system architecture.",
      achievements: [
        "Designed and implemented internal data tracking systems to support operational and financial workflows",
        "Built dashboards and reporting pipelines to visualize program performance, adoption metrics, and financial KPIs",
        "Led merchant data integration efforts, ensuring consistency and data integrity across multiple systems",
        "Developed RESTful services using Python (Flask) and SQLAlchemy with authentication, authorization, and business logic layers",
        "Designed relational database schemas and wrote optimized SQL queries to support scalable application features",
        "Integrated third-party services including payment providers, authentication services, and external data APIs",
        "Collaborated with stakeholders to gather requirements, troubleshoot data issues, and deliver features iteratively"
      ],
      technologies: ["Python", "Flask", "SQLAlchemy", "PostgreSQL", "Data Pipelines", "Dashboards", "RESTful APIs"],
      type: "Full-time"
    },
    {
      id: 2,
      title: "Data Engineer",
      company: "Boxer Property Management",
      location: "Remote (US Company, LATAM-based)",
      period: "2023 – 2024",
      description: "Managed and optimized data pipelines supporting recruiting operations, integrating ATS/CRM tools and ensuring data compliance across client organizations.",
      achievements: [
        "Managed and optimized data pipelines supporting recruiting operations, integrating ATS/CRM tools (Bullhorn, etc.)",
        "Assisted with system transitions and ETL process improvements for payroll and benefits workflows",
        "Ensured data compliance and governance across client organizations, maintaining high data quality standards",
        "Analyzed and visualized recruitment metrics to identify pipeline bottlenecks and improve hiring funnel efficiency",
        "Collaborated with data and reporting teams to monitor KPIs and deliver actionable insights to stakeholders"
      ],
      technologies: ["Data Pipelines", "ATS/CRM", "ETL", "Power BI", "Data Governance"],
      type: "Full-time"
    },
    {
      id: 3,
      title: "Systems Engineer (HR Data)",
      company: "Boxer Property Management",
      location: "Remote (US Company, LATAM-based)",
      period: "2021 – 2023",
      description: "Maintained and optimized internal HR databases supporting enterprise compliance and reporting workflows for 500+ employees.",
      achievements: [
        "Maintained and optimized internal HR databases supporting enterprise compliance and reporting workflows",
        "Ensured data accuracy, integrity, and consistency across internal platforms serving 500+ employees",
        "Collaborated with IT and reporting teams to improve system reliability and data accessibility",
        "Analyzed operational data to identify process inefficiencies and support data-driven improvements"
      ],
      technologies: ["HR Systems", "Database Management", "Data Integrity", "Reporting"],
      type: "Full-time"
    },
    {
      id: 4,
      title: "Data Operations Analyst",
      company: "Agero, Inc.",
      location: "Remote (US Company, LATAM-based)",
      period: "2018 – 2021",
      description: "Administered complex payroll systems processing data for 1,000+ employees, prioritizing data integrity and regulatory compliance.",
      achievements: [
        "Administered complex payroll systems processing data for 1,000+ employees, prioritizing data integrity and regulatory compliance",
        "Managed sensitive datasets and implemented robust data validation steps, enhancing data quality and security",
        "Collaborated with finance to ensure clean data handoffs for accounting and audit",
        "Maintained and optimized HR databases through automation and systematic data cleanup initiatives",
        "Developed custom Excel reports and dashboards for leadership using advanced functions to surface employee trends"
      ],
      technologies: ["Payroll Systems", "Data Validation", "ETL", "Excel", "Data Governance"],
      type: "Full-time"
    }
  ];

  const education = [
    {
      id: 1,
      degree: "B.S. Computer Science Engineering (Cum Laude)",
      school: "Universidad Tecnológica de Honduras (UTH)",
      period: "2018 - 2022",
      description: "Focused on software engineering, algorithms, and data structures.",
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
      name: "Finance Certification",
      issuer: "Relay Human Cloud",
      date: "2024",
      description: "Completed certification covering macroeconomic indicators including GDP, inflation, and fiscal policy."
    },
    {
      id: 2,
      name: "Technical Stack",
      issuer: "Self-Taught & Professional Experience",
      date: "2018 - Present",
      description: "Languages: Python, SQL, Bash, TypeScript. Data & ETL: Pandas, Spark, dbt, Airflow, data modeling, reconciliation. Cloud: AWS (S3, Glue, Athena, Redshift, Kinesis), Terraform, Docker. Databases: PostgreSQL, SQLAlchemy, Redshift. BI: Power BI, Tableau. Backend: Flask, FastAPI, RESTful APIs."
    }
  ];

  return (
    <SimpleLayout activePage="experience">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Work <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Experience</span>
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            My professional journey from data operations to data engineering, building reliable data systems, ETL pipelines, and analytics platforms.
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
                        <p className="text-blue-300 font-semibold text-lg mb-1">{experience.company}</p>
                        <p className="text-white/60 mb-2">{experience.location}</p>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full">
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
                            <span className="text-blue-300 mr-2">•</span>
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
                          <span key={tech} className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full">
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
                    <p className="text-blue-300 font-semibold mb-1">{edu.school}</p>
                    <p className="text-white/60 text-sm">{edu.period}</p>
                  </div>
                </div>
                <p className="text-white/80 mb-4 leading-relaxed">{edu.description}</p>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Achievements:</h4>
                  <ul className="space-y-2">
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-white/70 flex items-start">
                        <span className="text-blue-300 mr-2">•</span>
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
                  <p className="text-blue-300 font-medium mb-1">{cert.issuer}</p>
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
            {/* Timeline Line - hidden on mobile, visible on md+ */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500"></div>

            <div className="space-y-12">
              {/* 2024 - Present */}
              <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-0">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white top-0 md:top-1/2 md:-translate-y-1/2 z-10"></div>
                <div className="md:w-5/12 md:pr-8 md:text-right pl-8 md:pl-0">
                  <h3 className="text-xl font-bold text-white mb-2">2024 - Present</h3>
                  <p className="text-white/80">Data & Systems Engineering</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full">Python</span>
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full">Flask</span>
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-300 text-sm rounded-full">AWS</span>
                  </div>
                </div>
                <div className="md:w-5/12 md:pl-8 pl-8 md:pl-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <p className="text-white/70">Building data tracking systems, reporting pipelines, dashboards, and production-ready backend APIs</p>
                  </div>
                </div>
              </div>

              {/* 2021 - 2024 */}
              <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-0">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-white top-0 md:top-1/2 md:-translate-y-1/2 z-10"></div>
                <div className="md:w-5/12 md:pr-8 md:text-right pl-8 md:pl-0">
                  <h3 className="text-xl font-bold text-white mb-2">2021 - 2024</h3>
                  <p className="text-white/80">Data Engineering & Systems</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cyan-600/20 text-cyan-300 text-sm rounded-full">Data Pipelines</span>
                    <span className="px-3 py-1 bg-cyan-600/20 text-cyan-300 text-sm rounded-full">ETL</span>
                    <span className="px-3 py-1 bg-cyan-600/20 text-cyan-300 text-sm rounded-full">Power BI</span>
                  </div>
                </div>
                <div className="md:w-5/12 md:pl-8 pl-8 md:pl-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <p className="text-white/70">Optimizing data pipelines, ensuring data integrity, building dashboards and analytics for stakeholders</p>
                  </div>
                </div>
              </div>

              {/* 2018 - 2021 */}
              <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-0">
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-400 rounded-full border-4 border-white top-0 md:top-1/2 md:-translate-y-1/2 z-10"></div>
                <div className="md:w-5/12 md:pr-8 md:text-right pl-8 md:pl-0">
                  <h3 className="text-xl font-bold text-white mb-2">2018 - 2021</h3>
                  <p className="text-white/80">Data Operations</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">Database Management</span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">Data Validation</span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">ETL</span>
                  </div>
                </div>
                <div className="md:w-5/12 md:pl-8 pl-8 md:pl-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                    <p className="text-white/70">Administering payroll systems, maintaining HR databases, implementing data validation and reporting</p>
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
            With 6+ years of experience building data systems and ETL pipelines, I'm ready to help bring your data initiatives to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/simple/contact" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105">
              Get In Touch
            </a>
            <a href="/simple/projects" className="px-8 py-4 bg-transparent text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/10 transition-colors">
              View Projects
            </a>
          </div>
        </div>
      </section>
    </SimpleLayout>
  );
};

export default ExperiencePage; 