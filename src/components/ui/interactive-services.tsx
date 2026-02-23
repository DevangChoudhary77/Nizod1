"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Globe, Smartphone, PenTool, Briefcase, Users, Megaphone, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Service Data ---
export const interactiveServicesData = [
    {
        title: "Website Development",
        desc: "Blazing-fast, scalable, and secure digital web experiences.",
        icon: Globe,
        className: "md:col-span-2",
        bgGlow: "rgba(37, 99, 235, 0.15)", // Blue
        fullDesc: "From corporate landing pages to complex e-commerce platforms, we build robust, high-performance web applications tailored to your business goals. We utilize modern stacks like React, Next.js, and Node.js to ensure lightning-fast speeds and secure architecture."
    },
    {
        title: "App Development",
        desc: "Native & cross-platform high-performance mobile solutions.",
        icon: Smartphone,
        className: "md:col-span-1",
        bgGlow: "rgba(147, 51, 234, 0.15)", // Purple
        fullDesc: "We architect native and cross-platform mobile experiences that captivate users. Whether it's iOS or Android, our apps are built for performance, seamless UX, and offline capabilities, keeping your audience engaged on the go."
    },
    {
        title: "UI/UX Design",
        desc: "Pixel-perfect interfaces & frictionless user journeys.",
        icon: PenTool,
        className: "md:col-span-1",
        bgGlow: "rgba(219, 39, 119, 0.15)", // Pink
        fullDesc: "Great software starts with great design. Our UX research and UI design team crafts intuitive, accessible, and stunning interfaces that reduce friction and increase user adoption, ensuring your product is a joy to use."
    },
    {
        title: "Project Management",
        desc: "Agile delivery, strict timelines & seamless execution.",
        icon: Briefcase,
        className: "md:col-span-2",
        bgGlow: "rgba(5, 150, 105, 0.15)", // Emerald
        fullDesc: "We take the chaos out of software delivery. Our agile project managers act as your dedicated liaison, maintaining strict timelines, transparent budget tracking, and continuous communication so you always know your project's state."
    },
    {
        title: "HR Management",
        desc: "Elite technical team building & rapid talent acquisition.",
        icon: Users,
        className: "md:col-span-2",
        bgGlow: "rgba(217, 119, 6, 0.15)", // Amber
        fullDesc: "Scaling top-tier tech talent is challenging. Our specialized technical HR solutions cover precise talent acquisition, cultural alignment, and rapid onboarding processes to build elite engineering teams for your enterprise."
    },
    {
        title: "SEO & Marketing",
        desc: "Data-driven exponential growth & brand visibility.",
        icon: Megaphone,
        className: "md:col-span-1",
        bgGlow: "rgba(220, 38, 38, 0.15)", // Red
        fullDesc: "We don't just build great products; we make sure the world sees them. Our integrated SEO and digital marketing campaigns leverage analytics, content strategy, and technical optimization to drive qualified traffic and maximize ROI."
    },
];

// --- 3D Hover Card Component ---
const InteractiveCard = ({
    title,
    desc,
    icon: Icon,
    className,
    bgGlow,
    onClick
}: {
    title: string;
    desc: string;
    icon: React.ElementType;
    className?: string;
    bgGlow: string;
    onClick: () => void;
}) => {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position values for the spotlight and tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth springs for the 3D tilt
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    // Transform constraints: Tilt max 10 degrees.
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

    // Spotlight state
    const [isHovered, setIsHovered] = useState(false);
    const spotlightX = useMotionValue(0);
    const spotlightY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Calculate normalized mouse position from -0.5 to 0.5 for the center
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);

        // Update real coordinates for the spotlight gradient
        spotlightX.set(mouseX);
        spotlightY.set(mouseY);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className={cn(
                "relative rounded-[2rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
                "flex flex-col justify-between p-8 overflow-hidden cursor-pointer group",
                "hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:z-10 transition-shadow duration-500",
                className
            )}
        >
            {/* 1. Dynamic Spotlight Background */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
                style={{
                    opacity: isHovered ? 1 : 0,
                    background: useTransform(
                        [spotlightX, spotlightY],
                        ([sx, sy]) => `radial-gradient(circle 350px at ${sx}px ${sy}px, ${bgGlow}, transparent 80%)`
                    )
                }}
            />

            {/* 2. Top Section: Icon & Arrow */}
            <div
                className="flex justify-between items-start mb-16 relative z-10"
                style={{ transform: "translateZ(30px)" }} // Floating 3D effect
            >
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 shadow-sm group-hover:scale-110 group-hover:text-blue-600 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                    <Icon className="w-8 h-8" />
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                </div>
            </div>

            {/* 3. Bottom Section: Text Content */}
            <div
                className="relative z-10"
                style={{ transform: "translateZ(40px)" }} // Pops out more than the icon!
            >
                <h3 className="text-2xl font-bold text-slate-900 mb-2 font-display tracking-tight group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>
                <p className="text-slate-500 text-[0.95rem] leading-relaxed max-w-[90%]">
                    {desc}
                </p>
            </div>
        </motion.div>
    );
};

// --- Main Grid Component ---
export function InteractiveServicesGrid({ openModal }: { openModal: (title: string) => void }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto perspective-1000">
            {interactiveServicesData.map((service, idx) => (
                <InteractiveCard
                    key={idx}
                    title={service.title}
                    desc={service.desc}
                    icon={service.icon}
                    className={service.className}
                    bgGlow={service.bgGlow}
                    onClick={() => openModal(`Service: ${service.title}|^^|${service.fullDesc}`)}
                />
            ))}
        </div>
    );
}
