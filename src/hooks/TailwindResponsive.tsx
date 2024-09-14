import { useState, useEffect } from 'react';

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('md');

  const updateBreakpoint = () => {
    const width = window.innerWidth;
    if (width < 640) setBreakpoint('sm');
    else if (width < 768) setBreakpoint('md');
    else if (width < 1024) setBreakpoint('lg');
    else if (width < 1280) setBreakpoint('xl');
    else setBreakpoint('2xl');
  };

  useEffect(() => {
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
}
