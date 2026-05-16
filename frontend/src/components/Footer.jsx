import React from 'react';
import { Link } from 'react-router';
import {
  bodyText,
  linkClass,
  mutedText,
} from '../styles/common';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f5f5f7] border-t border-[#e8e8ed] mt-20">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-[#1d1d1f] mb-3">MyBlog</h3>
            <p className={`${bodyText} mb-4 max-w-md`}>
              A platform for writers and readers to share knowledge, discover new ideas,
              and build a community around great content.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`${linkClass} text-sm`}>Twitter</a>
              <a href="#" className={`${linkClass} text-sm`}>LinkedIn</a>
              <a href="#" className={`${linkClass} text-sm`}>GitHub</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-medium text-[#1d1d1f] mb-3">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`${linkClass} text-sm block`}>Home</Link>
              </li>
              <li>
                <Link to="/register" className={`${linkClass} text-sm block`}>Join as Author</Link>
              </li>
              <li>
                <Link to="/login" className={`${linkClass} text-sm block`}>Login</Link>
              </li>
              <li>
                <a href="#" className={`${linkClass} text-sm block`}>About</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-medium text-[#1d1d1f] mb-3">Categories</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`${linkClass} text-sm block`}>Technology</a>
              </li>
              <li>
                <a href="#" className={`${linkClass} text-sm block`}>Programming</a>
              </li>
              <li>
                <a href="#" className={`${linkClass} text-sm block`}>AI & ML</a>
              </li>
              <li>
                <a href="#" className={`${linkClass} text-sm block`}>Web Development</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#e8e8ed] mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className={`${mutedText} text-sm`}>
            © {currentYear} MyBlog. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className={`${mutedText} text-sm hover:text-[#1d1d1f] transition-colors`}>
              Privacy Policy
            </a>
            <a href="#" className={`${mutedText} text-sm hover:text-[#1d1d1f] transition-colors`}>
              Terms of Service
            </a>
            <a href="#" className={`${mutedText} text-sm hover:text-[#1d1d1f} transition-colors`}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer