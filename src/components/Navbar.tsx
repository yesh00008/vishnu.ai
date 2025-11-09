import { useState, useEffect } from "react";
import { NavLink } from "@/components/NavLink";
import { VishnuLogo } from "@/components/VishnuLogo";
import { signOutUser, onAuthChange } from "@/services/firebase";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    // Check localStorage first for faster initial render
    const storedUser = localStorage.getItem('vishnuUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listen to auth state changes
    const unsubscribe = onAuthChange((currentUser) => {
      if (currentUser) {
        const userData = {
          uid: currentUser.uid,
          name: currentUser.displayName || 'User',
          email: currentUser.email,
          photoURL: currentUser.photoURL
        };
        setUser(userData);
        localStorage.setItem('vishnuUser', JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem('vishnuUser');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUser(null);
      localStorage.removeItem('vishnuUser');
      navigate('/');
      setShowProfileMenu(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <VishnuLogo size={32} />
            <span className="text-xl font-bold text-primary">Vishnu AI</span>
          </NavLink>

          {/* Navigation Links - Desktop Only */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className="text-foreground/70 hover:text-primary transition font-medium">
              Home
            </NavLink>
            <NavLink to="/about" className="text-foreground/70 hover:text-primary transition font-medium">
              About
            </NavLink>
            <NavLink to="/docs" className="text-foreground/70 hover:text-primary transition font-medium">
              Docs
            </NavLink>
            <NavLink to="/research" className="text-foreground/70 hover:text-primary transition font-medium">
              Research
            </NavLink>
            <NavLink to="/pricing" className="text-foreground/70 hover:text-primary transition font-medium">
              Pricing
            </NavLink>
            <NavLink to="/contributors" className="text-foreground/70 hover:text-primary transition font-medium">
              Contributors
            </NavLink>
            <NavLink to="/contact" className="text-foreground/70 hover:text-primary transition font-medium">
              Contact
            </NavLink>
          </div>

          {/* Right Side - Auth & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full bg-card/50 backdrop-blur-sm hover:bg-card transition border border-border"
                  >
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <span className="text-foreground font-medium">{user.name}</span>
                    <svg 
                      className={`w-4 h-4 text-foreground transition-transform ${showProfileMenu ? 'rotate-180' : ''}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-card backdrop-blur-xl rounded-lg overflow-hidden shadow-lg border border-border">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm text-foreground font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <NavLink
                        to="/profile"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted/50 transition"
                        onClick={() => setShowProfileMenu(false)}
                      >
                        Profile
                      </NavLink>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted/50 transition"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className="text-foreground/70 hover:text-primary transition font-medium"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="px-5 py-2 bg-primary hover:bg-primary/90 text-white rounded-full transition font-medium shadow-lg"
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden text-foreground p-2"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border">
          <div className="px-4 py-2 space-y-1">
            <NavLink 
              to="/" 
              className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-muted/50 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </NavLink>
            <NavLink 
              to="/about" 
              className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-muted/50 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              About
            </NavLink>
            <NavLink 
              to="/docs" 
              className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-muted/50 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Docs
            </NavLink>
            <NavLink 
              to="/research" 
              className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-muted/50 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Research
            </NavLink>
            <NavLink 
              to="/pricing" 
              className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-muted/50 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Pricing
            </NavLink>
            <NavLink 
              to="/contributors" 
              className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-muted/50 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Contributors
            </NavLink>
            <NavLink 
              to="/contact" 
              className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-muted/50 transition"
              onClick={() => setShowMobileMenu(false)}
            >
              Contact
            </NavLink>
            
            {/* Auth Links in Mobile Menu */}
            <div className="pt-2 border-t border-border">
              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-muted/50 transition"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-destructive hover:bg-muted/50 transition"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/signin"
                    className="block px-3 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-muted/50 transition"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="block px-3 py-2 rounded-lg text-primary hover:bg-muted/50 transition font-semibold"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign Up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
