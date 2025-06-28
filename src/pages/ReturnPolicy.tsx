import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const sidebarLinks = [
  { name: "Return Policy", path: "/return-policy" },
  { name: "Terms of Service", path: "/terms-of-service" },
  { name: "Privacy Policy", path: "/privacy-policy" },
];

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 py-4 px-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-end justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <Heart className="w-8 h-8 text-pink-600" />
            <span className="text-2xl font-bold text-gray-800">Hibiscus</span>
          </Link>
          <span className="text-gray-600 text-lg tracking-wide">
            Hibiscus Policy Centre
          </span>
        </div>
      </nav>

      <section id="services" className="py-16 md:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <div className="relative min-h-screen flex items-start px-4">
            <aside className="w-64 bg-white border-r p-6">
              <nav>
                <ul className="space-y-2">
                  {sidebarLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.name === "Return Policy" ? link.path : ""}
                        className={`block px-4 py-2 rounded hover:bg-pink-100 transition-colors ${
                          link.name === "Return Policy"
                            ? "bg-pink-100 font-semibold text-pink-600"
                            : "text-gray-700"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
            <main className="flex-1 p-10">
              <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Refunds and Return Policy
              </h1>
              <section className="prose max-w-3xl">
                <h2 className="font-bold text-2xl">
                  1. Group Learning Arrangement
                </h2>
                <p>
                  For group-based learning, any holiday break or class
                  suspension shall only be scheduled through mutual agreement
                  among all group members. Students understand that such
                  decisions must be made collectively and with consensus.
                </p>
                <br />
                <h2 className="font-bold text-2xl">
                  2. Withdrawal from Group Learning
                </h2>
                <p>
                  For group-based learning, once the course package is signed,
                  no refund will be issued if Students withdraw from the course
                  due to personal reasons. Students to respect the group’s
                  collective decision to proceed with the course as scheduled.
                </p>
                <br />

                <h2 className="font-bold text-2xl">
                  3. Withdrawal from Individual Learning (Within First Two
                  Months)
                </h2>
                <p>
                  For individual learning, if Students decide to withdraw for
                  personal reasons after any session within the first or second
                  month, the respective month's fees are non-refundable. From
                  the third month onwards, a suspension of the account may be
                  considered only upon review and approval, provided that
                  reasonable grounds are submitted.
                </p>
                <br />

                <h2 className="font-bold text-2xl">
                  4. No Refund after Third Month
                </h2>
                <p>
                  For individual learning, once the course has reached the third
                  month, no refund or account suspension request will be
                  accepted, regardless of the number of sessions attended within
                  the month.
                </p>
                <br />

                <h2 className="font-bold text-2xl">
                  5. Refund Application and Review Procedure
                </h2>
                <p>
                  Any request for refunds or account suspension must be formally
                  submitted via email to the official Hibiscus Platform
                  headquarters. All supporting documents and justification must
                  be provided in full. Upon submission, the review process will
                  take a minimum of one (1) to three (3) months for assessment
                  and decision. Students are expected to wait patiently for the
                  outcome during this review period.
                </p>
                <br />

                <h2 className="font-bold text-2xl">
                  6. General Conduct and Communication
                </h2>
                <p>
                  Students to abide by all other policies and regulations set by
                  the Hibiscus platform. Students will treat the instructors and
                  staff with respect. Should any issues arise, Students will
                  raise them privately and discuss them with the Hibiscus
                  representative in a respectful and constructive manner.
                </p>
              </section>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}
