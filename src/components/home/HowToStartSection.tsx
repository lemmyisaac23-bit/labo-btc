import { Coins, ShieldCheck, Monitor } from "lucide-react";

const steps = [
  {
    icon: Coins,
    tag: "RDP Root access",
    title: "Register",
    description:
      "Complete account registration at BtcCloudBase — it'll take just a few minutes.",
  },
  {
    icon: ShieldCheck,
    tag: "SSD ready",
    title: "Buy a Contract",
    description:
      "Choose the most profitable contract and pay for it using BTC, ETH, TRX, USDT, etc... (Payment can be made in any cryptocurrency)",
  },
  {
    icon: Monitor,
    tag: "Highly scalable",
    title: "Get Paid",
    description:
      "Withdraw the mining profit from your account balance anytime you want.",
  },
];

export const HowToStartSection = () => {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="mb-14 text-center font-serif text-3xl text-gray-900 md:text-4xl">
          How to Start Mining?
        </h2>
        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#2563eb]/30 bg-[#2563eb]/5">
                <step.icon className="h-8 w-8 text-[#2563eb]" strokeWidth={1.5} />
              </div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[#2563eb]">
                {step.tag}
              </p>
              <h3 className="mb-3 text-lg font-bold text-gray-900">{step.title}</h3>
              <p className="mx-auto max-w-xs text-sm leading-relaxed text-gray-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
