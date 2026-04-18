import Link from "next/link";
import { PublicNav } from "@/components/public/PublicNav";
import { PublicFooter } from "@/components/public/PublicFooter";
import { CheckCircle, ArrowRight } from "lucide-react";

const SERVICES = [
  { name:"Standard Clean", from:"$120", duration:"2–3 hrs", includes:["Vacuuming all floors","Mopping","Dusting all surfaces","Bathrooms scrubbed","Kitchen surfaces & sink","Mirrors & glass"] },
  { name:"Deep Clean", from:"$220", duration:"3–5 hrs", includes:["Everything in Standard","Inside oven & fridge","Inside cabinets","Baseboards & trim","Window sills","Behind appliances"] },
  { name:"Move In / Move Out", from:"$280", duration:"4–6 hrs", includes:["Everything in Deep Clean","Inside all closets","Inside dishwasher","Final walkthrough","Landlord ready standard","Inspection guaranteed"] },
  { name:"Office Clean", from:"$180", duration:"2–4 hrs", includes:["Vacuuming & mopping","Desk and surface wipe","Washroom sanitize","Kitchen clean","Trash removal","After hours available"] },
  { name:"Post Construction", from:"$350", duration:"4–8 hrs", includes:["Dust removal all surfaces","Debris sweeping","Window & glass cleaning","Floor scrubbing","Vent cleaning","Final inspection"] },
  { name:"Airbnb Turnover", from:"$95", duration:"1.5–3 hrs", includes:["Full clean & sanitize","Linen swap","Bathroom restock","Kitchen reset","Trash removal","Guest ready check"] },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />
      <section className="bg-gradient-hero py-16">
        <div className="container-pub text-center">
          <div className="chip chip-blue inline-flex mb-5">Transparent Pricing</div>
          <h1 className="text-5xl font-display font-bold text-text-primary mb-5">Simple, honest pricing</h1>
          <p className="text-xl text-text-secondary max-w-lg mx-auto mb-8">No surprises. Prices depend on home size and condition — we confirm exact pricing after your first booking.</p>
          <Link href="/book" className="btn-primary text-base">Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container-pub">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s,i) => (
              <div key={s.name} className={`pub-card p-6 flex flex-col ${i===0?"ring-2 ring-brand-blue/30":""}`}>
                {i===0 && <div className="chip chip-pink inline-flex mb-4 self-start">Most Popular</div>}
                <h3 className="text-xl font-display font-bold text-text-primary mb-1">{s.name}</h3>
                <div className="mb-5">
                  <span className="text-3xl font-display font-bold text-gradient">{s.from}</span>
                  <span className="text-sm text-text-muted ml-2">· {s.duration}</span>
                </div>
                <ul className="space-y-2.5 flex-1 mb-6">
                  {s.includes.map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-brand-blue-dark shrink-0" />{item}
                    </li>
                  ))}
                </ul>
                <Link href={`/book?service=${s.name.toUpperCase().replace(/[\s\-\/]+/g,"_")}`} className="btn-primary w-full justify-center">
                  Book {s.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-sm bg-gradient-soft">
        <div className="container-pub text-center">
          <h2 className="text-3xl font-display font-bold text-text-primary mb-4">Not sure which service you need?</h2>
          <p className="text-text-secondary mb-7 max-w-sm mx-auto">Fill out a booking request and we&apos;ll recommend the right service based on your home and needs.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/book" className="btn-primary">Get a Free Quote</Link>
            <Link href="/contact" className="btn-secondary">Ask a Question</Link>
          </div>
        </div>
      </section>
      <PublicFooter />
    </div>
  );
}
