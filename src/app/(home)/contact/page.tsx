import type { Metadata } from "next";

import PageTitle from "@/components/page-title";
import ContactSection from "@/components/section/contact";

import config from "@/config";

export const metadata: Metadata = {
  title: `Contact | ${config.title}`,
};

function Contact() {
  return (
    <article>
      <PageTitle title="Contact Me" />
      <ContactSection />
    </article>
  );
}

export default Contact;
