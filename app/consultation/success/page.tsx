import type { Metadata } from "next";
import { ConsultationSuccessPage } from "../../../features/consultation/ConsultationSuccessPage";

export const metadata: Metadata = {
  title: "Consultation Request Received | Visaworx",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConsultationSuccessRoute() {
  return <ConsultationSuccessPage />;
}
