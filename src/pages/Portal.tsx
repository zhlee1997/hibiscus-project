import { useState, useEffect, useRef } from "react";
import {
  Heart,
  FileText,
  User,
  BarChart2,
  History,
  Briefcase,
  ListChecksIcon,
  BriefcaseIcon,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useAuthenticatedApi } from "../hooks/useAuthenticatedApi";
import { SubscriptionResponse } from "../types/subscription";

interface SubscriptionUI {
  id: string;
  customerId: string;
  status: "active" | "incomplete" | "past_due" | "canceled" | "unpaid";
  amount: number;
  currency: string;
  currentPeriodStart: number; // UNIX timestamp
  currentPeriodEnd: number; // UNIX timestamp
  interval: "month" | "year";
}

function mapSubscriptionResponseToUI(
  res: SubscriptionResponse
): SubscriptionUI {
  const item = res.subscription.items.data[0];

  return {
    id: res.subscription.id,
    customerId: res.subscription.customer,
    status: res.subscription.status,
    amount: item.price.unit_amount,
    currency: res.subscription.currency,
    currentPeriodStart: item.current_period_start,
    currentPeriodEnd: item.current_period_end,
    interval: item.price.recurring.interval,
  };
}

const quicklinks = [
  {
    icon: <History className="w-7 h-7 text-pink-600" />,
    label: "Transaction History",
    url: "/portal/history",
  },

  {
    icon: <FileText className="w-7 h-7 text-pink-600" />,
    label: "Download Latest Receipt",
    url: "",
  },
  {
    icon: <User className="w-7 h-7 text-pink-600" />,
    label: "Manage My Profile",
    url: "/portal/profile",
  },
  {
    icon: <BriefcaseIcon className="w-7 h-7 text-pink-600" />,
    label: "Contact Us",
    url: "/portal/contact",
  },
];

