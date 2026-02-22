"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ScrollyCanvasProps {
    frameCount?: number;
}

export default function ScrollyCanvas({ frameCount = 120 }: ScrollyCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const { scrollYProgress } = useScroll();

    // Transform scroll progress (0 to 1) into a frame index (1 to frameCount)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

    useEffect(() => {
        // Preload all images
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            // Assume images are named 0001.webp, 0002.webp, ..., 0120.webp
            const numString = i.toString().padStart(4, '0');
            img.src = `/sequence/${numString}.webp`;

            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    // Initial draw when all are loaded
                    drawFrame(1);
                }
            };
            img.onerror = () => {
                // If image fails, mark it loaded to prevent infinite wait, we'll draw placeholder
                img.dataset.error = "true";
                loadedCount++;
                if (loadedCount === frameCount) {
                    drawFrame(1);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);

        // We also want to manually handle window resize to redraw
        const handleResize = () => drawFrame(Math.round(frameIndex.get()));
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [frameCount]);

    // Handle frame changes triggered by scroll
    useMotionValueEvent(frameIndex, "change", (latest) => {
        drawFrame(Math.round(latest));
    });

    const drawFrame = (index: number) => {
        if (!canvasRef.current || images.length === 0) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Make canvas fill the window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const img = images[index - 1]; // arrays are 0-indexed

        if (img && img.complete && !img.dataset.error) {
            // Draw the sequence image, trying to cover the screen (like object-fit: cover)
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (canvasRatio > imgRatio) {
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#0a0f25"; // match navy-900
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        } else {
            // Fallback placeholder logic
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#0a0f25";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "#0066FF";
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, 50 + (index * 2), 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 48px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(`NIZOD FRAME ${index}`, canvas.width / 2, canvas.height / 2 + 100);

            ctx.font = "20px sans-serif";
            ctx.fillStyle = "#94a3b8";
            ctx.fillText("Replace with /public/sequence/... .webp", canvas.width / 2, canvas.height / 2 + 140);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-[100vh] -z-10 bg-navy-900 pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full" />
            {/* Default fallback gradient overlay */}
            <div className="absolute inset-0 bg-navy-900/60 pointer-events-none" />
        </div>
    );
}
