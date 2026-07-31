export const consultationContent = {
  hero: {
    eyebrow: "Expert Human Consultation",
    title: "Tell us where you need clarity.",
    description:
      "Share your destination, visa purpose and current situation. A Visaworx expert will review the context before speaking with you.",
  },
  reassurance: [
    "Usually takes a few minutes.",
    "No login required.",
    "Your request is reviewed by a human.",
    "This is not a visa application.",
  ],
  steps: [
    { step: 1, label: "Destination" },
    { step: 2, label: "Service" },
    { step: 3, label: "Situation" },
    { step: 4, label: "Contact Details" },
    { step: 5, label: "Review" },
  ],
  consentText:
    "I agree that Visaworx may contact me regarding this consultation request. I understand that this is not a visa application and does not guarantee approval.",
  privacyLinkText: "Klar Travels Privacy Policy",
  submitButtonText: "Request Consultation",
  disclaimer:
    "Submitting a consultation request provides information for an expert discussion. It is not an official visa application and does not guarantee appointment availability, fee waivers, or visa approval.",
  success: {
    heading: "Your consultation request has been received.",
    supportingCopy:
      "A Visaworx team member will review the information you shared and contact you through your preferred method.",
    whatHappensNext: [
      { step: 1, title: "Request Review", desc: "Our team reviews your travel details and background context." },
      { step: 2, title: "Team Outreach", desc: "A consultant contacts you via your preferred channel." },
      { step: 3, title: "Expert Discussion", desc: "Discuss your preparation, document evidence, and strategy." },
      { step: 4, title: "Clear Next Steps", desc: "Receive actionable recommendations for your visa journey." },
    ],
    importantNote:
      "Submitting a consultation request is not a visa application and does not guarantee appointment availability or visa approval.",
  },
} as const;
