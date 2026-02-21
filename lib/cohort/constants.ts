export const COHORT_CONFIG = {
  name: "Ship With AI",
  price: {
    ngn: 40_000,
    usd: 30,
  },
  startDate: "February 25, 2026",
  spots: 50,
  duration: "2 weeks",
  whatsappLink:
    "https://wa.me/2348149249926?text=Hi%2C%20I%27d%20like%20to%20ask%20about%20the%20Ship%20With%20AI%20cohort",
  whatsappGroupLink: "https://chat.whatsapp.com/IrzCfLNRJo5BzaNSqTay8G",
  resources: [
    {
      title: "Week 1 — Learn the tools & build",
      description: "Pick your AI coding tool. Write your PRD. Scaffold your project.",
      link: "#",
    },
    {
      title: "Week 2 — Polish & ship",
      description: "Responsive design. Loading states. Error handling. Deploy.",
      link: "#",
    },
  ],
} as const;

export const COOKIE_NAMES = {
  otpChallenge: "cohort_otp_challenge",
  session: "cohort_session",
} as const;
