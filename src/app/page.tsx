"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Briefcase, Home as HomeIcon, User, FileText, Phone, X } from "lucide-react";
import { useState } from "react";
import { ScrollProgress, TextRevealByWord } from "@/components/ScrollEffects";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { InteractiveServicesGrid } from "@/components/ui/interactive-services";

const testimonials = [
  { text: "Nizod transformed our business with a stunning web application.", name: "Sarah J.", role: "CEO, TechFlow" },
  { text: "Incredible attention to detail and a seamless development process from start to finish.", name: "Michael R.", role: "Founder, InnovateX" },
  { text: "The team delivered the project ahead of schedule with flawless execution.", name: "David L.", role: "Director, CloudSync" }
];

const portfolioCategories = ['All', 'E-commerce', 'SaaS', 'Marketing'];

const portfolioItems = [
  { title: "FinTech Dashboard", category: "SaaS", img: "1460925895917-afdab827c52f", caseStudy: "Streamlined financial workflows for enterprise clients, increasing reporting speed by 400%." },
  { title: "Retail E-Commerce App", category: "E-commerce", img: "1510127034890-ba27508e9f1c", caseStudy: "Achieved a 40% increase in mobile conversions post-launch with highly optimized checkout." },
  { title: "Marketing Analytics Tool", category: "SaaS", img: "1498050108023-c5249f4df085", caseStudy: "Real-time data visualization processing millions of events per minute." },
  { title: "Global Logistics Platform", category: "Marketing", img: "1551288049-bebda4e38f71", caseStudy: "Unified tracking system improving delivery transparency across 12 countries." },
  { title: "Digital Healthcare Portal", category: "SaaS", img: "1555421689-491a97ff2040", caseStudy: "Secure patient record management fulfilling stringent HIPAA compliance standards." },
  { title: "Boutique Fashion Store", category: "E-commerce", img: "1522542550221-31fd19575a2d", caseStudy: "Immersive brand experience driving massive user engagement and time-on-site." }
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activePortfolioCategory, setActivePortfolioCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const openModal = (title: string) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'Home', url: '#home', icon: HomeIcon },
    { name: 'Services', url: '#services', icon: Briefcase },
    { name: 'Portfolio', url: '#portfolio', icon: User },
    { name: 'Blog', url: '#blogs', icon: FileText },
    { name: 'Contact', url: '#contact', icon: Phone }
  ];

  return (
    <main className="w-full font-sans text-slate-900 bg-slate-50/50 selection:bg-blue-600/30 relative overflow-x-hidden">
      <NavBar items={navItems} />
      <ScrollProgress className="bg-blue-600" />
      {/* Global Minimal Liquid Glass Blobs */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-60">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-300/30 blur-[140px]" />
        <div className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-purple-300/20 blur-[130px]" />
        <div className="absolute bottom-[-20%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-cyan-300/20 blur-[120px]" />
      </div>

      {/* Interactive Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/60 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/95 backdrop-blur-3xl border border-white/50 rounded-3xl p-10 max-w-lg w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] relative"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-9 h-9 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center transition text-slate-400 hover:text-slate-600 shadow-sm border border-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-[1.7rem] font-display font-bold mb-4 pr-10 text-slate-900 leading-tight tracking-tight">
                {modalTitle.includes('|^^|') ? modalTitle.split('|^^|')[0] : modalTitle}
              </h3>
              <p className="text-slate-500 mb-8 whitespace-pre-wrap leading-relaxed text-[0.95rem]">
                {modalTitle.includes('|^^|')
                  ? modalTitle.split('|^^|')[1]
                  : modalTitle.startsWith('Case Study: ')
                    ? `${modalTitle.replace('Case Study: ', '')}\n\nOur specialized methodology combined agile project delivery with strict adherence to industry benchmarks, ensuring scalable growth and direct measurable outcomes.`
                    : modalTitle === 'Service: Website Development' ? "From corporate landing pages to complex e-commerce platforms, we build robust, high-performance web applications tailored to your business goals. We utilize modern stacks like React, Next.js, and Node.js to ensure lightning-fast speeds and secure architecture."
                      : modalTitle === 'Service: App Development' ? "We architect native and cross-platform mobile experiences that captivate users. Whether it's iOS or Android, our apps are built for performance, seamless UX, and offline capabilities, keeping your audience engaged on the go."
                        : modalTitle === 'Service: UI/UX Design' ? "Great software starts with great design. Our UX research and UI design team crafts intuitive, accessible, and stunning interfaces that reduce friction and increase user adoption, ensuring your product is a joy to use."
                          : modalTitle === 'Service: Project Management' ? "We take the chaos out of software delivery. Our agile project managers act as your dedicated liaison, maintaining strict timelines, transparent budget tracking, and continuous communication so you always know your project&apos;s state."
                            : modalTitle === 'Service: HR Management' ? "Scaling top-tier tech talent is challenging. Our specialized technical HR solutions cover precise talent acquisition, cultural alignment, and rapid onboarding processes to build elite engineering teams for your enterprise."
                              : modalTitle.includes('Blog Post')
                                ? "Dive into our latest insights and industry trends. Our experts share actionable strategies, technical deep-dives, and thought leadership to keep you ahead of the digital curve."
                                : "Please provide your details below and our technical consulting team will reach out within 24 hours to schedule a comprehensive discovery call regarding your vision."
                }
              </p>
              <button onClick={() => setIsModalOpen(false)} className="w-full py-3.5 bg-blue-600 text-white rounded-2xl font-bold tracking-wide hover:bg-blue-700 transition shadow-lg shadow-blue-600/30">
                Acknowledge
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Navigation Header */}
      <header className="w-full px-6 md:px-24 py-5 flex items-center justify-between bg-white/40 backdrop-blur-2xl border-b border-white/40 z-50 sticky top-0 shadow-sm">
        <div className="text-2xl font-display font-bold flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-black">N</span>
          Nizod
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:block px-6 py-2.5 rounded-full text-sm font-semibold border border-gray-200 hover:bg-gray-50 transition text-slate-800"
          >
            Let&apos;s Talk
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-24 px-6 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="w-full md:w-1/2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-[5rem] font-display font-bold leading-tight text-slate-900 mb-2">
              Nizod
            </h1>
            <p className="text-xl md:text-3xl font-display text-slate-500 mb-8 font-medium">
              IT Solutions Agency
            </p>
            <p className="text-slate-500 mb-10 max-w-md leading-relaxed text-lg">
              We empower businesses with cutting-edge software solutions, transforming complex ideas into seamless digital experiences.
            </p>
            <div className="flex flex-wrap gap-4">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                onClick={() => scrollTo('contact')}
                className="bg-blue-600 text-white font-bold px-8 py-4 flex items-center gap-2 transition"
              >
                Start Project <ArrowRight className="w-4 h-4 ml-1" />
              </HoverBorderGradient>
              <button
                onClick={() => scrollTo('portfolio')}
                className="bg-white border-2 border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50 px-8 py-4 rounded-full font-bold transition flex items-center gap-2"
              >
                Our Work
              </button>
            </div>
          </motion.div>
        </div>
        <div className="w-full md:w-1/2 relative z-10 pt-10 md:pt-0">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative h-full">
            {/* Main Image */}
            <div className="w-full aspect-[4/3] rounded-[2rem] overflow-hidden relative shadow-2xl border-4 border-white">
              <div className="absolute inset-0 bg-slate-200">
                <Image fill src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" alt="Team working" className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
              </div>
            </div>

            {/* Float 1: Projects Managed (Bottom Right Solid) */}
            <div className="absolute -bottom-8 md:-bottom-12 -right-4 md:-right-8 bg-slate-300/90 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-xl flex flex-col z-20 hover:-translate-y-2 transition duration-300 text-slate-900 border border-white/40">
              <p className="font-display font-black text-4xl md:text-5xl leading-none tracking-tight">120+</p>
              <p className="text-sm font-bold mt-2 leading-tight">Projects<br />Managed</p>
            </div>

            {/* Float 2: Happy Clients (Bottom Left Glass) */}
            <div className="absolute bottom-8 md:bottom-12 -left-8 md:-left-16 bg-white/40 backdrop-blur-2xl px-6 py-4 rounded-full shadow-2xl border border-white/60 flex items-center justify-center transform hover:scale-105 transition duration-300 z-30">
              <p className="font-bold text-slate-800 text-lg md:text-xl shadow-sm tracking-tight whitespace-nowrap">80+ Happy Client</p>
            </div>

            {/* Float 3: Years of Experience (Top Right Glass) */}
            <div className="absolute top-4 md:top-8 right-8 md:right-16 bg-black/40 backdrop-blur-xl px-6 py-4 rounded-3xl shadow-2xl border border-white/20 flex flex-col items-center justify-center transform hover:-translate-y-1 transition duration-300 z-30 text-white">
              <p className="font-display font-bold text-2xl md:text-3xl shadow-sm">6+ Years</p>
              <p className="text-xs font-semibold tracking-wide mt-1">of Experience</p>
            </div>

            {/* 3D Graphic 1: Blue Cylinder (Bottom Left) */}
            <div className="absolute -bottom-16 -left-20 md:-bottom-24 md:-left-32 w-32 h-48 md:w-48 md:h-64 z-0 animate-pulse hidden md:block" style={{ animationDuration: '4s' }}>
              <div className="w-full h-full relative" style={{ perspective: '800px' }}>
                <div className="absolute inset-0 rounded-full border-[16px] md:border-[24px] border-blue-600 bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-900 transform rotate-45 skew-x-12 shadow-2xl border-t-white/50 border-l-white/30" />
              </div>
            </div>

            {/* 3D Graphic 2: Cyber Diamond (Top Right) */}
            <div className="absolute top-4 -right-12 md:top-8 md:-right-20 w-20 h-28 md:w-28 md:h-40 z-40 hidden md:block">
              <div className="w-full h-full relative animate-bounce" style={{ animationDuration: '6s' }}>
                <div className="w-0 h-0 border-l-[35px] md:border-l-[45px] border-l-transparent border-r-[35px] md:border-r-[45px] border-r-transparent border-b-[50px] md:border-b-[80px] border-b-blue-800 drop-shadow-2xl absolute top-0" />
                <div className="w-0 h-0 border-l-[35px] md:border-l-[45px] border-l-transparent border-r-[35px] md:border-r-[45px] border-r-transparent border-t-[50px] md:border-t-[80px] border-t-blue-600 drop-shadow-2xl absolute bottom-0" />
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/30 to-blue-300/30 mix-blend-overlay clip-diamond" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* Text Reveal Section */}
      <section className="relative bg-white border-y border-slate-200/50 z-20 shadow-sm">
        <TextRevealByWord text="We architect performant software solutions that empower forward-thinking brands to achieve measurable, scalable growth in the modern digital landscape." />
      </section>

      {/* Timeline / About Section */}
      <section className="py-32 px-6 md:px-24 max-w-7xl mx-auto relative z-10 overflow-hidden">

        {/* Subtle Cyber Diamond Vibe - Top Left */}
        <div className="absolute -top-32 -left-20 w-64 h-96 z-[-1] opacity-20 blur-3xl pointer-events-none transform -rotate-12">
          <div className="w-full h-full relative">
            <div className="w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-b-[120px] border-b-blue-600 absolute top-0" />
            <div className="w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-t-[120px] border-t-purple-500 absolute bottom-0" />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-24 lg:gap-32 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 border-b-4 border-blue-600 inline-block pb-2 tracking-tight">Lorem Ipsum is simply</h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed font-medium">
              We are a team of experts committed to advancing businesses and startups with specialized development and management skills.
            </p>
            <p className="text-slate-400 text-[0.95rem] mb-10 leading-relaxed font-light">
              Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            <button onClick={() => scrollTo('contact')} className="bg-navy-900 text-white hover:bg-navy-800 px-8 py-3.5 rounded-full font-bold transition shadow-xl border border-navy-800">
              Get Started
            </button>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col-reverse gap-24 relative mt-16 lg:mt-0">
            {/* SVG Connecting Curved Line */}
            <div className="absolute left-6 top-8 bottom-8 border-l-2 border-slate-300 md:hidden" />
            <svg className="absolute left-8 -top-10 w-[120%] h-[130%] -z-10 hidden md:block" viewBox="0 0 400 300" fill="none" preserveAspectRatio="none">
              <path d="M 0,260 C 40,260 60,150 100,150 C 140,150 160,40 220,40 C 260,40 280,40 300,40" stroke="#cbd5e1" strokeWidth="2" fill="none" />
            </svg>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex gap-6 items-start relative select-none group">
              <div className="text-7xl md:text-8xl font-black text-slate-200/60 mt-[-15px] group-hover:text-blue-100 transition duration-500">1</div>
              <div className="pt-2">
                <div className="w-3 h-3 rounded-full bg-slate-800 absolute left-[-29px] md:left-2 top-6 shadow-md border-[3px] box-content border-white group-hover:bg-blue-600 transition duration-500" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">2021 Founded</h4>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[250px]">Lorem ipsum is simply dummy text of the printing and typesetting industry</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="flex gap-6 items-start relative select-none md:ml-28 group">
              <div className="text-7xl md:text-8xl font-black text-slate-200/60 mt-[-15px] group-hover:text-blue-100 transition duration-500">2</div>
              <div className="pt-2">
                <div className="w-3 h-3 rounded-full bg-slate-800 absolute left-[-29px] md:left-0 top-6 shadow-md border-[3px] box-content border-white group-hover:bg-blue-600 transition duration-500" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">80+ Companies</h4>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[250px]">Lorem ipsum is simply dummy text of the printing and typesetting industry</p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex gap-6 items-start relative select-none md:ml-48 group">
              <div className="text-7xl md:text-8xl font-black text-slate-200/60 mt-[-15px] group-hover:text-blue-100 transition duration-500">3</div>
              <div className="pt-2">
                <div className="w-3 h-3 rounded-full bg-slate-800 absolute left-[-29px] md:left-2 top-6 shadow-md border-[3px] box-content border-white group-hover:bg-blue-600 transition duration-500" />
                <h4 className="text-xl font-bold text-slate-900 mb-2">120+ Professionals</h4>
                <p className="text-slate-500 text-sm leading-relaxed max-w-[250px]">Lorem ipsum is simply dummy text of the printing and typesetting industry</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Zigzag Section */}
      <section className="py-24 px-6 md:px-24 bg-white/40 backdrop-blur-2xl border-y border-white/50 relative">
        <div className="max-w-6xl mx-auto flex flex-col gap-24 relative z-10">
          {/* Stat 1: 120+ Projects */}
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="w-full md:w-1/2 aspect-video md:aspect-[4/3] bg-white/60 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center text-slate-500 shadow-xl border border-white/80 overflow-hidden relative group">
              <Image fill src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80" alt="Projects" className="object-cover group-hover:scale-105 transition duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-6xl md:text-[5rem] font-display font-bold text-navy-900 mb-4 tracking-tight drop-shadow-sm">120+</h3>
              <p className="text-3xl font-display text-blue-600 font-bold">Projects</p>
            </div>
          </div>

          {/* Stat 2: 80+ Clients */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-24">
            <div className="w-full md:w-1/2 aspect-video md:aspect-[4/3] bg-white/60 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center text-slate-500 shadow-xl border border-white/80 overflow-hidden relative group">
              <Image fill src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80" alt="Clients" className="object-cover group-hover:scale-105 transition duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="w-full md:w-1/2 text-left md:text-right">
              <h3 className="text-6xl md:text-[5rem] font-display font-bold text-navy-900 mb-4 tracking-tight drop-shadow-sm">80+</h3>
              <p className="text-3xl font-display text-blue-600 font-bold">Clients</p>
            </div>
          </div>

          {/* Stat 3: 25+ Employees */}
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="w-full md:w-1/2 aspect-video md:aspect-[4/3] bg-white/60 backdrop-blur-md rounded-[2.5rem] flex items-center justify-center text-slate-500 shadow-xl border border-white/80 overflow-hidden relative group">
              <Image fill src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" alt="Employees" className="object-cover group-hover:scale-105 transition duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-6xl md:text-[5rem] font-display font-bold text-navy-900 mb-4 tracking-tight drop-shadow-sm">25+</h3>
              <p className="text-3xl font-display text-blue-600 font-bold">Employees</p>
            </div>
          </div>
        </div>
      </section>

            {/* Interactive Services Bento Grid */}
      <section id="services" className="py-32 px-6 md:px-24 bg-surface-50 relative overflow-hidden">
        {/* Subtle Background Glows matching the cards */}
        <div className="absolute top-10 left-[-10%] w-[40vw] h-[40vw] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none will-change-transform transform-gpu" />
        <div className="absolute bottom-10 right-[-10%] w-[30vw] h-[30vw] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none will-change-transform transform-gpu" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-bold tracking-widest text-blue-600 uppercase mb-4"
            >
              What We Do
            </motion.h2>
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-[3.5rem] font-display font-bold text-slate-900 mb-6 tracking-tight leading-tight"
            >
              Premium Digital Solutions
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              We engineer scalable systems, highly playable interfaces, and stunning digital experiences tailored to accelerate enterprise growth.
            </motion.p>
          </div>
          
          <div className="relative z-10">
            <InteractiveServicesGrid openModal={openModal} />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-6 md:px-24 bg-white relative overflow-hidden">

        {/* Subtle Cylinder Vibe - Bottom Right */}
        <div className="absolute -bottom-40 -right-20 w-80 h-96 z-[-1] opacity-20 text-opacity-10 pointer-events-none blur-3xl">
          <div className="w-full h-full relative" style={{ perspective: '800px' }}>
            <div className="absolute inset-0 rounded-full border-[30px] border-blue-600 bg-gradient-to-tr from-cyan-400 via-blue-600 to-indigo-900 transform rotate-45 skew-x-12" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-10">Portfolio</h2>
            <div className="flex justify-center gap-3 flex-wrap">
              {portfolioCategories.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActivePortfolioCategory(cat)}
                  className={`px-8 py-3 rounded-full text-sm font-bold transition shadow-sm ${activePortfolioCategory === cat ? 'bg-navy-900 text-white shadow-navy-900/20' : 'text-slate-600 bg-white hover:bg-slate-50 border border-slate-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, i) => {
              if (activePortfolioCategory !== 'All' && item.category !== activePortfolioCategory) return null;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  className="rounded-[2rem] overflow-hidden shadow-xl transition duration-500 group cursor-pointer relative h-[500px] border border-white/10"
                  onClick={() => openModal(`Case Study: ${item.caseStudy}`)}
                >
                  <div className="absolute inset-0 bg-slate-800 z-0">
                    <Image fill src={`https://images.unsplash.com/photo-${item.img}?auto=format&fit=crop&q=80`} alt={item.title} className="object-cover group-hover:scale-110 transition duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Content Overlaid on Image */}
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
                    <p className="text-sm text-blue-400 mb-3 font-bold uppercase tracking-widest shadow-sm">{item.category}</p>
                    <h4 className="font-bold text-white text-3xl mb-6 shadow-sm tracking-tight leading-tight">
                      {item.title}
                    </h4>

                    <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white w-full py-3.5 px-6 rounded-full flex justify-between items-center text-sm font-bold tracking-wide hover:bg-white/30 transition shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                      View Case Study
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 md:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row items-end justify-between border-b border-gray-100 pb-8">
            <div>
              <h2 className="text-slate-500 font-bold mb-4 uppercase tracking-widest text-sm">Testimonials</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-slate-900">What Customers Say</h3>
            </div>
            <div className="flex gap-4 mt-6 md:mt-0">
              <button onClick={prevTestimonial} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-slate-50 transition text-slate-600">
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
              <button onClick={nextTestimonial} className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition text-white shadow-md">
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* We cycle which testimonials we show array based on state, padding for empty */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[0, 1, 2].map((offset) => {
              const testIndex = (activeTestimonial + offset) % testimonials.length;
              const test = testimonials[testIndex];
              return (
                <motion.div
                  key={`${activeTestimonial}-${offset}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition duration-300 group"
                >
                  <p className="text-slate-600 mb-10 leading-relaxed font-medium">&quot;{test.text}&quot;</p>
                  <div className="flex items-center gap-5 pt-6 border-t border-gray-50">
                    <div className="w-14 h-14 bg-slate-200 rounded-full overflow-hidden flex items-center justify-center text-slate-500 text-sm font-bold border-2 border-transparent group-hover:border-blue-100 transition">
                      {test.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{test.name}</h4>
                      <p className="text-sm font-medium text-slate-500">{test.role}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section id="blogs">
        {/* Blue Header */}
        <div className="bg-blue-600 py-16 px-6 relative flex flex-col items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 flex space-x-8 w-full justify-center">
            <div className="w-96 h-[200%] bg-white skew-x-[35deg] -translate-x-64 -translate-y-20" />
            <div className="w-48 h-[200%] bg-white skew-x-[35deg] -translate-x-20 -translate-y-20" />
          </div>

          <div className="relative z-10 text-center w-full max-w-2xl border-b border-white/20 pb-6 inline-block mx-auto">
            <h2 className="text-5xl md:text-6xl font-display font-bold">Our Blogs</h2>
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="bg-surface-50 py-16 px-6 md:px-24 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-3xl font-display font-bold text-slate-900 mb-8">Popular blogs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="rounded-3xl overflow-hidden shadow-xl transition duration-500 group cursor-pointer relative h-[500px] border border-white/10"
                  onClick={() => openModal(`Blog Post: Course Promotion Setup ${item}`)}
                >
                  <div className="absolute inset-0 bg-slate-800 z-0">
                    <Image fill src={`https://images.unsplash.com/photo-${['1432888498266-38ffec3eaf0a', '1555421689-491a97ff2040', '1517694712202-14dd9538aa97', '1499951360447-b19be8fe80f5', '1504868584819-f8e8b4b6d7e3', '1516321318423-f06f85e504b3', '1523240795612-9a054b0db644', '1451187580459-43490279c0fa'][i]}?auto=format&fit=crop&q=80`} alt="Blog thumbnail" className="object-cover group-hover:scale-110 transition duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                  {/* Content Overlaid on Image */}
                  <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                    <h4 className="font-bold text-white text-xl mb-3 shadow-sm line-clamp-2">
                      {i % 2 === 0 ? "Course Promotion" : "Maria Rodriguez - Art Student"}
                    </h4>

                    <p className="text-sm text-slate-300 mb-6 line-clamp-4 leading-relaxed tracking-wide shadow-sm">
                      As an art student, AI Image Generator has been an invaluable resource for my projects. It&apos;s not just about convenience; it&apos;s about the endless creative possibilities it offers.
                    </p>

                    <button className="bg-white/20 backdrop-blur-md border border-white/30 text-white w-full py-3.5 px-6 rounded-full flex justify-between items-center text-sm font-bold tracking-wide hover:bg-white/30 transition shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                      Details
                      <ArrowRight className="w-4 h-4 -rotate-45" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-24 px-6 md:px-24 bg-surface-50">
        <div className="max-w-6xl mx-auto rounded-[3rem] bg-navy-900 text-white pt-24 pb-24 px-8 md:px-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[120%] h-[150%] rounded-[100%] border-[24px] border-blue-600/10 bg-gradient-to-t from-blue-600/40 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <p className="text-blue-400 font-bold mb-6 text-sm tracking-widest uppercase bg-blue-400/10 px-6 py-2 rounded-full border border-blue-400/20">Contact Us</p>
            <h2 className="text-5xl md:text-[4rem] font-display font-bold mb-12 max-w-3xl mx-auto leading-tight">Let&apos;s Talk about vision and solutions</h2>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              onClick={() => openModal(`Redirect to Contact Page / API Endpoint`)}
              className="bg-white text-navy-900 font-bold px-10 py-5 flex items-center gap-2"
            >
              Contact Us Now <ArrowRight className="w-5 h-5 ml-1" />
            </HoverBorderGradient>
          </div>
        </div>
      </section>

      {/* Short Footer Space */}
      <footer className="py-12 bg-surface-50 text-center text-slate-500 text-sm font-medium">
        © 2023 Nizod. All rights reserved.
      </footer>

    </main >
  );
}
