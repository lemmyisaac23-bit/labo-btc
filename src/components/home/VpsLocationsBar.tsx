const VPS_LOCATIONS = [
  "VPS Los Angeles",
  "VPS Atlanta",
  "VPS Ashburn",
  "VPS Düsseldorf",
  "VPS Frankfurt",
  "Netherlands",
  "Poland",
  "Estonia",
  "CYPRUS",
  "Sweden",
  "Hong Kong",
  "Romania",
  "Israel",
];

export const VpsLocationsBar = () => {
  return (
    <section className="border-b border-gray-100 bg-white py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1e4a8a]">
            Bitcoin VPS
          </span>
          <span className="hidden h-4 w-px bg-gray-200 sm:block" />
          {VPS_LOCATIONS.map((location) => (
            <span
              key={location}
              className="text-xs text-gray-500 transition-colors hover:text-[#1e4a8a]"
            >
              {location}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
