import React, { useEffect, useRef } from 'react'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current, // ✅ Added trigger
                    start: 'top 80%',               // ✅ Fixed start
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            });

            titleAnimation.to('.animated-word', {
                opacity: 1,
                transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
                ease: 'power2.inOut',
                stagger: 0.02,
                duration: 0.8 // ✅ Added duration
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className={`animated-title ${containerClass}`} ref={containerRef}>
            {title.split('<br />').map((line, index) => (
                <div key={index} className="flex-center max-w-full flex-wrap gap-2 md:gap-3">
                    {line.split(' ').map((word, wordIndex) => (
                        <span
                            key={wordIndex}
                            className="animated-word"
                            dangerouslySetInnerHTML={{ __html: word }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AnimatedTitle;