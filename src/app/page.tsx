// pages/index.js
import { MessageSquare, Lock, Clock, Users, Eye, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Premium SVG Background */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <svg 
          viewBox="0 0 800 600" 
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0.7" />
            </linearGradient>
            
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F9A826" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            
            <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
            
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Background */}
          <rect x="0" y="0" width="800" height="600" fill="#111827" />
          
          {/* Premium Background Elements */}
          <g className="luxury-pattern" opacity="0.05">
            <path d="M0,0 L800,0 L800,600 L0,600 Z" fill="url(#goldGradient)" />
            <path d="M0,150 L800,150" stroke="#F9A826" strokeWidth="0.5" strokeDasharray="4,8" />
            <path d="M0,300 L800,300" stroke="#F9A826" strokeWidth="0.5" strokeDasharray="4,8" />
            <path d="M0,450 L800,450" stroke="#F9A826" strokeWidth="0.5" strokeDasharray="4,8" />
            
            <path d="M150,0 L150,600" stroke="#F9A826" strokeWidth="0.5" strokeDasharray="4,8" />
            <path d="M400,0 L400,600" stroke="#F9A826" strokeWidth="0.5" strokeDasharray="4,8" />
            <path d="M650,0 L650,600" stroke="#F9A826" strokeWidth="0.5" strokeDasharray="4,8" />
          </g>
          
          {/* Animated Background Elements */}
          <g className="background-elements">
            <circle className="moving-circle" cx="100" cy="300" r="80" fill="url(#bgGradient)" opacity="0.2">
              <animateMotion dur="40s" repeatCount="indefinite" path="M100,300 C150,200 650,100 700,350 C650,450 150,500 100,300" />
            </circle>
            
            <circle className="moving-circle" cx="700" cy="300" r="100" fill="url(#bgGradient)" opacity="0.15">
              <animateMotion dur="35s" repeatCount="indefinite" path="M700,300 C650,400 150,500 100,250 C150,150 650,100 700,300" />
            </circle>
            
            <circle className="moving-circle" cx="200" cy="200" r="60" fill="url(#bgGradient)" opacity="0.1">
              <animateMotion dur="30s" repeatCount="indefinite" path="M200,200 C350,150 450,350 300,400 C150,350 100,250 200,200" />
            </circle>
            
            <circle className="moving-circle" cx="600" cy="400" r="70" fill="url(#bgGradient)" opacity="0.12">
              <animateMotion dur="45s" repeatCount="indefinite" path="M600,400 C500,450 300,350 400,200 C500,150 650,250 600,400" />
            </circle>
          </g>
          
          {/* Message Icon - Centered */}
          <g transform="translate(400, 300)" filter="url(#glow)">
            {/* Message Bubble Shape */}
            <path 
              d="M-100,-75 L100,-75 C115,-75 125,-65 125,-50 L125,50 C125,65 115,75 100,75 L0,75 L-25,100 L-30,75 L-100,75 C-115,75 -125,65 -125,50 L-125,-50 C-125,-65 -115,-75 -100,-75 Z" 
              fill="url(#emeraldGradient)" 
              opacity="0.9"
              stroke="url(#goldGradient)"
              strokeWidth="3"
            />
            
            {/* Message Lines */}
            <line x1="-80" y1="-35" x2="80" y2="-35" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
            <line x1="-80" y1="0" x2="40" y2="0" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
            <line x1="-80" y1="35" x2="60" y2="35" stroke="white" strokeWidth="8" strokeLinecap="round" opacity="0.6" />
            
            {/* Animated Glow */}
            <animate attributeName="opacity" values="0.9;1;0.9" dur="3s" repeatCount="indefinite" />
          </g>
          
          {/* Security Decorations */}
          <g transform="translate(400, 450)" opacity="0.7">
            <path d="M0,-20 L20,0 L0,20 L-20,0 Z" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
            <circle cx="0" cy="0" r="10" fill="none" stroke="url(#goldGradient)" strokeWidth="2" />
          </g>
        </svg>
      </div>

      {/* Content container with z-index to appear above the SVG background */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header - Updated with MessageSquare icon */}
        <header className="container mx-auto py-4 px-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <MessageSquare className="h-6 w-6 text-amber-400" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-300">M2 You</h1>
          </div>
          <nav className="flex flex-wrap justify-center gap-2">
            <Button variant="ghost" asChild className="text-xs sm:text-sm hover:text-amber-400 hover:bg-gray-800">
              <Link href="/about">About</Link>
            </Button>
            <Button variant="ghost" asChild className="text-xs sm:text-sm hover:text-amber-400 hover:bg-gray-800">
              <Link href="/features">Features</Link>
            </Button>
            <Button variant="outline" asChild className="text-xs sm:text-sm border-amber-500 hover:bg-amber-500 hover:text-gray-900">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-400 text-gray-900 hover:from-amber-400 hover:to-amber-300">
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-4 sm:py-8 flex-grow">
          {/* Hero Section - Optimized for small screens */}
          <section className="bg-gray-900 bg-opacity-70 rounded-lg p-4 sm:p-6 text-center max-w-3xl mx-auto mb-6 sm:mb-10 backdrop-blur-sm border border-gray-700 border-opacity-50">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-emerald-400">
              Premium Secure Messaging
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 max-w-xl mx-auto">
              Experience communication reimagined with military-grade encryption, self-destructing messages, and the privacy control expected by discerning clients.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="sm" asChild className="text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-400 text-gray-900 hover:from-amber-400 hover:to-amber-300">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button size="sm" variant="outline" asChild className="text-xs sm:text-sm border-amber-500 hover:bg-amber-500 hover:text-gray-900">
                <Link href="/features">Explore Features</Link>
              </Button>
            </div>
          </section>

          {/* Features Section - Updated with MessageSquare icon */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-10">
            <Card className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 border-opacity-50 text-white">
              <CardHeader className="p-4">
                <Lock className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400 mb-2" />
                <CardTitle className="text-base sm:text-lg text-amber-300">End-to-End Encryption</CardTitle>
                <CardDescription className="text-gray-300 text-xs sm:text-sm">
                  Bank-level security for your most sensitive communications.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-gray-300 text-xs sm:text-sm">
                  AES-256 encryption ensures that only you and your recipient can access message content.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 border-opacity-50 text-white">
              <CardHeader className="p-4">
                <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400 mb-2" />
                <CardTitle className="text-base sm:text-lg text-amber-300">Self-Destructing Messages</CardTitle>
                <CardDescription className="text-gray-300 text-xs sm:text-sm">
                  Control the lifespan of your communications.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-gray-300 text-xs sm:text-sm">
                  Set messages to automatically delete after being read or after a predetermined time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 border-opacity-50 text-white">
              <CardHeader className="p-4">
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400 mb-2" />
                <CardTitle className="text-base sm:text-lg text-amber-300">Private Groups</CardTitle>
                <CardDescription className="text-gray-300 text-xs sm:text-sm">
                  Secure spaces for your team or inner circle.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-gray-300 text-xs sm:text-sm">
                  Create exclusive groups with precise member visibility and enhanced conversation controls.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 border-opacity-50 text-white">
              <CardHeader className="p-4">
                <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400 mb-2" />
                <CardTitle className="text-base sm:text-lg text-amber-300">Identity Protection</CardTitle>
                <CardDescription className="text-gray-300 text-xs sm:text-sm">
                  Communicate with complete anonymity when needed.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-gray-300 text-xs sm:text-sm">
                  Use customized identities across different conversations to maintain your privacy.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 border-opacity-50 text-white">
              <CardHeader className="p-4">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400 mb-2" />
                <CardTitle className="text-base sm:text-lg text-amber-300">Premium Experience</CardTitle>
                <CardDescription className="text-gray-300 text-xs sm:text-sm">
                  Sophisticated messaging with all premium features.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-gray-300 text-xs sm:text-sm">
                  Enjoy seamless sharing of media and documents with our elegant, intuitive interface.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 bg-opacity-70 backdrop-blur-sm border border-gray-700 border-opacity-50 text-white">
              <CardHeader className="p-4">
                <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-amber-400 mb-2" />
                <CardTitle className="text-base sm:text-lg text-amber-300">Complete Sovereignty</CardTitle>
                <CardDescription className="text-gray-300 text-xs sm:text-sm">
                  Your data remains exclusively yours.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-gray-300 text-xs sm:text-sm">
                  We maintain zero access to your content, ensuring absolute privacy and control.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Testimonial Section - Added for luxury feel */}
          <section className="bg-gray-900 bg-opacity-70 rounded-lg p-4 sm:p-6 max-w-3xl mx-auto mb-6 sm:mb-10 backdrop-blur-sm border border-gray-700 border-opacity-50">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-amber-300">Trusted by Executives & VIPs Worldwide</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg border border-gray-700 border-opacity-50">
                <p className="text-gray-300 text-xs sm:text-sm italic mb-2">
                  &quot;M2 You has become essential for my confidential communications. The level of security and privacy is unmatched.&quot;
                </p>
                <p className="text-amber-400 text-xs sm:text-sm font-medium">— Financial Services CEO</p>
              </div>
              <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg border border-gray-700 border-opacity-50">
                <p className="text-gray-300 text-xs sm:text-sm italic mb-2">
                  &quot;Finally, a messaging platform that takes privacy as seriously as I do. Worth every penny for the peace of mind.&quot;
                </p>
                <p className="text-amber-400 text-xs sm:text-sm font-medium">— Technology Entrepreneur</p>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-4 sm:p-6 text-center max-w-2xl mx-auto backdrop-blur-sm border border-amber-500 border-opacity-30">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-amber-300">Experience Elite Communication</h2>
            <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6">
              Join the exclusive network of professionals who demand the highest standards of privacy and security.
            </p>
            <Button size="lg" asChild className="text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-400 text-gray-900 hover:from-amber-400 hover:to-amber-300">
              <Link href="/register">Secure Your Account</Link>
            </Button>
          </section>
        </main>

        {/* Footer - Updated with MessageSquare icon */}
        <footer className="bg-gray-900 bg-opacity-90 py-6 mt-6 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="flex items-center gap-2 mb-4 sm:mb-0">
                <MessageSquare className="h-5 w-5 text-amber-400" />
                <span className="text-lg font-bold text-amber-300">M2 You</span>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="text-center mt-4 text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} M2 You. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}