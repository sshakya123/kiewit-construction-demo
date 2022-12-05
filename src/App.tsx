import Input from './reusuable/input';

const projects = [
  {
    id: 1,
    name: 'Project 1',
    description: 'Description of project 1',
  },
  {
    id: 2,
    name: 'Project 2',
    description: 'Description of project 2',
  },
];

type Project = {
  id: number;
  name: string;
  description: string;
};

export default function App() {
  // function renderProject(project: Project) {
  //   return <li key={project.id}>{project.name}</li>;
  // }
  return (
    <>
      <h1>Projects</h1>
      <form>
        <h2>Add Project</h2>
        <Input label='Name' id='name' />
        <Input label='Description' id='description' />
      </form>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </>
  );
}
