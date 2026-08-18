import { projects } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProjectEditorial } from "@/components/work/ProjectEditorial";
import { ProjectTrace } from "@/components/work/ProjectTrace";
import { ProjectGrid } from "@/components/work/ProjectGrid";

const layouts = {
  editorial: ProjectEditorial,
  trace: ProjectTrace,
  grid: ProjectGrid,
} as const;

export function Work() {
  return (
    <section id="work" aria-labelledby="work-heading" className="scroll-mt-20">
      <div className="shell pt-24 sm:pt-32">
        <SectionHeader
          index="01"
          headingId="work-heading"
          label="Selected work"
          title={
            <>
              Three things built in 2026, each solving a{" "}
              <span className="display-serif">different kind</span> of problem.
            </>
          }
          intro="A collaborative product with no backend, a static-analysis engine that has to cite its sources, and a site that maintains itself. Every figure below comes from the repository it describes."
        />
      </div>

      <div className="mt-4 divide-y divide-line">
        {projects.map((project) => {
          const Layout = layouts[project.layout];
          return <Layout key={project.slug} project={project} />;
        })}
      </div>
    </section>
  );
}