function Portal() {
  const location = useLocation();
  const isProfilePage = location.pathname === "/portal/profile";
  const isHistoryPage = location.pathname === "/portal/history";
  const isContactPage = location.pathname === "/portal/contact";

  const { user, logout } = useAuth();
  const { apiCall } = useAuthenticatedApi();

  const [subscription, setSubscription] = useState<SubscriptionUI>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiCall("/user/subscription");
        const data: SubscriptionResponse = await response.json();
        // console.log("data: " + data.subscription.id);
        setSubscription(mapSubscriptionResponseToUI(data));
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      }
    };
    fetchTransactions();
  }, []);

  // Function to get the latest receipt url
  const getLatestReceiptUrl = async (): Promise<string> => {
    try {
      const response = await apiCall("/receipt/latest");
      const data = await response.json();
      console.log("data", data);
      return data.receipt.receipt_url;
    } catch (error) {
      console.error("Failed to get latest receipt url", error);
      throw error; // Re-throw the error since we can't return a valid URL
    }
  };

  // Convert timestamp to Locale
  const convertTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp * 1000); // convert seconds to milliseconds

    const formatted = date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    return formatted;
  };

  // Convert ISOString to Locale
  const convertISOString = (isoString: string): string => {
    const date = new Date(isoString);

    const formatted = date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    return formatted;
  };

  const convertCurrentTime = (): string => {
    const date = new Date(Date.now());

    const formatted = date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-");

    return formatted;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-12 md:w-24 bg-white border-r border-gray-200 flex flex-col items-center py-6 space-y-8 shadow-sm h-full fixed left-0 top-0">
        <div className="flex flex-col items-center gap-2 mb-8">
          <Heart className="w-10 h-10 text-pink-600" />
          <span className="text-lg font-bold text-gray-800 hidden md:block">
            Hibiscus
          </span>
        </div>
        <nav className="flex flex-col gap-6 w-full items-center">
          <Link
            to="/portal"
            className={`flex flex-col items-center ${
              location.pathname === "/portal"
                ? "text-pink-600 font-semibold"
                : "text-gray-500"
            } group`}
          >
            <span
              className={`${
                location.pathname === "/portal" ? "bg-pink-100" : ""
              } p-2 rounded-xl mb-1`}
            >
              <BarChart2 className="w-6 h-6" />
            </span>
            <span className="text-xs hidden md:block">Home</span>
          </Link>
          <Link
            to="/portal/profile"
            className={`flex flex-col items-center ${
              location.pathname === "/portal/profile"
                ? "text-pink-600 font-semibold"
                : "text-gray-500"
            } group`}
          >
            <span
              className={`${
                location.pathname === "/portal/profile" ? "bg-pink-100" : ""
              } p-2 rounded-xl mb-1`}
            >
              <User className="w-6 h-6" />
            </span>
            <span className="text-xs hidden md:block">Profile</span>
          </Link>
          <Link
            to="/portal/history"
            className={`flex flex-col items-center ${
              location.pathname === "/portal/history"
                ? "text-pink-600 font-semibold"
                : "text-gray-500"
            } group`}
          >
            <span
              className={`${
                location.pathname === "/portal/history" ? "bg-pink-100" : ""
              } p-2 rounded-xl mb-1`}
            >
              <History className="w-6 h-6" />
            </span>
            <span className="text-xs hidden md:block">History</span>
          </Link>
          <Link
            to="/portal/contact"
            className={`flex flex-col items-center ${
              location.pathname === "/portal/contact"
                ? "text-pink-600 font-semibold"
                : "text-gray-500"
            } group`}
          >
            <span
              className={`${
                location.pathname === "/portal/contact" ? "bg-pink-100" : ""
              } p-2 rounded-xl mb-1`}
            >
              <Briefcase className="w-6 h-6" />
            </span>
            <span className="text-xs hidden md:block">Contact</span>
          </Link>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen ml-12 md:ml-24 overflow-y-auto">
        {/* Top Bar */}
        <header className="flex items-center justify-between bg-white px-8 py-4 border-b border-gray-200 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-lg text-gray-500">
              AS AT {convertCurrentTime()}
            </span>
          </div>
          <div className="relative flex items-center gap-4" ref={dropdownRef}>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700 hover:cursor-pointer"
            >
              {user?.fullName?.charAt(0)}
            </div>
            {isOpen && (
              <div className="absolute right-0 mt-20 w-32 bg-white border border-gray-200 rounded shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>
        {/* Dashboard Content */}
        <main className="flex-1 p-6 md:p-10 bg-gray-50 overflow-y-auto">
          {isProfilePage || isHistoryPage || isContactPage ? (
            <Outlet />
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Welcome Card */}
                <div className="col-span-2 bg-indigo-600 rounded-xl p-6 flex flex-col justify-between shadow-lg text-white relative overflow-hidden">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Welcome back, {user?.fullName}!
                    </h2>
                    <p className="mb-2">
                      You have subscribed and signed up as a member since{" "}
                      <span className="font-bold">{user?.created_at}</span>.
                      <br />
                      Keep it up and improve your language proficiency with us.
                    </p>
                    <p className="text-sm opacity-80">
                      As at {convertCurrentTime()}
                    </p>
                  </div>
                  <div className="absolute right-4 bottom-4 hidden md:block">
                    {/* Illustration placeholder */}
                    <div className="w-32 h-32 bg-indigo-400 rounded-full opacity-30"></div>
                  </div>
                </div>
                {/* Account Summary */}
                <div className="bg-white rounded-xl p-6 shadow-lg flex flex-col gap-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-700">
                      Account Summary
                    </span>
                    <a
                      href="#"
                      className="text-xs text-gray-400 hover:underline"
                    >
                      ↗
                    </a>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between text-sm">
                      <span>Active Courses</span>
                      <span className="font-bold">1</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>First Sign Up Date</span>
                      <span className="font-bold text-gray-900">
                        {user?.created_at !== undefined
                          ? convertISOString(user.created_at)
                          : ""}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Payment Date</span>
                      <span className="font-bold text-gray-900">
                        {subscription?.currentPeriodStart !== undefined
                          ? convertTimestamp(subscription.currentPeriodStart)
                          : ""}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next Payment Date</span>
                      <span className="font-bold text-green-600">
                        {subscription?.currentPeriodEnd !== undefined
                          ? convertTimestamp(subscription.currentPeriodEnd)
                          : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Quicklinks & Insurance */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Quicklinks */}
                <div className="col-span-2 bg-white rounded-xl p-6 shadow-lg">
                  <div className="font-semibold text-gray-700 mb-4">
                    Quick Links
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {quicklinks.map((q, i) => (
                      <Link
                        to={q.url}
                        onClick={async () => {
                          // if "Download Latest Receipt"
                          if (!q.url) {
                            const url = await getLatestReceiptUrl();
                            window.open(url);
                          }
                        }}
                        key={i}
                        className="flex flex-col items-center gap-2 cursor-pointer group"
                      >
                        <div className="bg-pink-100 p-3 rounded-full mb-1 group-hover:bg-pink-200 transition">
                          {q.icon}
                        </div>
                        <span className="text-xs text-gray-700 text-center font-medium group-hover:text-pink-600 transition">
                          {q.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Insurance Coverage */}
                <div className="bg-teal-200 rounded-xl p-6 shadow-lg flex flex-col items-start justify-between">
                  <div className="flex items-center gap-3 mb-2">
                    <ListChecksIcon className="w-7 h-7 text-teal-700" />
                    <span className="font-semibold text-teal-900">
                      Checklist Coverage
                    </span>
                  </div>
                  <p className="text-teal-900">Feature coming soon.</p>
                  <div className="flex-1 flex items-end w-full justify-end">
                    <div className="w-20 h-20">
                      <svg viewBox="0 0 64 64" fill="none">
                        <circle
                          cx="32"
                          cy="32"
                          r="32"
                          fill="#fff"
                          fillOpacity="0.2"
                        />
                        <path
                          d="M32 16C23.1634 16 16 23.1634 16 32C16 40.8366 23.1634 48 32 48C40.8366 48 48 40.8366 48 32C48 23.1634 40.8366 16 32 16ZM32 44C25.3726 44 20 38.6274 20 32C20 25.3726 25.3726 20 32 20C38.6274 20 44 25.3726 44 32C44 38.6274 38.6274 44 32 44Z"
                          fill="#14b8a6"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              {/* Performance & Holdings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Account Holdings */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="font-semibold text-gray-700 mb-4">
                    Assigned Teachers
                  </div>
                  <div className="w-full h-40 flex items-center justify-center text-gray-400">
                    [Feature coming soon]
                  </div>
                </div>
                {/* Yearly Investment Performance */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="font-semibold text-gray-700 mb-4">
                    Your Monthly Performance
                  </div>
                  <div className="w-full h-40 flex items-center justify-center text-gray-400">
                    [Feature coming soon]
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Portal;
