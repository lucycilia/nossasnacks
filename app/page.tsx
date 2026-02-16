import Hero from "@/components/Hero";
import WaitlistForm from "@/components/WaitlistForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Hero />

      <section id="waitlist" className="flex flex-col items-center px-6 py-24">
        <h2 className="mb-2 text-3xl font-bold">Entre na lista de espera</h2>
        <p className="mb-10 text-muted">Seja o primeiro a saber quando lançarmos.</p>
        <WaitlistForm />
      </section>

      <Footer />
    </div>
  );
}
