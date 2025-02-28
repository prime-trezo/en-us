import React, { useEffect, useRef, useState } from 'react';
import { 
  Shield, 
  Cpu, 
  Lock, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle, 
  ExternalLink, 
  ChevronDown, 
  Menu, 
  X, 
  Github, 
  Twitter, 
  Linkedin,
  Zap,
  RefreshCw,
  Smartphone,
  Key
} from 'lucide-react';

// Intersection Observer hook for animations
function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isIntersecting];
}

// Carousel component
const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentIndex * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden">
      <div 
        ref={carouselRef}
        className="carousel flex w-full overflow-x-hidden"
      >
        {items.map((item, index) => (
          <div 
            key={index} 
            className="carousel-item flex-shrink-0 w-full"
          >
            <div className="card p-6 h-full">
              <h3 className="text-xl font-bold mb-3 gradient-text">{item.title}</h3>
              <p className="text-gray-300 mb-4">{item.description}</p>
              {item.image && (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4 gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-600'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

// FAQ Component
const FAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 card">
          <button
            className="flex justify-between items-center w-full p-4 text-left"
            onClick={() => toggleFAQ(index)}
          >
            <span className="font-semibold">{faq.question}</span>
            <ChevronDown
              className={`transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              size={20}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-96 p-4 pt-0' : 'max-h-0'
            }`}
          >
            <p className="text-gray-300">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroRef, heroVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [featuresRef, featuresVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [stepsRef, stepsVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [faqRef, faqVisible] = useIntersectionObserver({ threshold: 0.1 });

  const carouselItems = [
    {
      title: "Secure Your Digital Assets with Trezor.io/start",
      description: "Learn how to protect your cryptocurrencies with the most secure hardware wallet solution available.",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Easy Setup Process at Trezor.io/start",
      description: "Follow our step-by-step guide to get your Trezor device up and running in minutes.",
      image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Advanced Security Features",
      description: "Discover the cutting-edge security features that make Trezor the most trusted name in hardware wallets.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const faqs = [
    {
      question: "What is Trezor.io/start?",
      answer: "Trezor.io/start is the official starting point for setting up your Trezor hardware wallet. It provides step-by-step instructions to initialize your device, create a secure wallet, and protect your digital assets."
    },
    {
      question: "How do I connect my Trezor device?",
      answer: "To connect your Trezor device, simply use the USB cable provided in the package to connect it to your computer. Then visit Trezor.io/start in your web browser to begin the setup process."
    },
    {
      question: "Is Trezor.io/start secure?",
      answer: "Yes, Trezor.io/start is the official and secure website for setting up your Trezor device. Always ensure you're visiting the legitimate site by checking the URL and security certificate."
    },
    {
      question: "What if I lose my Trezor device?",
      answer: "If you lose your Trezor device, your funds remain secure as long as no one has access to your recovery seed. You can recover your wallet using your backup recovery seed on a new Trezor device or compatible wallet."
    }
  ];

  return (
    <div className="min-h-screen bg-grid">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Shield className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold gradient-text">Trézor.io</span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Features</a>
                <a href="#setup" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">Setup Guide</a>
                <a href="#faq" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">FAQ</a>
                <a href="https://trezor.io/learn" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium flex items-center">
                  Learn <ExternalLink size={14} className="ml-1" />
                </a>
              </div>
            </div>
            <div className="flex items-center">
              <a href="#start" className="hidden md:block btn-primary">
                Get Started
              </a>
              <button
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-md">
            <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">Features</a>
            <a href="#setup" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">Setup Guide</a>
            <a href="#faq" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">FAQ</a>
            <a href="https://trezor.io/learn" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium flex items-center">
              Learn <ExternalLink size={14} className="ml-1" />
            </a>
            <a href="#start" className="btn-primary block text-center mt-4 mx-3">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Trezor.io/start</span> - Your Gateway to Secure Digital Assets
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Begin your journey to uncompromised security with the official Trezor setup guide. 
              Protect your cryptocurrencies with the world's most trusted hardware wallet.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#start" className="btn-primary pulse">
                Start Setup Now
              </a>
              <a href="#learn" className="border border-gray-700 hover:border-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center">
                Learn More <ChevronRight size={16} className="ml-1" />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-3xl"></div>
            <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <Carousel items={carouselItems} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        ref={featuresRef}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-dots"
      >
        <div className={`transition-all duration-1000 delay-300 ${featuresVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">Trezor.io/start</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the advanced features that make Trezor the leading hardware wallet solution for securing your digital assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-6 glow">
              <div className="bg-blue-500/10 p-3 rounded-full w-fit mb-4">
                <Shield className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Military-Grade Security</h3>
              <p className="text-gray-300">
                Trezor.io/start guides you through setting up a device with the highest security standards, protecting your assets with advanced cryptography.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Offline storage keeps private keys secure</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>PIN protection prevents unauthorized access</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Recovery seed backup for disaster recovery</span>
                </li>
              </ul>
            </div>

            <div className="card p-6 glow">
              <div className="bg-purple-500/10 p-3 rounded-full w-fit mb-4">
                <Cpu className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Intuitive Setup Process</h3>
              <p className="text-gray-300">
                Trezor.io/start provides a user-friendly interface to guide you through the entire setup process, from initialization to backup.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Step-by-step visual instructions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Beginner-friendly interface</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Multi-language support</span>
                </li>
              </ul>
            </div>

            <div className="card p-6 glow">
              <div className="bg-cyan-500/10 p-3 rounded-full w-fit mb-4">
                <Lock className="h-6 w-6 text-cyan-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Complete Asset Control</h3>
              <p className="text-gray-300">
                With Trezor.io/start, you maintain full control of your digital assets while enjoying maximum security and peace of mind.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Support for 1000+ cryptocurrencies</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Direct integration with exchanges</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Regular firmware updates via Trezor.io/start</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Setup Guide Section */}
      <section 
        id="setup" 
        ref={stepsRef}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className={`transition-all duration-1000 delay-300 ${stepsVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Trezor.io/start</span> Setup Guide
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Follow these simple steps to set up your Trezor device and secure your digital assets in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-12">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">1</div>
                  <div className="card p-6">
                    <h3 className="text-xl font-bold mb-3 flex items-center">
                      <Smartphone className="mr-2 text-blue-500" /> Connect Your Device
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Visit Trezor.io/start and connect your Trezor device to your computer using the USB cable provided in the package.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                      <p className="text-sm text-gray-400">
                        <span className="text-yellow-500">Tip:</span> Make sure you're using the original USB cable that came with your device for optimal connection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">2</div>
                  <div className="card p-6">
                    <h3 className="text-xl font-bold mb-3 flex items-center">
                      <RefreshCw className="mr-2 text-blue-500" /> Install Firmware
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Follow the on-screen instructions at Trezor.io/start to install or update the latest firmware on your device.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                      <p className="text-sm text-gray-400">
                        <span className="text-yellow-500">Important:</span> Never disconnect your device during firmware installation as it may damage your device.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">3</div>
                  <div className="card p-6">
                    <h3 className="text-xl font-bold mb-3 flex items-center">
                      <Key className="mr-2 text-blue-500" /> Create Your Wallet
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Set up a new wallet or recover an existing one using your recovery seed through the Trezor.io/start interface.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
                      <p className="text-sm text-gray-400">
                        <span className="text-yellow-500">Security note:</span> Write down your recovery seed on the provided recovery seed card and store it in a safe place.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 bg-blue-800 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold">4</div>
                  <div className="card p-6">
                    <h3 className="text-xl font-bold mb-3 flex items-center">
                      <Zap className="mr-2 text-blue-500" /> Start Using Trezor
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Once setup is complete, you can start managing your cryptocurrencies securely through Trezor Suite or compatible wallets.
                    </p>
                    <a href="https://trezor.io/learn" className="text-blue-500 hover:text-blue-400 flex items-center">
                      Learn more about using your Trezor <ArrowRight size={16} className="ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="sticky top-24">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-3xl"></div>
                  <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                    <h3 className="text-2xl font-bold mb-6 gradient-text">Why Trezor.io/start Matters</h3>
                    <p className="text-gray-300 mb-6">
                      In today's digital world, securing your cryptocurrencies is more important than ever. Trezor.io/start provides the official, secure pathway to initialize your hardware wallet and protect your assets from online threats.
                    </p>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start">
                        <div className="bg-blue-500/10 p-2 rounded-full mr-3 mt-1">
                          <Shield className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Protection Against Phishing</h4>
                          <p className="text-sm text-gray-400">
                            Always verify you're on the official Trezor.io/start website to avoid phishing attempts.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-purple-500/10 p-2 rounded-full mr-3 mt-1">
                          <Lock className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Offline Security</h4>
                          <p className="text-sm text-gray-400">
                            Your private keys never leave your Trezor device, keeping them safe from online threats.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="bg-cyan-500/10 p-2 rounded-full mr-3 mt-1">
                          <RefreshCw className="h-5 w-5 text-cyan-500" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Regular Updates</h4>
                          <p className="text-sm text-gray-400">
                            Trezor.io/start ensures your device has the latest security features and cryptocurrency support.
                          </p>
                        </div>
                      </div>
                    </div>
                    <a href="#start" className="btn-primary w-full flex items-center justify-center">
                      Begin Your Secure Setup <ArrowRight size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        id="faq" 
        ref={faqRef}
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className={`transition-all duration-1000 delay-300 ${faqVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions About <span className="gradient-text">Trezor.io/start</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find answers to common questions about setting up and using your Trezor device.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <FAQ faqs={faqs} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="start" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-3xl"></div>
          <div className="relative bg-black/40 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-gray-800 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Secure Your Digital Assets with <span className="gradient-text">Trezor.io/start</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Take the first step towards uncompromised security for your cryptocurrencies. 
              Visit Trezor.io/start today and follow our simple setup guide.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://trezor.io/start" className="btn-primary pulse">
                Go to Trezor.io/start
              </a>
              <a href="https://trezor.io/learn" className="border border-gray-700 hover:border-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center">
                Learn More <ExternalLink size={16} className="ml-1" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold gradient-text">Trézor.io</span>
              </div>
              <p className="text-gray-400 mb-4">
                The most trusted hardware wallet for storing cryptocurrencies and digital assets.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Github size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Trezor Model T</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Trezor Model One</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Trezor Suite</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Accessories</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="https://trezor.io/start" className="text-gray-400 hover:text-white">Trezor.io/start</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Support Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Developer Portal</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 Trezor. All rights reserved. <a href="https://trezor.io/start" className="text-blue-500 hover:text-blue-400">Trezor.io/start</a>
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;