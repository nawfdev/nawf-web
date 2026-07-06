import { ProjectForm } from "@/components/project-form";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-white">New project</h1>
      <ProjectForm />
    </div>
  );
}
