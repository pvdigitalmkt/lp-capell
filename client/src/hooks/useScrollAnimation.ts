import { useEffect, useRef } from 'react';

/**
 * Hook para adicionar animações fade-in-up ao entrar na viewport
 * 
 * Uso:
 * const ref = useScrollAnimation();
 * return <section ref={ref}>...</section>;
 * 
 * Customização:
 * - threshold: Quando a animação deve iniciar (0-1, padrão 0.1)
 * - rootMargin: Margem adicional para o trigger (padrão '0px')
 */
export function useScrollAnimation(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-animate');
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return ref;
}
