import React from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  endAddon?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, endAddon }) => {
  return (
    // --- KEY CHANGES HERE ---
    <header
      className="sticky top-0 z-20 flex items-start justify-between 
                 border-b border-white/10 w-full
                 bg-[#001A24]/80 
                 backdrop-blur-lg"
    >
      <div>
        <h1 className="text-4xl font-bold text-white mb-1">{title}</h1>
        {subtitle && <p className="text-lg text-white/70">{subtitle}</p>}
      </div>
      {endAddon && <div>{endAddon}</div>}
    </header>
  );
};

export default Header;
