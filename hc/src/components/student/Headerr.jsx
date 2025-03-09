import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = ({ showBackButton = false, className, title = "NITC HostelConnect" }) => {
  const navigate = useNavigate();

  return (
    <header className={cn("sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur-sm", className)}>
      <div className="flex h-16 items-center px-4 md:px-6">
        {showBackButton && (
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 rounded-full p-1 hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
        )}
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-semibold text-nitc-blue">
            {title}
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
