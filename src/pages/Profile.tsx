import { Navbar } from "@/components/Navbar";
import { VishnuLogo } from "@/components/VishnuLogo";
import { NavLink } from "@/components/NavLink";
import { User, Settings, History, Heart, LogOut } from "lucide-react";

const Profile = () => {
  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Profile Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="glass-card p-6 rounded-2xl">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="font-bold text-lg">John Doe</h3>
                <p className="text-sm text-gray-400">john@example.com</p>
              </div>
              
              <nav className="space-y-2">
                <a href="#account" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition text-white">
                  <User className="w-5 h-5" />
                  <span>Account</span>
                </a>
                <a href="#settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </a>
                <a href="#history" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white">
                  <History className="w-5 h-5" />
                  <span>Search History</span>
                </a>
                <a href="#saved" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white">
                  <Heart className="w-5 h-5" />
                  <span>Saved</span>
                </a>
                <button className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition text-red-400 hover:text-red-300 w-full">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-8">
            {/* Account Info */}
            <div id="account" className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Account Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    defaultValue="San Francisco, CA"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                  />
                </div>
              </div>
              <button className="mt-6 bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 font-semibold transition">
                Save Changes
              </button>
            </div>

            {/* Subscription */}
            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Subscription</h2>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Pro Plan</h3>
                  <p className="text-gray-400">$9.99/month • Next billing: Jan 15, 2025</p>
                </div>
                <span className="bg-green-500/20 text-green-400 px-4 py-1 rounded-full text-sm font-semibold">
                  Active
                </span>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Searches This Month</p>
                  <p className="text-2xl font-bold">347</p>
                </div>
                <div className="bg-black/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Saved Chats</p>
                  <p className="text-2xl font-bold">45 / 100</p>
                </div>
                <div className="bg-black/50 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-1">Search History</p>
                  <p className="text-2xl font-bold">28 / 50</p>
                </div>
              </div>
              <div className="flex gap-3">
                <NavLink to="/pricing">
                  <button className="bg-white/10 hover:bg-white/20 text-white rounded-full px-6 py-2 font-semibold transition">
                    Change Plan
                  </button>
                </NavLink>
                <button className="bg-white/10 hover:bg-white/20 text-red-400 rounded-full px-6 py-2 font-semibold transition">
                  Cancel Subscription
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div id="history" className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <p className="font-medium">Latest AI developments</p>
                    <p className="text-sm text-gray-400">2 hours ago</p>
                  </div>
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-400 cursor-pointer transition" />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <p className="font-medium">React best practices 2025</p>
                    <p className="text-sm text-gray-400">5 hours ago</p>
                  </div>
                  <Heart className="w-5 h-5 text-red-400 cursor-pointer transition" />
                </div>
                <div className="flex items-center justify-between py-3 border-b border-white/10">
                  <div>
                    <p className="font-medium">Climate change solutions</p>
                    <p className="text-sm text-gray-400">Yesterday</p>
                  </div>
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-400 cursor-pointer transition" />
                </div>
              </div>
              <button className="mt-6 text-primary hover:text-primary/90 font-semibold transition">
                View All History →
              </button>
            </div>
          </main>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col items-center gap-4">
            <a 
              href="https://linkedin.com/company/vishnu-aii" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-primary transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span className="text-sm">Follow us on LinkedIn - Vishnu AI</span>
            </a>
            <p className="text-center text-gray-400 text-sm">
              © 2025 Vishnu AI. All rights reserved. Open Source Project.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Profile;
