import React, { useState } from "react";
import {
  Globe2,
  Users,
  Mail,
  Phone,
  Languages,
  Heart,
  ChevronDown,
  Menu,
  X,
  Instagram,
} from "lucide-react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            <Heart className="w-8 h-8 text-pink-600" />
            <span className="text-2xl font-bold text-gray-800">Hibiscus</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-600 hover:text-pink-600 transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("experiences")}
              className="text-gray-600 hover:text-pink-600 transition-colors"
            >
              Experience
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-600 hover:text-pink-600 transition-colors"
            >
              Contact
            </button>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg py-4">
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={() => scrollToSection("services")}
                className="text-gray-600 hover:text-pink-600 transition-colors w-full px-6 py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("experiences")}
                className="text-gray-600 hover:text-pink-600 transition-colors w-full px-6 py-2"
              >
                Experience
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-gray-600 hover:text-pink-600 transition-colors w-full px-6 py-2"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header
        id="home"
        className="relative min-h-screen flex items-center px-4 pt-16"
      >
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-8 items-center">
          {/* Left side - Text Content */}
          <div className="text-left order-2 md:order-1">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 md:w-12 h-8 md:h-12 text-pink-600" />
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
                Hibiscus
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 mb-6 md:mb-8">
              Discover Malaysian Culture Through Language
            </p>
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <Globe2 className="w-5 md:w-6 h-5 md:h-6 text-pink-600" />
              <p className="text-base md:text-lg text-gray-700">
                Bridging Cultures Through Language Education
              </p>
            </div>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-pink-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-pink-700 transition-colors text-sm md:text-base"
            >
              Start Learning
            </button>
          </div>

          {/* Right side - Image */}
          <div className="relative h-[300px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2">
            <img
              src="https://images.squarespace-cdn.com/content/v1/5919f7bfd2b857811c061c2f/1552499905347-O03AQH2ZJH83FZO1YNVT/petronas-twin-towers-malaysia.jpg?format=1000w"
              alt="Petronas Twin Towers"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-gray-600">
            <p className="text-sm font-medium">Scroll Down</p>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="p-6 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors">
              <Languages className="w-10 md:w-12 h-10 md:h-12 text-pink-600 mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Language Classes
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Interactive Malay language lessons tailored for beginners to
                advanced learners.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors">
              <Users className="w-10 md:w-12 h-10 md:h-12 text-pink-600 mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Cultural Immersion
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Experience Malaysian traditions, customs, and daily life through
                engaging activities.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors">
              <Heart className="w-10 md:w-12 h-10 md:h-12 text-pink-600 mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Community Events
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Join our vibrant community events and practice Malay in a fun,
                supportive environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-16 md:py-20 px-4 bg-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">
            Learning Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="resources/photo_1.jpg"
                alt="Language Learning"
                className="w-full h-48 md:h-64 object-contain"
              />
              <div className="p-6 bg-white">
                <h3 className="text-lg md:text-xl font-semibold mb-3">
                  Traditional Vocal Class
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Engaging language practice through group activities and
                  cultural exchange.
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="resources/photo_2.jpg"
                alt="Language Learning"
                className="w-full h-48 md:h-64 object-contain"
              />
              <div className="p-6 bg-white">
                <h3 className="text-lg md:text-xl font-semibold mb-3">
                  Interactive Sessions
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Engaging language practice through group activities and
                  cultural exchange.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="flex items-center gap-4">
              <Mail className="w-5 md:w-6 h-5 md:h-6 text-pink-600" />
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  contact@hibiscus-edu.my
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 md:w-6 h-5 md:h-6 text-pink-600" />
              <div>
                <h3 className="font-semibold">Phone</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  +60 17-697 2914 (Phang)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 md:py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-5 md:w-6 h-5 md:h-6 text-pink-400" />
            <h3 className="text-xl md:text-2xl font-bold">Hibiscus</h3>
          </div>
          <p className="text-gray-400 text-sm md:text-base">
            © 2025 Hibiscus Language Education. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
