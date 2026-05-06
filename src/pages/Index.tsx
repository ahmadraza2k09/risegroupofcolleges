import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Phone, Mail, MapPin, GraduationCap, Award, Users, BookOpen,
  ShieldCheck, Sparkles, Building2, Facebook, Instagram, Menu, X,
} from "lucide-react";
import logo from "@/assets/brand/logo.png";
import aboutLogo from "@/assets/brand/about-logo.png";
import imgAwareness from "@/assets/events/awareness-sessions.png";
import imgCA from "@/assets/events/ca-orientation.png";
import imgBSCS from "@/assets/events/bscs-orientation.png";
import imgLibrary from "@/assets/events/library.png";
import imgPTM from "@/assets/events/parents-teacher-meeting.png";
import imgFamily from "@/assets/events/rise-family.png";
import imgSafety from "@/assets/events/safety-awareness.png";
import imgIslamic from "@/assets/events/islamic-banking.png";
import imgMurree from "@/assets/events/trip-murree.png";

const HERO_IMAGES = [imgFamily, imgLibrary, imgBSCS, imgMurree];

const EVENTS = [
  { src: imgAwareness, title: "Awareness Sessions", category: "Seminars" },
  { src: imgCA, title: "CA Orientation Session", category: "Orientation" },
  { src: imgBSCS, title: "Orientation Ceremony of BSCS Students", category: "Orientation" },
  { src: imgLibrary, title: "Our Libraries", category: "Campus" },
  { src: imgPTM, title: "Parents Teacher Meeting", category: "Community" },
  { src: imgFamily, title: "Rise Family", category: "Community" },
  { src: imgSafety, title: "Safety Awareness Seminar", category: "Seminars" },
  { src: imgIslamic, title: "Seminar on Islamic Banking", category: "Seminars" },
  { src: imgMurree, title: "Trip to Murree", category: "Trips" },
];

const PROGRAMS = [
  { code: "FSc", name: "Pre Medical and Pre Engineering" },
  { code: "ICS", name: "Computer Science Intermediate" },
  { code: "ICom", name: "Intermediate of Commerce" },
  { code: "FA IT", name: "Faculty of Arts with IT" },
  { code: "ADP Arts", name: "Associate Degree in Arts" },
  { code: "ADP Commerce", name: "Associate Degree in Commerce" },
  { code: "ADP Science", name: "Associate Degree in Science" },
  { code: "CA", name: "Chartered Accountancy" },
  { code: "BBA", name: "Bachelor of Business Administration" },
  { code: "BS English", name: "Bachelor of English" },
  { code: "BS CS", name: "Bachelor of Computer Science" },
  { code: "MCom", name: "Master of Commerce" },
  { code: "BCom", name: "Bachelor of Commerce" },
];

const FEATURES = [
  { icon: GraduationCap, title: "Admission Open", desc: "Enroll today and secure your seat for the new academic session." },
  { icon: Users, title: "Expert Faculty", desc: "Highly qualified educators committed to student success." },
  { icon: BookOpen, title: "Daily Test System", desc: "Consistent assessment to track and elevate performance." },
  { icon: Building2, title: "Separate Campuses", desc: "Dedicated campuses for boys and girls with full facilities." },
  { icon: Award, title: "Scholarships Available", desc: "Merit and need based scholarship opportunities." },
  { icon: Sparkles, title: "Academic Excellence", desc: "A proud tradition of top results and university success." },
  { icon: ShieldCheck, title: "Variety of Degrees", desc: "Intermediate, Associate, Bachelor and Master programs." },
];

const FACULTY = [
  { name: "Mr Aamir Sajjad Chawan", role: "Director" },
  { name: "Mr Shahid Noor", role: "Registrar" },
  { name: "Mr Fayyaz", role: "Lecturer Economics and Business" },
  { name: "Mr Roshan Shah Khagga", role: "Admission Officer" },
  { name: "Mr Zahid Noor", role: "Accountant" },
  { name: "Mr Shahzaib Shah", role: "Accountant" },
  { name: "Mr Amjad Bajwa", role: "Director Marketing" },
  { name: "Mr Akram", role: "Admin" },
  { name: "Mr Waqas", role: "Examination Department" },
  { name: "Mr Javed", role: "L A" },
  { name: "Mr Wasim Akram", role: "Faculty Member" },
];

const NAV = [
  { id: "about", label: "About" },
  { id: "programs", label: "Programs" },
  { id: "features", label: "Features" },
  { id: "campus", label: "Campuses" },
  { id: "faculty", label: "Faculty" },
  { id: "events", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "admissions", label: "Admissions" },
  { id: "contact", label: "Contact" },
];

