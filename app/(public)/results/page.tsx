import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const RESULTS = [
  { id:1, service:"Deep Clean",         city:"Toronto",     image:"https://i.pinimg.com/1200x/c9/dc/93/c9dc932eac8d752f3d765b395763f1c4.jpg" },
  { id:2, service:"Standard Clean",     city:"Mississauga", image:"https://i.pinimg.com/736x/89/e1/a9/89e1a95d3a7fc4ff9a082c03000d97cb.jpg" },
  { id:3, service:"Move-In / Move-Out", city:"Toronto",     image:"https://i.pinimg.com/1200x/e8/9a/57/e89a571f2cd224d308cee05f20585073.jpg" },
  { id:4, service:"Post-Construction",  city:"Brampton",    image:"https://i.pinimg.com/736x/a1/68/d8/a168d8b06f7d88b31c2124f3390fab9f.jpg" },
  { id:5, service:"Office Clean",       city:"Toronto",     image:"https://i.pinimg.com/1200x/84/e0/1c/84e01cd78312a169a9c747718e56004d.jpg" },
  { id:6, service:"Airbnb Turnover",    city:"Ajax",        image:"https://i.pinimg.com/1200x/99/21/2e/99212e1aba0610a0954db70768d8d343.jpg" },
];

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container-pub text-center">
          <div className="chip chip-pink inline-flex mb-5">Real Results</div>
          <h1 className="text-5xl font-display font-bold text-text-primary mb-5">
            See the <span className="text-gradient">difference</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-lg mx-auto">
            Every photo shows the <strong>Before</strong> and <strong>After</strong> 
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="section bg-gradient-hero">
        <div className="container-pub">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {RESULTS.map((r) => (
              <div key={r.id} className="pub-card overflow-hidden group">
                <div className="relative" style={{ height: 260 }}>
                  <img
                    src={r.image}
                    alt={`${r.service} before and after`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-soft bg-brand-blue/90">
                    Before &amp; After
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-text-primary">{r.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-gradient-soft">
        <div className="container-pub text-center">
          <h2 className="text-3xl font-display font-bold text-text-primary mb-4">Want results like these in your home?</h2>
          <p className="text-text-secondary mb-7 max-w-sm mx-auto">Book a clean today and see the Pristine Pro difference for yourself.</p>
          <Link href="/book" className="btn-primary text-base">Book a Clean <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
