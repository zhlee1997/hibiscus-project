import { useState } from "react";
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
  Link,
  SchoolIcon,
  SpeakerIcon,
  WorkflowIcon,
  MessageCircleIcon,
  MessageSquareCodeIcon,
} from "lucide-react";
import { TypeAnimation } from "react-type-animation";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const services = [
    {
      title: "Consultation & Customization",
      description:
        "Understanding client needs and tailoring educational solutions",
    },
    {
      title: "In-Person Training",
      description:
        "20 classroom sessions to help students master a complete language system",
    },
    {
      title: "Online Dialogue Practice",
      description: "Regular online review sessions to reinforce course content",
    },
    {
      title: "Cultural Activities",
      description:
        "On-site cultural experiences to deepen understanding through classic case studies",
    },
    {
      title: "Member Networking",
      description:
        "Building friendship circles among businesspeople and professionals",
    },
  ];

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
              onClick={() => scrollToSection("target")}
              className="text-gray-600 hover:text-pink-600 transition-colors"
            >
              Targets
            </button>
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
              Training
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-600 hover:text-pink-600 transition-colors"
            >
              Contact
            </button>
            <a
              href="https://www.xiaohongshu.com/user/profile/63ed8cf00000000026013ac9?xsec_token=ABWWhirHZgIVMwnASFCxxt_E0UwHVz_tQIHr7gDB_BeJA%3D&xsec_source=pc_search"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-600 transition-colors"
            >
              <Link className="w-5 h-5" />
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
                onClick={() => scrollToSection("target")}
                className="text-gray-600 hover:text-pink-600 transition-colors w-full px-6 py-2"
              >
                Target
              </button>
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
                Training
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
              Professional Malay dialogue and cultural training
            </p>
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <Globe2 className="w-5 md:w-6 h-5 md:h-6 text-pink-600" />
              {/* <p className="text-base md:text-lg text-gray-700">
                Bridging Cultures Through Language Education
              </p> */}
              <TypeAnimation
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "We offer systematic training",
                  1500, // wait 1s before replacing "Mice" with "Hamsters"
                  "We offer cultural exchanges",
                  1500,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: "1.5rem", color: "#4a5568" }}
                repeat={Infinity}
              />
            </div>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-pink-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full hover:bg-pink-700 transition-colors text-sm md:text-base"
            >
              Start Learning
            </button>
          </div>

          {/* Right side - Image */}
          <div className="order-1 md:order-2 rounded-2xl overflow-hidden shadow-2xl">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              interval={3000}
              transitionTime={800}
              showArrows={false}
              swipeable
              emulateTouch
              className="rounded-2xl"
            >
              {[
                "/resources/pic2.jpeg",
                "/resources/pic1.jpeg",
                "/resources/pic3.jpeg",
                "/resources/pic4.jpeg",
              ].map((url, index) => (
                <div key={index} className="relative h-[300px] md:h-[500px]">
                  <img
                    src={url}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
              ))}
            </Carousel>
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

      {/* Target Groups Section */}
      <section id="target" className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">
            Our Targets
          </h2>
          <div className="text-center mb-8">
            <p className="text-xl md:text-2xl text-gray-600">
              Through short-term systematic learning, build your own language
              thinking ability
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-pink-50 border-2 border-transparent hover:border-pink-300 transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
                Academic Students
              </h3>
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src="https://www.graduateprogram.org/wp-content/uploads/2021/04/Apr-19-How-to-Tackle-Academic-Language-with-Your-Students_web-1024x682.jpg"
                  alt="Academic Students"
                  className="w-full h-64 object-cover object-top"
                />
              </div>
              <ul className="text-gray-600">
                <li className="text-lg text-center">Undergraduate Students</li>
                <li className="text-lg text-center">
                  Postgraduates Students (Master & PhD)
                </li>
                <li className="text-sm mt-6">* UM, UKM, Taylor's, Sunway</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-pink-50 border-2 border-transparent hover:border-pink-300 transition duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
                Professionals
              </h3>
              <div className="mb-4 rounded-lg overflow-hidden">
                <img
                  src="https://www.thehrdigest.com/wp-content/uploads/2020/04/Top-Careers-HR-Professionals.jpg"
                  alt="Professionals"
                  className="w-full h-64 object-cover object-top"
                />
              </div>
              <ul className="text-gray-600">
                <li className="text-lg text-center">Expatriates</li>
                <li className="text-lg text-center">
                  Corporate Professionals (GLC & Private Company)
                </li>
                <li className="text-sm mt-6">
                  * Infrastructure, Technology, Green Energy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">
            Our Services
          </h2>
          <div className="text-center mb-8">
            <p className="text-xl md:text-2xl text-gray-600">
              Help you unlock smooth communication other than your mother tongue
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="p-6 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors">
              <Languages className="w-10 md:w-12 h-10 md:h-12 text-pink-600 mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Malay conversation training
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Through systematic training, you can master Malay conversation
                in a short time. The complete learning content covers
                pronunciation, grammar and usage courses to help students
                smoothly switch from their native language to daily
                conversations in other languages.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors">
              <Users className="w-10 md:w-12 h-10 md:h-12 text-pink-600 mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Cultural exchange activities
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Guide foreigners to understand local culture and background
                through activities and visits, and better integrate into local
                society. Let members from different countries know each other,
                establish a circle of friendship, and benefit each other.
              </p>
            </div>
            {/* <div className="p-6 rounded-xl bg-pink-50 hover:bg-pink-100 transition-colors">
              <Heart className="w-10 md:w-12 h-10 md:h-12 text-pink-600 mb-4" />
              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Community Events
              </h3>
              <p className="text-gray-600 text-sm md:text-base">
                Join our vibrant community events and practice Malay in a fun,
                supportive environment.
              </p>
            </div> */}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="py-16 md:py-20 px-4 bg-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">
            Training Plan & Process
          </h2>

          {/* Top 3 Boxes in a Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {services.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-2xl p-6 shadow-sm text-center bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-pink-300"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Bottom 2 Boxes in Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.slice(3).map((item, index) => (
              <div
                key={index + 3}
                className="border border-gray-300 rounded-2xl p-6 shadow-sm text-center bg-white transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-pink-300"
              >
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 mb-2">
            <p className="text-lg md:text-2xl text-gray-600">
              How does the Training Process work?
            </p>
          </div>

          <VerticalTimeline>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="First Step"
              iconStyle={{ background: "rgb(255,105,180)", color: "#fff" }}
              icon={<SpeakerIcon />}
            >
              <h3 className="vertical-timeline-element-title">Pronunciation</h3>
              <p>
                Scan students' pronunciation gaps through layered analysis,
                provide targeted training and corrections, and master the
                accurate pronunciation of the language in a short period of
                time.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="Second Step"
              iconStyle={{ background: "rgb(255,105,180)", color: "#fff" }}
              icon={<SchoolIcon />}
            >
              <h3 className="vertical-timeline-element-title">Grammar</h3>
              <p>
                Architectural and functional anatomy and grammatical structure,
                concisely grasp the operational logic and core content of Malay
                language.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="Third Step"
              iconStyle={{ background: "rgb(255,105,180)", color: "#fff" }}
              icon={<WorkflowIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                Implementation
              </h3>
              <p>
                Through the three-stage conversion of mother tongue to foreign
                language implementation, students' language patterns are
                analyzed so that he/she can smoothly use foreign languages in
                daily life.
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-20 px-4 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-gray-800">
          Contact Us
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Want to speak to us?</h2>
            <p className="text-gray-600 mb-8">
              Talk to our customer support for other general product inquiries.
              We'd love to hear from you!
            </p>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone number<span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                    <option value="malaysia">Malaysia</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="+60"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="enquiry"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Enquiry product<span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2 w-full">
                  <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white">
                    <option value="malay">Malay Conversation Training</option>
                    <option value="culture">
                      Cultural Exchange Activities
                    </option>
                    <option value="company">Company Training</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder="General enquiry, technical support, etc."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message<span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Please describe your inquiry or the issues you're facing."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-emerald-500 text-white px-8 py-2 rounded-full hover:bg-emerald-600 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Company Information */}
          <div className="bg-white p-6 rounded-lg">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <h1 className="text-xl md:text-3xl text-gray-800">
                  HIBISCUS CULTURAL NETWORK
                </h1>
              </div>
              <p className="text-gray-600 mb-2">202503097229 (003717708-X)</p>
              <p className="text-gray-600">
                Block C, Level 3, Institute For Advanced Studies, Universiti
                Malaya, 59200 Kuala Lumpur, Wilayah Persekutuan.
              </p>
            </div>

            <div className="space-y-6">
              <a
                href="mailto:hibiscuscultural@gmail.com"
                className="flex items-center gap-4 cursor-pointer"
              >
                <Mail className="w-5 md:w-6 h-5 md:h-6 text-pink-600" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    hibiscuscultural@gmail.com
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+60176972914"
                className="flex items-center gap-4 cursor-pointer"
              >
                <Phone className="w-5 md:w-6 h-5 md:h-6 text-pink-600" />
                <div>
                  <h3 className="font-semibold">WhatsApp / Phone</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    +60 17-697 2914 (Phang)
                  </p>
                </div>
              </a>

              {/* WeChat */}
              <div
                onClick={() => {
                  navigator.clipboard.writeText("keanlapphang");
                  window.alert("Copied to clipboard");
                }}
                className="flex items-center gap-4 cursor-pointer"
              >
                <MessageCircleIcon className="w-5 md:w-6 h-5 md:h-6 text-pink-600" />
                <div>
                  <h3 className="font-semibold">WeChat</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    keanlapphang
                  </p>
                </div>
              </div>

              {/* RedNote */}
              <div
                onClick={() => {
                  navigator.clipboard.writeText("马来亚男孩 (HIBISCUS)");
                  window.alert("Copied to clipboard");
                }}
                className="flex items-center gap-4 cursor-pointer"
              >
                <MessageSquareCodeIcon className="w-5 md:w-6 h-5 md:h-6 text-pink-600" />
                <div>
                  <h3 className="font-semibold">RedNote</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    马来亚男孩 (HIBISCUS)
                  </p>
                </div>
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
            Copyright © 2025 HIBISCUS CULTURAL NETWORK. 202503097229
            (003717708-X). All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
