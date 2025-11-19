// src/components/Footer.jsx
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">About SmartWaste</h3>
          <p className="text-sm text-gray-200 leading-relaxed">
            SmartWaste is a digital waste management platform designed to promote 
            sustainability by connecting residents with local collection services. 
            We reward eco-friendly behavior, reduce landfill impact, and encourage 
            communities to recycle responsibly.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-gray-200 text-sm">
            <li className="flex items-center gap-2"><FaEnvelope /> support@smartwaste.co.ke</li>
            <li className="flex items-center gap-2"><FaPhoneAlt /> +254 712 345 678</li>
            <li className="flex items-center gap-2"><FaMapMarkerAlt /> Nairobi, Kenya</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-200">
            <li><Link to="/dashboard" className="hover:text-green-300">Dashboard</Link></li>
            <li><Link to="/rewards" className="hover:text-green-300">Rewards</Link></li>
            <li><Link to="/reports" className="hover:text-green-300">Reports</Link></li>
            <li><Link to="/login" className="hover:text-green-300">Login</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-transform hover:scale-110"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-300 transition-transform hover:scale-110"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-400 transition-transform hover:scale-110"><FaInstagram /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-700 py-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} SmartWaste. All rights reserved.
      </div>
    </footer>
  );
}
