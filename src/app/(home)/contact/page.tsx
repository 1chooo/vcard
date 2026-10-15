"use client";

import React, { useEffect } from "react";

import PageTitle from "@/components/page-title";
import ContactSection from "@/components/section/contact";

import config from "@/config";

const { title } = config;

/**
 * TODO: #341 still need to update with another method to avoid client side not available metadata
 * export const metadata: Metadata = {
 *   title: `Contact | ${title}`,
 * };
 */

function Contact() {
  useEffect(() => {
    document.title = `Contact | ${title}`;
  }, [title]);

  return (
    <article>
      <PageTitle title="Contact Me" />
      <ContactSection />
    </article>
  );
}

export default Contact;
