import { Project } from '../types';
import { projects } from '../data';

export default function Projects() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-sky-950 dark:text-sky-100 mb-12 text-center">
          Ongoing Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-sky-50 dark:bg-sky-900 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-semibold text-sky-900 dark:text-sky-100 mb-2">
        {project.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-2">{project.period}</p>
      <p className="text-sky-700 dark:text-sky-300">{project.role}</p>
    </div>
  );
}