const Index = () => {
  const [slide, setSlide] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<string>("All");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", program: "", message: "" });

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_IMAGES.length), 5000);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => { clearInterval(t); window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  const categories = ["All", ...Array.from(new Set(EVENTS.map((e) => e.category)))];
  const filteredEvents = filter === "All" ? EVENTS : EVENTS.filter((e) => e.category === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please provide your name and phone number");
      return;
    }
    toast.success("Thank you. Our admissions team will contact you shortly.");
    setForm({ name: "", phone: "", program: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "bg-background/95 backdrop-blur shadow-sm" : "bg-transparent"}`}>
        <div className="container-pro flex items-center justify-between py-3">
          <a href="#home" className="flex items-center gap-3">
            <img src={logo} alt="Rise Group of Colleges Multan logo" className="h-12 w-auto" />
            <div className="hidden sm:block leading-tight">
              <div className={`font-bold text-sm ${scrolled ? "text-foreground" : "text-white"}`}>Rise Group of Colleges</div>
              <div className={`text-[10px] uppercase tracking-widest ${scrolled ? "text-muted-foreground" : "text-white/80"}`}>Multan</div>
            </div>
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className={`text-sm font-medium transition-colors hover:text-brandred ${scrolled ? "text-foreground" : "text-white"}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#admissions" className="hidden lg:inline-flex">
            <Button variant="brand">Apply Now</Button>
          </a>
          <button className={`lg:hidden ${scrolled ? "text-foreground" : "text-white"}`} onClick={() => setNavOpen(!navOpen)} aria-label="Toggle menu">
            {navOpen ? <X /> : <Menu />}
          </button>
        </div>
        {navOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <div className="container-pro py-4 flex flex-col gap-3">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setNavOpen(false)} className="text-sm font-medium py-2 text-foreground">
                  {n.label}
                </a>
              ))}
              <a href="#admissions" onClick={() => setNavOpen(false)}>
                <Button variant="brand" className="w-full">Apply Now</Button>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative h-screen min-h-[640px] w-full overflow-hidden">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${i === slide ? "opacity-100" : "opacity-0"}`}
          >
            <img src={src} alt="" className="w-full h-full object-cover hero-slide" />
          </div>
        ))}
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="relative z-10 h-full container-pro flex flex-col justify-center text-primary-foreground">
          <div className="max-w-3xl fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/30 rounded-full text-xs uppercase tracking-[0.25em] mb-6 text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-brandred" />
              Affiliated with Bahauddin Zakariya University Multan
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 text-balance">
              Rise Group of Colleges <span className="text-gold">Multan</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-2 font-light">Education With Values</p>
            <p className="text-base text-white/70 mb-10 max-w-xl">
              A premier institution shaping bright and talented students through academic excellence, discipline, and a culture of integrity.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#admissions"><Button variant="brand" size="lg">Admission Open</Button></a>
              <a href="#contact"><Button variant="outlineLight" size="lg">Contact Now</Button></a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {HERO_IMAGES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className={`h-1 rounded-full transition-all ${i === slide ? "w-10 bg-brandred" : "w-6 bg-white/40"}`} aria-label={`Slide ${i+1}`} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-background">
        <div className="container-pro grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <SectionLabel>About the Institution</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">A legacy of academic excellence and values</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Rise Group of Colleges Multan is committed to nurturing a diverse environment of bright and talented students. Our institution stands on a foundation of discipline, integrity, and academic rigor, preparing young minds to lead with confidence in a rapidly evolving world.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From Intermediate to Bachelor and Master programs, we offer a complete academic pathway. Our experienced faculty, modern facilities, and dedicated support systems make Rise the trusted choice for thousands of families across Multan and beyond.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[{n:"15+", l:"Years of Service"}, {n:"5000+", l:"Alumni"}, {n:"13", l:"Programs Offered"}].map((s) => (
                <div key={s.l} className="border-l-2 border-brandred pl-4">
                  <div className="text-3xl font-bold">{s.n}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative reveal">
            <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-[var(--shadow-elegant)] bg-white flex items-center justify-center p-10">
              <img src={aboutLogo} alt="Rise Group of Colleges Multan logo" className="w-full h-full object-contain float-slow" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 max-w-[220px] hidden md:block shadow-[var(--shadow-elegant)]">
              <div className="text-gold text-xs uppercase tracking-widest mb-2">Our Mission</div>
              <div className="text-sm leading-relaxed">Education With Values for a brighter tomorrow.</div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="py-24 bg-muted">
        <div className="container-pro">
          <div className="max-w-2xl mb-14">
            <SectionLabel>Academic Programs</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Programs designed for every ambition</h2>
            <p className="text-muted-foreground">Choose from a comprehensive range of intermediate, associate, bachelor and master level programs.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PROGRAMS.map((p, i) => (
              <Card key={p.code} className="group p-6 border-border hover:border-brandred bg-background lift reveal" style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold tracking-widest text-brandred uppercase">{p.code}</span>
                  <GraduationCap className="h-5 w-5 text-neutral group-hover:text-gold group-hover:rotate-6 transition-all" />
                </div>
                <div className="font-semibold text-base">{p.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 bg-background">
        <div className="container-pro">
          <div className="max-w-2xl mb-14">
            <SectionLabel>Why Choose Rise</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Built on a foundation of excellence</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <Card key={f.title} className="p-8 border-border lift reveal group" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <div className="h-12 w-12 mb-5 rounded-sm bg-primary text-primary-foreground flex items-center justify-center group-hover:bg-brandred group-hover:scale-110 transition-all">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPUS */}
      <section id="campus" className="py-24 bg-primary text-primary-foreground">
        <div className="container-pro">
          <div className="max-w-2xl mb-14">
            <SectionLabel light>Our Campuses</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Dedicated wings for boys and girls</h2>
            <p className="text-white/70">Two fully equipped campuses providing a focused academic environment.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <CampusCard
              title="Boys Wing"
              phones={["0307 7611527", "0305 6572008"]}
              address="151 Shamsabad Colony, Eidgah Chowk, Multan, Punjab, Pakistan"
            />
            <CampusCard
              title="Girls Wing"
              phones={["0302 9217487", "061 6302222"]}
              address="Khanewal Road, Near Sayal Hotel, Multan, Punjab, Pakistan"
            />
          </div>
        </div>
      </section>

      {/* FACULTY */}
      <section id="faculty" className="py-24 bg-background">
        <div className="container-pro">
          <div className="max-w-2xl mb-14">
            <SectionLabel>Our Faculty</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">A team committed to student success</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {FACULTY.map((m, i) => (
              <Card key={m.name} className={`p-6 border-border hover:border-gold lift reveal ${i === 0 ? "sm:col-span-2 lg:col-span-2 bg-primary text-primary-foreground border-primary" : ""}`} style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                <div className={`h-16 w-16 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110 ${i === 0 ? "bg-gold text-primary" : "bg-muted text-foreground"}`}>
                  <span className="font-bold text-lg">{m.name.split(" ").slice(1, 3).map((s) => s[0]).join("")}</span>
                </div>
                <div className="font-bold text-base">{m.name}</div>
                <div className={`text-xs uppercase tracking-widest mt-1 ${i === 0 ? "text-gold" : "text-brandred"}`}>{m.role}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section id="events" className="py-24 bg-muted">
        <div className="container-pro">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <SectionLabel>Events & Activities</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-bold">Moments from our campus life</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-semibold border transition-all ${
                    filter === c ? "bg-primary text-primary-foreground border-primary" : "bg-background text-foreground border-border hover:border-primary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEvents.map((e) => (
              <button
                key={e.title}
                onClick={() => setLightbox(e.src)}
                className="group relative overflow-hidden bg-primary aspect-[4/3] text-left"
              >
                <img src={e.src} alt={e.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-gold mb-1">{e.category}</div>
                  <div className="font-semibold">{e.title}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-24 bg-background">
        <div className="container-pro">
          <div className="max-w-2xl mb-12">
            <SectionLabel>Photo Gallery</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold">A glimpse into Rise</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {EVENTS.map((e, i) => (
              <button
                key={i}
                onClick={() => setLightbox(e.src)}
                className={`relative overflow-hidden bg-muted ${i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"}`}
              >
                <img src={e.src} alt={e.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSIONS */}
      <section id="admissions" className="py-24 bg-muted">
        <div className="container-pro grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel>Admissions Open</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Begin your journey with Rise today</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Submit your inquiry and our admissions team will reach out to guide you through the application process, eligibility, and scholarship opportunities.
            </p>
            <div className="space-y-3">
              {["Merit and need based scholarships", "Personalised academic counselling", "Easy installment plans"].map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <div className="h-1.5 w-1.5 bg-brandred" />
                  <span className="text-sm font-medium">{p}</span>
                </div>
              ))}
            </div>
          </div>
          <Card className="p-8 border-border bg-background shadow-[var(--shadow-elegant)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Full Name</label>
                <Input value={form.name} maxLength={80} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2" placeholder="Your full name" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Phone</label>
                <Input value={form.phone} maxLength={20} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2" placeholder="03XX XXXXXXX" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Program of Interest</label>
                <Input value={form.program} maxLength={50} onChange={(e) => setForm({ ...form, program: e.target.value })} className="mt-2" placeholder="e.g. BS Computer Science" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Message</label>
                <Textarea value={form.message} maxLength={500} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2 min-h-[100px]" placeholder="Your message" />
              </div>
              <Button type="submit" variant="brand" className="w-full" size="lg">Submit Inquiry</Button>
            </form>
          </Card>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground">
        <div className="container-pro">
          <div className="max-w-2xl mb-14">
            <SectionLabel light>Get in Touch</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-bold text-white">We are here to help</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <ContactItem icon={Phone} title="Boys Wing">
              <a href="tel:03077611527" className="block hover:text-gold">0307 7611527</a>
              <a href="tel:03056572008" className="block hover:text-gold">0305 6572008</a>
            </ContactItem>
            <ContactItem icon={Phone} title="Girls Wing">
              <a href="tel:03029217487" className="block hover:text-gold">0302 9217487</a>
              <a href="tel:0616302222" className="block hover:text-gold">061 6302222</a>
            </ContactItem>
            <ContactItem icon={Mail} title="Email & Social">
              <a href="mailto:risecollegemultan@gmail.com" className="block hover:text-gold break-all">risecollegemultan@gmail.com</a>
              <div className="flex gap-3 mt-3">
                <a href="https://facebook.com/RiseGroupofCollegesMultan" target="_blank" rel="noreferrer" className="h-9 w-9 border border-white/30 flex items-center justify-center hover:bg-brandred hover:border-brandred transition-colors"><Facebook className="h-4 w-4" /></a>
                <a href="https://instagram.com/rise.multan.official" target="_blank" rel="noreferrer" className="h-9 w-9 border border-white/30 flex items-center justify-center hover:bg-brandred hover:border-brandred transition-colors"><Instagram className="h-4 w-4" /></a>
              </div>
            </ContactItem>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <MapEmbed
              title="Boys Wing Campus"
              query="151 Shamsabad Colony Eidgah Chowk Multan"
            />
            <MapEmbed
              title="Girls Wing Campus"
              query="Khanewal Road Sayal Hotel Multan"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white/70 py-10 border-t border-white/10">
        <div className="container-pro flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-10 w-auto bg-white p-1 rounded-sm" />
            <div className="text-sm">
              <div className="font-semibold text-white">Rise Group of Colleges Multan</div>
              <div className="text-xs">Education With Values</div>
            </div>
          </div>
          <div className="text-xs">© {new Date().getFullYear()} Rise Group of Colleges Multan. All rights reserved.</div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      <Dialog open={!!lightbox} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-5xl p-0 bg-black border-none">
          {lightbox && <img src={lightbox} alt="" className="w-full h-auto" />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const SectionLabel = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <div className={`flex items-center gap-3 mb-4 text-xs uppercase tracking-[0.3em] font-semibold ${light ? "text-gold" : "text-brandred"}`}>
    <span className={`h-px w-8 ${light ? "bg-gold" : "bg-brandred"}`} />
    {children}
  </div>
);

const CampusCard = ({ title, phones, address }: { title: string; phones: string[]; address: string }) => (
  <Card className="p-8 bg-white/5 border-white/10 backdrop-blur">
    <div className="flex items-center gap-3 mb-6">
      <div className="h-10 w-10 bg-brandred flex items-center justify-center">
        <Building2 className="h-5 w-5 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-white">{title}</h3>
    </div>
    <div className="space-y-4 text-white/80">
      <div className="flex items-start gap-3">
        <Phone className="h-4 w-4 mt-1 text-gold flex-shrink-0" />
        <div className="text-sm">
          {phones.map((p) => <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block hover:text-white">{p}</a>)}
        </div>
      </div>
      <div className="flex items-start gap-3">
        <MapPin className="h-4 w-4 mt-1 text-gold flex-shrink-0" />
        <div className="text-sm leading-relaxed">{address}</div>
      </div>
    </div>
  </Card>
);

const ContactItem = ({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center gap-3 mb-4">
      <div className="h-10 w-10 border border-white/30 flex items-center justify-center"><Icon className="h-4 w-4 text-gold" /></div>
      <h4 className="font-semibold text-white">{title}</h4>
    </div>
    <div className="text-sm text-white/80 space-y-1">{children}</div>
  </div>
);

const MapEmbed = ({ title, query }: { title: string; query: string }) => (
  <div className="border border-white/10 overflow-hidden">
    <div className="px-5 py-3 bg-white/5 text-sm font-semibold text-white">{title}</div>
    <iframe
      title={title}
      src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
      className="w-full h-64 border-0"
      loading="lazy"
    />
  </div>
);

export default Index;
