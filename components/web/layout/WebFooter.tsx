import React from 'react';
import { BookOpen, Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export const WebFooter: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-indigo-400" aria-hidden="true" />
              <span className="font-bold text-xl text-white">Digital Campus</span>
            </div>
            <p className="text-sm text-gray-400">
              Empowering students to achieve their full potential through innovation, integrity, and community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Visit our Facebook page"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Visit our Twitter profile"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Visit our Instagram profile"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Visit our LinkedIn profile"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors hover:underline">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Admissions</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Academics</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Campus Life</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">News & Events</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Student Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Parent Portal</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Faculty Directory</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">Library</a></li>
              <li><a href="#" className="hover:text-white transition-colors hover:underline">IT Support</a></li>
            </ul>
          </div>

          <div>
             <h3 className="text-white font-semibold mb-4">Contact Us</h3>
             <ul className="space-y-3 text-sm">
               <li className="flex items-start gap-3">
                 <MapPin className="h-5 w-5 text-indigo-400 shrink-0" aria-hidden="true" />
                 <span>123 Innovation Dr,<br/>Silicon Valley, CA 94025</span>
               </li>
               <li className="flex items-center gap-3">
                 <Phone className="h-5 w-5 text-indigo-400 shrink-0" aria-hidden="true" />
                 <span>+1 (555) 123-4567</span>
               </li>
               <li className="flex items-center gap-3">
                 <Mail className="h-5 w-5 text-indigo-400 shrink-0" aria-hidden="true" />
                 <span>admissions@digitalcampus.edu</span>
               </li>
             </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Digital Campus University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};