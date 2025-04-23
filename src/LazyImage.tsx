import { useEffect, useRef, useState } from 'react';

type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

const LazyImage: React.FC<LazyImageProps> = ({ src, alt = '', ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <img
      ref={ref}
      src={isVisible ? src : undefined}
      alt={alt}
      loading="lazy"
      {...props}
    />
  );
};

export default LazyImage;
