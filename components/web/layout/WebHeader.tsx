import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, User } from 'lucide-react';
import { Button } from '../../shared/Button';

export const WebHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="Digital Campus Home">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <BookOpen className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">Digital Campus</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center" aria-label="Main Navigation">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1">About</Link>
            <Link to="/admissions" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1">Admissions</Link>
            <Link to="/news" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1">News & Events</Link>
          </nav>

          {/* CTA & Portal Link */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/portal" tabIndex={-1}>
              <Button variant="ghost" size="sm" className="gap-2" aria-label="Login to Portal">
                <User className="h-4 w-4" aria-hidden="true" />
                Portal Login
              </Button>
            </Link>
            <Button size="sm">Apply Now</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-600 hover:text-gray-900 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-expanded={isMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 pb-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4 pt-4" aria-label="Mobile Navigation">
            <Link to="/" className="text-gray-600 font-medium px-2 py-2 rounded hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="text-gray-600 font-medium px-2 py-2 rounded hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/admissions" className="text-gray-600 font-medium px-2 py-2 rounded hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>Admissions</Link>
            <Link to="/news" className="text-gray-600 font-medium px-2 py-2 rounded hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>News & Events</Link>
            <div className="border-t border-gray-100 pt-4 flex flex-col gap-3">
               <Link to="/portal" onClick={() => setIsMenuOpen(false)} className="w-full">
                <Button variant="outline" className="w-full justify-center">Portal Login</Button>
               </Link>
               <Button className="w-full justify-center">Apply Now</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};