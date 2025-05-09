
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-sherise-blue-light mt-10 pt-10 pb-6">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg text-sherise-purple-dark mb-4">SheRise</h3>
            <p className="text-sm text-gray-600 mb-4">
              Empowering young women with tools, knowledge, and support to lead confident lives.
            </p>
            <p className="text-sm text-gray-500">© 2025 SheRise. All rights reserved.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-sherise-purple-dark mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/growth" className="text-gray-600 hover:text-sherise-purple">Personal Growth</Link></li>
              <li><Link to="/mentors" className="text-gray-600 hover:text-sherise-purple">MentorConnect</Link></li>
              <li><Link to="/mental-health" className="text-gray-600 hover:text-sherise-purple">Mental Health</Link></li>
              <li><Link to="/skills" className="text-gray-600 hover:text-sherise-purple">SkillShare</Link></li>
              <li><Link to="/health" className="text-gray-600 hover:text-sherise-purple">Health Literacy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sherise-purple-dark mb-3">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-600 hover:text-sherise-purple">Our Mission</Link></li>
              <li><Link to="/partners" className="text-gray-600 hover:text-sherise-purple">Partners</Link></li>
              <li><Link to="/volunteer" className="text-gray-600 hover:text-sherise-purple">Volunteer</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-sherise-purple">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-sherise-purple">Privacy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sherise-purple-dark mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-600 hover:text-sherise-purple">Twitter</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sherise-purple">Instagram</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sherise-purple">Facebook</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sherise-purple">LinkedIn</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sherise-purple">Newsletter</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-sherise-purple/10">
          <p className="text-xs text-center text-gray-500">
            SheRise is a non-profit platform supported by volunteers, NGOs, CSR initiatives, and educational institutions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
