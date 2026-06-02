import Hero from "@/components/home/hero";
import Manifesto from "@/components/home/manifesto";

export default function Home() {
  return (
    <>
      <Hero />

      <div id="manifeste">
        <Manifesto />
      </div>
    </>
  );
}
