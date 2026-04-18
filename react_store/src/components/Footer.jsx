import { Link } from "react-router-dom";
import { FaStore, FaInstagram, FaTwitter, FaFacebook, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* --- BRAND SECTION --- */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-md">
                <FaStore size={16} />
              </div>
              <h2 className="font-black text-xl tracking-tighter text-gray-900 italic">
                Store<span className="text-indigo-600">Hub</span>
              </h2>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">
              Your one-stop destination for premium products. We deliver quality and style to your doorstep.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 bg-gray-50 text-gray-400 flex items-center justify-center rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                <FaInstagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-50 text-gray-400 flex items-center justify-center rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                <FaTwitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-50 text-gray-400 flex items-center justify-center rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                <FaFacebook size={16} />
              </a>
            </div>
          </div>

          {/* --- QUICK LINKS --- */}
          <div className="space-y-4">
            <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm font-bold transition-colors">All Products</Link></li>
              <li><Link to="/orders" className="text-gray-600 hover:text-indigo-600 text-sm font-bold transition-colors">My Orders</Link></li>
              <li><Link to="/cart" className="text-gray-600 hover:text-indigo-600 text-sm font-bold transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>

          {/* --- SUPPORT --- */}
          <div className="space-y-4">
            <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Support</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                <FaEnvelope className="text-indigo-500" /> abdouxml@gmail.com
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                <FaPhoneAlt className="text-indigo-500" /> +212 6 08 30 73 75
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm font-medium">
                <FaMapMarkerAlt className="text-indigo-500" /> Tanger, Morocco
              </li>
            </ul>
          </div>

          {/* --- NEWSLETTER --- */}
          <div className="space-y-4">
            <h3 className="font-black text-xs uppercase tracking-widest text-gray-400">Newsletter</h3>
            <p className="text-gray-500 text-sm font-medium">Subscribe for latest deals!</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email..." 
                className="w-full bg-gray-50 border border-transparent px-4 py-3 rounded-xl outline-none focus:bg-white focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 text-sm transition-all"
              />
              <button className="mt-2 w-full bg-indigo-600 text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-[11px] font-black uppercase tracking-[2px]">
          <p>© 2026 StoreHub. Built with precision.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;