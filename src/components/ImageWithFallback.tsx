import React, { useState } from 'react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  className?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  title,
  subtitle,
  className = 'w-full h-full object-cover',
  containerClassName = 'relative overflow-hidden bg-[#EBE6DF]',
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={containerClassName}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className={className}
        />
      ) : (
        <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#EFECE6] via-[#E5DFD5] to-[#D8D0C5] text-[#292524] select-none">
          <svg
            viewBox="0 0 180 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-32 h-12 mb-3 stroke-[#78716C] opacity-75"
          >
            <path
              d="M15 42L26 28C34 19 48 15 66 15H104C120 15 134 21 146 29L165 36V44H148M36 44H122"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="44" cy="44" r="9" strokeWidth="1.5" />
            <circle cx="135" cy="44" r="9" strokeWidth="1.5" />
          </svg>
          {title && (
            <span className="font-display text-lg font-medium text-center text-[#1C1917]">
              {title}
            </span>
          )}
          {subtitle && (
            <span className="text-xs text-[#78716C] mt-1 font-mono-tabular">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
