import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { ArrowRight, CheckCircle, Heart, Star, Users, Award } from "lucide-react";

const TEAM = [
  { name: "Jordan Blake", role: "Lead Cleaner, Alpha Team", rating: 4.9, jobs: 142, img: "https://i.pinimg.com/736x/a8/aa/aa/a8aaaa6bbb477fad8abec324630f1fa1.jpg", initials: "JB" },
  { name: "Maria Santos", role: "Senior Cleaner, Alpha Team", rating: 4.8, jobs: 128, img: "https://images.unsplash.com/photo-1494790108755-2616b612b277?w=200&q=80", initials: "MS" },
  { name: "Kevin Park", role: "Lead Cleaner, Beta Team", rating: 4.7, jobs: 118, img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", initials: "KP" },
  { name: "Aisha Thompson", role: "Cleaner, Beta Team", rating: 4.6, jobs: 94, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", initials: "AT" },
];

const VALUES = [
  { icon: Heart, title: "We care about your home", desc: "We treat every home as if it were our own — with attention to detail, care, and respect." },
  { icon: Star, title: "Quality without compromise", desc: "If a clean isn't up to our standard, we come back and fix it. No questions asked." },
  { icon: Users, title: "Vetted and trusted team", desc: "Every cleaner is background checked, trained, and insured before joining our team." },
  { icon: Award, title: "Consistent every time", desc: "We use a standardized checklist for every clean so results are reliable and repeatable." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container-pub">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="chip chip-pink inline-flex mb-5">About Us</div>
              <h1 className="text-5xl font-display font-bold text-text-primary mb-5">Toronto&apos;s most trusted cleaning team</h1>
              <p className="text-xl text-text-secondary leading-relaxed mb-6">Founded in 2019, Pristine Pro Cleaning was built on a simple idea cleaning should be reliable, professional, and stress free. We&apos;re a female owned business based in Toronto, serving hundreds of happy customers across the GTA.</p>
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border">
                {[{v:"500+",l:"Clients Served"},{v:"4.9★",l:"Avg Rating"},{v:"2019",l:"Est. Toronto"}].map(s => (
                  <div key={s.l} className="text-center">
                    <p className="text-2xl font-display font-bold text-gradient">{s.v}</p>
                    <p className="text-xs text-text-muted mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover" style={{ height: 420 }}>
              <img src="https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=85&fit=crop" alt="Our cleaning team" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(79,195,247,0.1),rgba(244,143,177,0.08))" }} />
              <div className="absolute bottom-4 left-4 bg-white/95 rounded-2xl px-4 py-3 shadow-soft">
                <p className="text-xs font-bold text-brand-pink-dark">Female owned and operated</p>
                <p className="text-xs text-text-muted mt-0.5">Est. Toronto, 2019</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container-pub">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-text-primary mb-3">What we stand for</h2>
            <p className="text-text-secondary">The values that drive every clean we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(v => (
              <div key={v.title} className="pub-card p-6 text-center">
                <div className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: "linear-gradient(135deg,rgba(79,195,247,0.12),rgba(244,143,177,0.08))", border: "1px solid rgba(79,195,247,0.2)" }}>
                  <v.icon className="w-6 h-6 text-brand-blue-dark" />
                </div>
                <h3 className="text-base font-display font-semibold text-text-primary mb-2">{v.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-gradient-hero">
        <div className="container-pub">
          <div className="text-center mb-12">
            <div className="chip chip-blue inline-flex mb-4">Our Team</div>
            <h2 className="text-3xl font-display font-bold text-text-primary mb-3">The people behind the clean</h2>
            <p className="text-text-secondary">Every member of our team is background checked, trained, and passionate about quality</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(m => (
              <div key={m.name} className="pub-card p-5 text-center">
                <div className="w-16 h-16 rounded-full mx-auto mb-4 overflow-hidden border-2 border-brand-blue/20 shadow-soft flex items-center justify-center font-bold text-lg text-white" style={{ background: "linear-gradient(135deg,#4FC3F7,#F48FB1)" }}>
                  {m.initials}
                </div>
                <p className="text-sm font-semibold text-text-primary">{m.name}</p>
                <p className="text-xs text-text-muted mt-0.5 mb-3">{m.role}</p>
                <div className="flex items-center justify-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-yellow-600"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />{m.rating}</span>
                  <span className="text-text-muted">{m.jobs} jobs</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm bg-gradient-soft">
        <div className="container-pub text-center">
          <h2 className="text-3xl font-display font-bold text-text-primary mb-4">Ready to experience the Pristine Pro difference?</h2>
          <p className="text-text-secondary mb-7 max-w-md mx-auto">Book online in 2 minutes, or give us a call. We&apos;d love to earn your trust.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/book" className="btn-primary">Book a Clean <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
