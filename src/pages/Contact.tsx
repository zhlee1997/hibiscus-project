import { Mail, Phone, MessageCircle, Image as ImageIcon } from "lucide-react";

function Contact() {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        HIBISCUS CULTURAL NETWORK
      </h1>
      <div className="text-gray-700 mb-1 text-sm">
        202503097229 (003717708-X)
      </div>
      <div className="text-gray-600 mb-4 text-sm">
        Block C, Level 3, Institute For Advanced Studies, Universiti Malaya,
        <br />
        59200 Kuala Lumpur, Wilayah Persekutuan.
      </div>

      <div className="space-y-5 mt-6">
        {/* Email */}
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-pink-600 mt-1" />
          <div>
            <div className="font-semibold text-gray-900">Email</div>
            <a
              href="mailto:hibiscuscultural@gmail.com"
              className="text-gray-700 hover:underline text-sm"
            >
              hibiscuscultural@gmail.com
            </a>
          </div>
        </div>
        {/* WhatsApp / Phone */}
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-pink-600 mt-1" />
          <div>
            <div className="font-semibold text-gray-900">WhatsApp / Phone</div>
            <a
              href="tel:+60176972914"
              className="text-gray-700 hover:underline text-sm"
            >
              +60 17-697 2914 (Phang)
            </a>
          </div>
        </div>
        {/* WeChat */}
        <div className="flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-pink-600 mt-1" />
          <div>
            <div className="font-semibold text-gray-900">WeChat</div>
            <div className="text-gray-700 text-sm">keanlapphang</div>
          </div>
        </div>
        {/* RedNote */}
        <div className="flex items-start gap-3">
          <ImageIcon className="w-5 h-5 text-pink-600 mt-1" />
          <div>
            <div className="font-semibold text-gray-900">RedNote</div>
            <div className="text-gray-700 text-sm">马来亚男孩 (HIBISCUS)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
