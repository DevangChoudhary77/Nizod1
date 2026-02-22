"use client";

import React, { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform, useSpring } from "framer-motion";

export const ScrollProgress = ({ className }: { className?: string }) => {
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 50,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className={`fixed inset-x-0 top-0 h-1.5 origin-left z-[100] ${className || ''}`}
            style={{ scaleX }}
        />
    );
};

interface WordProps {
    children: ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className="relative mx-1 lg:mx-2.5">
            <span className="absolute opacity-20 text-slate-800">{children}</span>
            <motion.span
                style={{ opacity: opacity }}
                className="text-slate-900 drop-shadow-sm"
            >
                {children}
            </motion.span>
        </span>
    );
};

export const TextRevealByWord: FC<{ text: string; className?: string }> = ({
    text,
    className,
}) => {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const words = text.split(" ");

    return (
        <div ref={targetRef} className={`relative z-0 h-[150vh] ${className || ""}`}>
            <div className="sticky top-0 mx-auto flex h-screen max-w-6xl items-center justify-center bg-transparent px-[1rem] py-[2rem]">
                <p className="flex flex-wrap p-5 text-4xl font-bold text-slate-800/20 md:p-8 md:text-5xl lg:p-10 lg:text-6xl xl:text-7xl font-display leading-tight tracking-tight text-center justify-center">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + 1 / words.length;
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        );
                    })}
                </p>
            </div>
        </div>
    );
};

export const ParallaxSection: FC<{ children: ReactNode; speed?: number; className?: string }> = ({ children, speed = 0.5, className }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

    return (
        <div ref={ref} className={`relative ${className || ""}`}>
            <motion.div style={{ y }}>
                {children}
            </motion.div>
        </div>
    );
};

export const ScrollLinkedRevealGroup = ({ children, className }: { children: ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["0 0.9", "0 0.3"], // Maps 0 to when top hits 90% viewport, 1 to when top hits 30% viewport
    });

    const count = React.Children.count(children);

    return (
        <div ref={ref} className={className}>
            {React.Children.map(children, (child, index) => {
                const rangeStart = index * (1 / count);
                const rangeEnd = Math.min(1, rangeStart + (1 / count) * 1.5); // Add overlap for smoother multi-reveal
                return (
                    <ScrollLinkedRevealCard progress={scrollYProgress} start={rangeStart} end={rangeEnd}>
                        {child}
                    </ScrollLinkedRevealCard>
                );
            })}
        </div>
    );
};

const ScrollLinkedRevealCard = ({ children, progress, start, end }: { children: ReactNode, progress: MotionValue<number>, start: number, end: number }) => {
    const opacity = useTransform(progress, [start, end], [0, 1]);
    const y = useTransform(progress, [start, end], [100, 0]);
    const scale = useTransform(progress, [start, end], [0.8, 1]);

    return (
        <motion.div style={{ opacity, y, scale }} className="h-full">
            {children}
        </motion.div>
    );
};
