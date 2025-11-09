import { Navbar } from "@/components/Navbar";
import { VishnuLogo } from "@/components/VishnuLogo";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-background text-foreground pt-16">
      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-foreground">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Connect with our team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Form */}
          <div className="p-8 rounded-2xl bg-card border border-border">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="p-8 rounded-lg bg-muted/50 border border-border/40">
              <h2 className="text-2xl font-bold mb-6">Connect with Founder</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <img 
                      src="https://github.com/yesh00008.png" 
                      alt="Yashwanth Thotakura"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Yashwanth Thotakura</h3>
                    <p className="text-sm text-muted-foreground">Founder & Lead Developer</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <a 
                    href="https://www.linkedin.com/in/thotakurayashwanth/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-muted transition group border border-border/40"
                  >
                    <svg className="w-5 h-5 text-primary group-hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span className="text-sm">LinkedIn - thotakurayashwanth</span>
                  </a>

                  <a 
                    href="https://x.com/yeshhhhhh7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-muted transition group border border-border/40"
                  >
                    <svg className="w-5 h-5 text-primary group-hover:scale-110 transition" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="text-sm">X (Twitter) - @yeshhhhhh7</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-lg bg-muted/50 border border-border/40">
              <h2 className="text-2xl font-bold mb-4">Open Source Community</h2>
              <p className="text-muted-foreground mb-4">
                Vishnu AI is completely open source. Join our community on GitHub to contribute, report issues, or request features.
              </p>
              <a 
                href="https://github.com/yesh00008/vishnu-query-nexus" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-2 font-semibold transition"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="p-12 rounded-lg bg-muted/50 border border-border/40 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Vishnu AI?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Real-time streaming results as data is gathered</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">All data stored locally, no tracking</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-bold mb-2">Accurate Results</h3>
              <p className="text-sm text-muted-foreground">AI-verified information with citations</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="font-bold mb-2">Global Sources</h3>
              <p className="text-sm text-muted-foreground">Search across 15+ international sources</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col items-center gap-4">
            <a 
              href="https://linkedin.com/company/vishnu-aii" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              <span className="text-sm">Follow us on LinkedIn - Vishnu AI</span>
            </a>
            <p className="text-center text-muted-foreground text-sm">
              © 2025 Vishnu AI. All rights reserved. Open Source Project.
            </p>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Contact;
