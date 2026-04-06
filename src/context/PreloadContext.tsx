import clsx from 'clsx';
import * as React from 'react';
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiGit,
} from 'react-icons/si';

const icons = [SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiGit];

const PreloadContext = React.createContext<boolean>(false);

export function PreloadProvider({ children }: { children: React.ReactNode }) {
  const [preloaded, setIsPreloaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsPreloaded(true);
    }, 200);
  }, []);

  return (
    <PreloadContext.Provider value={preloaded}>
      <div
        className={clsx(
          'fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 dark:bg-dark',
          preloaded && 'pointer-events-none opacity-0'
        )}
      >
        <div className='flex gap-4'>
          {icons.map((Icon, i) => (
            <div
              key={i}
              className='text-gray-700 dark:text-gray-200'
              style={{
                animation: 'roll 1s linear infinite',
                animationDelay: `${i * 0.15}s`,
              }}
            >
              <Icon size={36} />
            </div>
          ))}
        </div>
      </div>
      {children}
    </PreloadContext.Provider>
  );
}

export const usePreloadState = () => React.useContext(PreloadContext);
