import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export const LandingChatWidget = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3">
      {open && (
        <div className="relative max-w-[280px] rounded-xl border border-gray-100 bg-white p-4 shadow-xl">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
            aria-label="Close chat message"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex gap-3 pr-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563eb]/10 text-sm font-semibold text-[#2563eb]">
              CS
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-gray-900">Customer Support</p>
              <p className="text-xs leading-relaxed text-gray-500">
                Welcome to our site. If you need help simply reply to this message, we are online
                and ready to help.
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-lg transition-transform hover:scale-105"
        aria-label="Open chat"
      >
        <MessageCircle className="h-6 w-6" />
        {!open && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold">
            1
          </span>
        )}
      </button>
    </div>
  );
};
