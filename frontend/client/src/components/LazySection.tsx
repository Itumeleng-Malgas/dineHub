import { useEffect, useRef, useState } from 'react';

const LazySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={sectionRef}>
      {isVisible ? (
        <div>
          {/*  content here */}
          <p>This section is now visible!</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LazySection;
