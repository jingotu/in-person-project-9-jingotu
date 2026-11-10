import { useState } from 'react'
// TODO: Import Link from react-router-dom
import ProjectCard from '../components/ProjectCard'
import SearchBar from '../components/SearchBar'
// TODO: Import the custom useFetch hook once created
import { useFetch } from '../hooks/useFetch'

function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: projects, loading, error } = useFetch('/projects.json')

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const filteredProjects = (projects ?? []).filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.technologies.some(tech =>
      tech.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="projects-page">
      <h1>My Projects</h1>
      <p className="page-description">
        Here are some of the projects I've worked on recently.
      </p>

      <SearchBar onSearch={handleSearch} />

      {/* TODO: Add loading and error states when using useFetch */}
      {loading && (
        <div className="loading">
          Loading projects...
        </div>
      )}

      {error && (
        <div className="error">
          Error loading projects: {error.message}
        </div>
      )}
      {!loading && !error && (
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {!loading && !error && filteredProjects.length === 0 && (
        <div className="no-results">
          <p>No projects match your search.</p>
        </div>
      )}
    </div>
  )
}

export default ProjectsPage