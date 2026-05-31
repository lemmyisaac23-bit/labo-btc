import { Link } from "react-router-dom";

const benefits = [
  "Sign-up Bonus: 30$",
  "Daily Payout, No risk of Lost",
  "Date and Fund security",
];

const BitcoinIllustration = () => (
  <div className="relative mx-auto flex h-72 w-full max-w-sm items-center justify-center md:h-80">
    <div className="absolute bottom-8 h-24 w-48 rotate-[-8deg] rounded-lg bg-gradient-to-br from-sky-200 to-blue-300 shadow-lg" />
    <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-500 shadow-xl">
      <span className="text-6xl font-bold text-white drop-shadow-md">₿</span>
    </div>
    <div className="absolute -right-2 top-8 h-16 w-16 rounded-full bg-orange-300/40 blur-xl" />
    <div className="absolute -left-4 bottom-16 h-20 w-20 rounded-full bg-blue-300/40 blur-xl" />
  </div>
);

export const CloudMiningSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="mb-8 font-serif text-4xl text-gray-900 md:text-5xl">
              Cloud Mining
            </h2>
            <ul className="mb-10 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#2563eb]" />
                  <span className="text-base text-gray-600 md:text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/signup"
              className="inline-block rounded-full bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition-all hover:shadow-lg hover:brightness-110"
            >
              Start Mining Now
            </Link>
          </div>
          <BitcoinIllustration />
        </div>
      </div>
    </section>
  );
};
