import { Project } from "../App";

export async function getProjects() {
	const res = await fetch('http://http://localhost:3001/projects');
	if (!(res.ok)) throw new Error(res.statusText);
	return res.json() as Promise<Project[]>;
}