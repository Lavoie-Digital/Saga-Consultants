import Hero from "@/components/home/hero";
import Manifesto from "@/components/home/manifesto";
import Expertise from "@/components/home/expertise";
import ProjectsBanner from "@/components/home/projects-banner";
import TeamPreview from "@/components/home/team-preview";

export default function Home() {
  return (
    <>
      <Hero />

      <div id="manifeste">
        <Manifesto />
      </div>

      <Expertise />

      <TeamPreview />

      <ProjectsBanner />
    </>
  );
}
