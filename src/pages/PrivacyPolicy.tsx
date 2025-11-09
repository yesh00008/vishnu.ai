import { Navbar } from "@/components/Navbar";
import { Shield, Lock, Eye, Database, UserCheck, FileText, AlertCircle, Globe } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-16">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Shield className="w-16 h-16 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-coral-300 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-400">
              Last updated: November 8, 2025
            </p>
          </div>

          {/* Introduction */}
          <div className="glass-card p-8 rounded-2xl mb-8">
            <div className="flex items-start gap-4 mb-4">
              <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Welcome to Vishnu AI. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy will inform you about how we look after your personal data when you visit our 
                  website and tell you about your privacy rights and how the law protects you.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Vishnu AI is an open-source AI-powered deep web search engine. We are committed to transparency 
                  in how we collect, use, and protect your information.
                </p>
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="glass-card p-8 rounded-2xl mb-8">
            <div className="flex items-start gap-4 mb-4">
              <Database className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                
                <h3 className="text-xl font-semibold mb-3 text-primary">Personal Information</h3>
                <ul className="space-y-2 mb-6 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Account Data:</strong> Name, email address, and profile picture (when you sign up with Google)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Contact Information:</strong> Email and message content when you contact us</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 text-primary">Usage Data</h3>
                <ul className="space-y-2 mb-6 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Search Queries:</strong> The questions and searches you perform</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Chat History:</strong> Your conversation history with the AI (stored locally)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Bookmarks:</strong> Sources and links you save for later</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 text-primary">Technical Data</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Browser Information:</strong> Browser type, version, and settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Device Data:</strong> IP address, operating system, and device type</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Analytics:</strong> Page views, session duration, and interaction patterns</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="glass-card p-8 rounded-2xl mb-8">
            <div className="flex items-start gap-4 mb-4">
              <UserCheck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We use your personal data for the following purposes:
                </p>
                
                <div className="space-y-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-primary">Service Delivery</h3>
                    <p className="text-gray-300 text-sm">
                      To provide, maintain, and improve our AI-powered search services, personalize your experience, 
                      and save your preferences and search history.
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-primary">Communication</h3>
                    <p className="text-gray-300 text-sm">
                      To respond to your inquiries, send important updates about our service, and notify you 
                      about changes to our terms or policies.
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-primary">Analytics & Improvement</h3>
                    <p className="text-gray-300 text-sm">
                      To analyze usage patterns, improve our algorithms, fix bugs, and enhance overall service quality.
                    </p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-primary">Security</h3>
                    <p className="text-gray-300 text-sm">
                      To protect against fraud, abuse, and unauthorized access to our services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Data Storage & Security */}
          <div className="glass-card p-8 rounded-2xl mb-8">
            <div className="flex items-start gap-4 mb-4">
              <Lock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Data Storage & Security</h2>
                
                <h3 className="text-xl font-semibold mb-3 text-primary">Where We Store Your Data</h3>
                <ul className="space-y-2 mb-6 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Firebase (Google Cloud):</strong> User authentication and profile data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Local Storage:</strong> Chat history, bookmarks, and preferences (stored in your browser)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Temporary Processing:</strong> Search queries are processed in real-time and not permanently stored</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mb-3 text-primary">Security Measures</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>End-to-end encryption for data transmission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Secure authentication via Google OAuth 2.0</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Regular security audits and updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Limited access controls and employee data protection training</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Sharing */}
          <div className="glass-card p-8 rounded-2xl mb-8">
            <div className="flex items-start gap-4 mb-4">
              <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Data Sharing & Third Parties</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We do not sell your personal data to third parties. We may share your information with:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Service Providers</h4>
                      <p className="text-gray-300 text-sm">
                        Google Firebase (authentication), Bytez.js for AI processing (Qwen models), and web scraping services 
                        necessary to operate our platform.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Legal Requirements</h4>
                      <p className="text-gray-300 text-sm">
                        When required by law, regulation, or legal process, or to protect our rights and safety.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Open Source Community</h4>
                      <p className="text-gray-300 text-sm">
                        As an open-source project, our code is publicly available on GitHub, but it does not 
                        include any user personal data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="glass-card p-8 rounded-2xl mb-8">
            <div className="flex items-start gap-4 mb-4">
              <Eye className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  You have the following rights regarding your personal data:
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-primary">Access</h3>
                    <p className="text-gray-300 text-sm">Request copies of your personal data</p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-primary">Correction</h3>
                    <p className="text-gray-300 text-sm">Update or correct inaccurate data</p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-primary">Deletion</h3>
                    <p className="text-gray-300 text-sm">Request deletion of your data</p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-primary">Portability</h3>
                    <p className="text-gray-300 text-sm">Export your data in a readable format</p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-primary">Objection</h3>
                    <p className="text-gray-300 text-sm">Object to processing of your data</p>
                  </div>

                  <div className="bg-white/5 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2 text-primary">Restriction</h3>
                    <p className="text-gray-300 text-sm">Limit how we use your data</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mt-6">
                  To exercise these rights, please contact us at{" "}
                  <a href="mailto:privacy@vishnuai.com" className="text-primary hover:underline">
                    privacy@vishnuai.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Cookies */}
          <div className="glass-card p-8 rounded-2xl mb-8">
            <div className="flex items-start gap-4 mb-4">
              <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold mb-4">Cookies & Tracking</h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  We use cookies and similar technologies to:
                </p>
                
                <ul className="space-y-2 text-gray-300 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Remember your preferences and settings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Keep you signed in to your account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Analyze how you use our service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Improve website performance and security</span>
                  </li>
                </ul>

                <p className="text-gray-300 text-sm">
                  You can control cookies through your browser settings. However, disabling cookies may affect 
                  your ability to use certain features of our service.
                </p>
              </div>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="glass-card p-8 rounded-2xl mb-8">
            <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Our service is not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you are a parent or guardian and believe your 
              child has provided us with personal information, please contact us, and we will delete such information.
            </p>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="glass-card p-8 rounded-2xl mb-8">
            <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by:
            </p>
            <ul className="space-y-2 text-gray-300 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Posting the new privacy policy on this page</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Updating the "Last updated" date at the top of this policy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Sending you an email notification (for significant changes)</span>
              </li>
            </ul>
            <p className="text-gray-300 text-sm">
              We encourage you to review this privacy policy periodically for any changes.
            </p>
          </div>

          {/* Contact Us */}
          <div className="glass-card p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <a href="mailto:privacy@vishnuai.com" className="text-primary hover:underline">
                    privacy@vishnuai.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Website</p>
                  <a href="/" className="text-primary hover:underline">
                    vishnuai.com
                  </a>
                </div>
              </div>
            </div>
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

export default PrivacyPolicy;
