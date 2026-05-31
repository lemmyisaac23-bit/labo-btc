import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    quote:
      "BtcCloudBase is a company which offers highly technological UK solutions for easy Bitcoin cloud mining.",
    author: "Phillip",
  },
  {
    quote:
      "I am greatly impressed with this hosting. For me, it is the best hosting I have ever used. I mostly liked how fast it works.",
    author: "Garcia",
  },
  {
    quote:
      "The interface is easy to understand even for a beginner. I found all the necessary features at once without a delay. I got some issues with the FTP, but it was my fault. The customer support helped me, and I understood how to do it.",
    author: "Joseph",
  },
];

export const ReviewsSection = () => {
  const [active, setActive] = useState(0);
  const review = reviews[active];

  const prev = () => setActive((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setActive((i) => (i === reviews.length - 1 ? 0 : i + 1));

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white px-6 py-12 shadow-sm md:px-12 md:py-16">
          <h2 className="mb-10 text-center font-serif text-2xl text-gray-900 md:text-3xl">
            Reviews BtcCloudBase
          </h2>
          <div className="relative text-center">
            <span className="pointer-events-none absolute -left-2 -top-6 select-none font-serif text-7xl text-[#2563eb]/15 md:-left-4">
              &ldquo;
            </span>
            <span className="pointer-events-none absolute -bottom-10 -right-2 select-none font-serif text-7xl text-[#2563eb]/15 md:-right-4">
              &rdquo;
            </span>
            <p className="relative mx-auto max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
              {review.quote}
            </p>
            <p className="mt-8 text-lg font-semibold text-gray-900">{review.author}</p>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-[#2563eb] hover:text-[#2563eb]"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === active ? "bg-[#2563eb]" : "bg-gray-300"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-[#2563eb] hover:text-[#2563eb]"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
