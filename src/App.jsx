import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FaDownload, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import resumeData from './resumeData'
import SectionTitle from './components/SectionTitle'

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

function App() {
  const [search, setSearch] = useState('')

  const filteredProjects = useMemo(() => {
    const query = search.toLowerCase().trim()
    if (!query) return resumeData.projects

    return resumeData.projects.filter((project) =>
      [project.name, project.tech, project.description].join(' ').toLowerCase().includes(query),
    )
  }, [search])

  return (
    <div className="page">
      <header className="hero">
        <motion.div initial="hidden" animate="show" variants={containerVariants} className="hero-content">
          <motion.p variants={itemVariants} className="intro">Hi, I am</motion.p>
          <motion.h1 variants={itemVariants}>{resumeData.name}</motion.h1>
          <motion.h3 variants={itemVariants}>{resumeData.role}</motion.h3>
          <motion.p variants={itemVariants} className="summary">{resumeData.summary}</motion.p>
          <motion.div variants={itemVariants} className="contact-row">
            <span><FaMapMarkerAlt /> {resumeData.location}</span>
            <span><FaEnvelope /> {resumeData.email}</span>
            <span><FaPhoneAlt /> {resumeData.phone}</span>
          </motion.div>
          <motion.div variants={itemVariants} className="cta-row">
            <a href={`mailto:${resumeData.email}`} className="btn primary">Hire Me</a>
            <a href="#" className="btn secondary"><FaDownload /> Download Resume</a>
          </motion.div>
        </motion.div>
      </header>

      <main>
        <section className="panel">
          <SectionTitle title="Professional Highlights" subtitle="Snapshot of impact and delivery" />
          <div className="highlights-grid">
            {resumeData.highlights.map((item) => (
              <motion.div key={item.label} whileHover={{ y: -5 }} className="highlight-card">
                <h4>{item.value}</h4>
                <p>{item.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="panel">
          <SectionTitle title="Skills" subtitle="Core technologies I use" />
          <div className="skills-wrap">
            {resumeData.skills.map((skill) => (
              <span key={skill} className="chip">{skill}</span>
            ))}
          </div>
        </section>

        <section className="panel">
          <SectionTitle title="Experience" subtitle="Where I created value" />
          <div className="timeline">
            {resumeData.experience.map((item) => (
              <article key={`${item.company}-${item.duration}`} className="timeline-card">
                <div className="timeline-head">
                  <h4>{item.role}</h4>
                  <span>{item.duration}</span>
                </div>
                <p className="muted">{item.company}</p>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <SectionTitle title="Projects" subtitle="Interactive filter to explore work" />
          <input
            type="text"
            className="search"
            placeholder="Search by project, tech, or keyword..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="project-grid">
            {filteredProjects.map((project) => (
              <motion.article key={project.name} whileHover={{ scale: 1.02 }} className="project-card">
                <h4>{project.name}</h4>
                <p className="tech">{project.tech}</p>
                <p>{project.description}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="panel">
          <SectionTitle title="Education" />
          {resumeData.education.map((item) => (
            <article key={item.degree} className="edu-card">
              <h4>{item.degree}</h4>
              <p>{item.institution}</p>
              <span>{item.duration}</span>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}

export default App
