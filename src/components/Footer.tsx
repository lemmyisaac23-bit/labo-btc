import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

const TelegramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z" />
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="dark" />
          </div>

          <div>
            <h5 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/90">
              Popular Links
            </h5>
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <Link to="/signup" className="uppercase tracking-wide hover:text-gray-900 transition-colors">
                  Start Mining Now
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@btccloudbase.com"
                  className="uppercase tracking-wide hover:text-gray-900 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <Link to="/about-us" className="uppercase tracking-wide hover:text-gray-900 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-white/90">
              Contacts
            </h5>
            <div className="space-y-3 text-sm leading-relaxed text-white/70">
              <p className="font-medium text-white/90">BtcCloudBase</p>
              <p>
                Telegram:{" "}
                <a
                  href="https://t.me/+dz1QVygXLJxlNzc0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 transition-colors"
                >
                  Join Telegram Group
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:support@btccloudbase.com"
                  className="hover:text-gray-900 transition-colors"
                >
                  support@btccloudbase.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex flex-col items-start lg:items-center">
            <a
              href="https://t.me/+dz1QVygXLJxlNzc0"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0088cc] transition-transform group-hover:scale-105">
                <TelegramIcon className="h-8 w-8 text-white" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                Telegram
              </span>
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-white/50">
          Copyright © 2020–2026 BtcCloudBase. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
