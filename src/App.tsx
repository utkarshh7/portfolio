import { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Award, 
  Users, 
  MapPin, 
  Send,
  Menu,
  X,
  Phone
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => setIsScrolled(latest > 50));
  }, [scrollY]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const resumeLink = "https://drive.google.com/file/d/14vcFJeH4DDRf2eiywh2mvCYczATv-Dl5/view?usp=sharing";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-outline-variant/60 py-3' : 'bg-transparent py-5'}`}>
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center">
        <div className="flex-1">
          <div className="text-2xl font-headline font-bold text-primary cursor-pointer w-fit">
            Utkarsh Dubey
          </div>
        </div>

        {/* Desktop Nav Links - Centered */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-on-surface font-body text-sm font-bold tracking-wide hover:text-primary transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex-1 hidden md:flex justify-end">
          <a 
            href={resumeLink}
            target="_blank"
            className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label text-sm tracking-wide transition-all hover:bg-[#a35121] active:scale-95"
          >
            Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-on-background ml-auto" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-background border-b border-outline-variant p-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-on-surface font-body text-lg font-bold"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={resumeLink}
            target="_blank"
            className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label text-sm tracking-wide text-center"
          >
            Resume
          </a>
        </motion.div>
      )}
    </header>
  );
};

const ProjectCard = ({ title, description, tech, github, live }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-10 border-b border-outline-variant/60 group hover:bg-white/30 transition-colors px-4 rounded-xl"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <h3 className="font-headline text-4xl text-on-background mb-4 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="font-body text-lg text-on-surface-variant leading-relaxed mb-6">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 items-center">
            {tech.map((item: string, idx: number) => (
              <span key={item} className="flex items-center">
                <span className="text-xs font-label uppercase tracking-widest text-primary font-semibold">{item}</span>
                {idx < tech.length - 1 && <span className="mx-2 text-stone-400">•</span>}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 min-w-fit">
          <a 
            href={github} 
            target="_blank"
            className="bg-primary text-on-primary px-6 py-5 rounded-lg font-label font-bold text-sm uppercase tracking-widest hover:bg-[#a35121] transition-all text-center flex items-center justify-center shadow-lg shadow-primary/10"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          {live && (
            <a 
              href={live} 
              target="_blank"
              className="border border-primary text-primary px-10 py-5 rounded-lg font-label font-bold text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-all text-center flex items-center justify-center gap-2"
            >
              Live <ExternalLink size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const CertCard = ({ title, issuer, description, icon: Icon, link }: any) => {
  return (
    <motion.a 
      href={link}
      target="_blank"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/40 hover:border-primary transition-all group flex flex-col items-center text-center"
    >
      <div className="w-14 h-14 rounded-full bg-surface-variant flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
        <Icon size={28} />
      </div>
      <h3 className="font-headline text-xl text-on-background mb-2">{title}</h3>
      <p className="font-label text-xs text-primary uppercase tracking-widest mb-2">{issuer}</p>
      <p className="font-body text-sm text-on-surface-variant">{description}</p>
    </motion.a>
  );
};

// --- Main App ---

export default function App() {
  const projects = [
    {
      title: "CloudVault",
      description: "A high-performance serverless cloud storage solution engineered on AWS. Utilizes Lambda functions for compute, S3 for durable storage, DynamoDB for metadata, and Cognito for secure identity management.",
      tech: ["AWS Lambda", "S3", "DynamoDB", "Cognito"],
      github: "https://github.com/utkarshh7/CloudVault",
      live: "https://cloudvault-utkarsh.vercel.app/"
    },
    {
      title: "TasteAtTips",
      description: "Comprehensive full-stack restaurant management platform. Built with a robust Node.js backend and RESTful APIs, optimizing table reservations and real-time order processing workflows.",
      tech: ["Node.js", "Express", "MongoDB"],
      github: "https://github.com/utkarshh7/TasteAtTips"
    }
  ];

  const certifications = [
    {
      title: "AWS Academy Graduate - Cloud Architecting",
      issuer: "AWS Academy",
      description: "Cloud architecture foundational excellence.",
      icon: Award,
      link: "https://www.credly.com/earner/earned/badge/410467bb-7a00-4eb0-b0af-39024cf453e2"
    },
    {
      title: "Programming using Java - Infosys Springboard",
      issuer: "Infosys",
      description: "Advanced Java programming and backend fundamentals.",
      icon: Code2,
      link: "https://drive.google.com/file/d/1I3pwu-xV-jSr8Jkh8MVrtw6Au-JH4xC4/view?usp=drive_link"
    },
    {
      title: "President - InfoTech Department",
      issuer: "Cambridge School Noida",
      description: "Leadership and community tech coordination.",
      icon: Users,
      link: "https://drive.google.com/file/d/1vF2nzJtrhE3mwXSaHvaYOqs-8jAA-ibe/view?usp=drive_link"
    }
  ];

  return (
    <div className="min-h-screen selection:bg-primary/20 selection:text-primary">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex justify-center items-center order-2 lg:order-1"
          >
            <div className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center">
              <img 
                src="https://lh3.googleusercontent.com/aida/ADBb0uhX4tsPnEC4fGx1GiNMrWZBMorppQrE9se-UbSG5P_uR6iSAk1EKVgpPe3mLu2v-t8U69SqSbz9KPUehn-b7pzJSuCO8SbeQut7P608WFBNdOZrrwewX0IOMvgJOHt1_KpEHfGkxeyfFGhlzoLNWMV_8YvzYEpCTks10x1ngTcR6Tja4AUCiRfkucf11wiQH-u9Bml5X-5ssONmyF8Ye5YA_cIIgDANXjozZwX6oTj5j4YC7SxUerfeXfbGtsOcefX_ri7tNftD" 
                alt="Utkarsh Dubey Avatar" 
                className="w-full h-auto max-h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <p className="font-label text-primary tracking-[0.2em] uppercase text-xs mb-4">Backend Architect</p>
            <h1 className="text-6xl md:text-8xl font-headline text-on-background mb-6 leading-tight">
              Hello, I'm <span className="serif-italic">Utkarsh</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mb-10">
              Backend Developer experienced in building scalable, secure cloud-native applications using <span className="text-primary font-medium">AWS</span> and modern backend technologies. I transform complex problems into elegant, efficient systems.
            </p>
            <div className="flex gap-4">
              <a 
                href="#contact" 
                className="flex-1 sm:flex-none bg-primary text-on-primary px-8 py-4 rounded-lg font-label font-bold text-sm uppercase tracking-widest transition-all hover:bg-[#a35121] shadow-lg shadow-primary/10 text-center"
              >
                Contact Me
              </a>
              <a 
                href="https://www.linkedin.com/in/utkarshdubey15/" 
                target="_blank"
                className="border border-outline text-on-surface px-6 py-4 rounded-lg font-label font-bold text-sm uppercase tracking-widest transition-all hover:bg-surface-variant flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-headline text-5xl text-on-background mb-4">Selected <span className="serif-italic">Works</span></h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
            <p className="font-body text-on-surface-variant max-w-md">
              A curation of backend architectural solutions focusing on scalability, security, and performance.
            </p>
          </div>
          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-headline text-5xl text-on-background mb-4">Certifications</h2>
            <p className="font-body text-on-surface-variant max-w-lg mx-auto">
              Commitment to continuous learning and industry-standard best practices in cloud architecture and backend security.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <CertCard key={cert.title} {...cert} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <h2 className="font-headline text-5xl text-on-background mb-8 leading-tight">
                Let's build something <br/><span className="serif-italic">extraordinary</span> together.
              </h2>
              <p className="font-body text-lg text-on-surface-variant mb-12">
                I'm currently available for freelance projects or full-time backend roles. Reach out and let's discuss your next architectural challenge.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary">
                    <Mail size={20} />
                  </div>
                  <span className="font-label text-on-background text-sm">utkarshdubey2016@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary">
                    <Phone size={20} />
                  </div>
                  <span className="font-label text-on-background text-sm">+91 9818691726</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary">
                    <MapPin size={20} />
                  </div>
                  <span className="font-label text-on-background text-sm">Noida, India / Remote</span>
                </div>
              </div>
              
              <div className="flex gap-4 mt-12">
                <a 
                  href="https://github.com/utkarshh7" 
                  target="_blank"
                  className="flex-1 h-16 rounded-xl border border-outline-variant hover:border-primary transition-all flex items-center justify-center bg-white text-on-surface-variant hover:text-primary shadow-sm"
                  aria-label="GitHub"
                >
                  <Github size={32} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/utkarshdubey15/" 
                  target="_blank"
                  className="flex-1 h-16 rounded-xl border border-outline-variant hover:border-primary transition-all flex items-center justify-center bg-white text-on-surface-variant hover:text-primary shadow-sm"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={32} />
                </a>
              </div>

              {/* Map Box */}
              <div className="mt-12 rounded-2xl overflow-hidden border border-outline-variant h-64 grayscale hover:grayscale-0 transition-all duration-500 shadow-inner">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112115.015556221!2d77.3063101!3d28.5818919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5a43173357b%3A0x37ffce30cdd8fd36!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1711970000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-surface-container-lowest p-8 md:p-10 rounded-2xl shadow-sm border border-outline-variant/40"
            >
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body"
                  />
                </div>
                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@company.com"
                    className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body"
                  />
                </div>
                <div>
                  <label className="block font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Message</label>
                  <textarea 
                    rows={5} 
                    placeholder="Tell me about your project..."
                    className="w-full bg-background border border-outline-variant rounded-lg px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-primary text-on-primary py-4 rounded-lg font-label font-bold text-sm uppercase tracking-widest hover:bg-[#a35121] transition-all flex items-center justify-center gap-2"
                >
                  Send Message <Send size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-outline-variant/40 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="font-body text-xs uppercase tracking-widest text-on-surface-variant text-center">
            © {new Date().getFullYear()} Utkarsh Dubey
          </p>
          <div className="flex gap-8">
            <a href="https://github.com/utkarshh7" target="_blank" className="text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-label">GitHub</a>
            <a href="https://www.linkedin.com/in/utkarshdubey15/" target="_blank" className="text-on-surface-variant hover:text-primary transition-colors text-xs uppercase tracking-widest font-label">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
