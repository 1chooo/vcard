"use client";

import React, { useRef } from "react";
import { Send } from "lucide-react";
import { sendGTMEvent } from "@next/third-parties/google";

import "@/styles/contact/map-box.css";

interface ContactSectionProps {
  demo?: boolean;
}

function ContactSection({ demo = false }: ContactSectionProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [result, setResult] = React.useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (demo) {
      setResult("Form Submitted Successfully");
      event.currentTarget.reset();
      return;
    }

    sendGTMEvent({ event: "message submit", value: inputRef.current?.value });

    setResult("Sending....");
    const formData = new FormData(event.currentTarget);

    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "",
    );

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.currentTarget.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section className="mb-[10px]">
      <div className="mapbox" data-mapbox="true">
        <figure>
          <iframe
            title="map address"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1653.447790694502!2d-118.29153251133746!3d34.02089114329221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7fb61e73c2d%3A0xe6fd0a5832af7b29!2sUSC%20Viterbi%20School%20of%20Engineering!5e0!3m2!1sen!2stw!4v1749014215095!5m2!1sen!2stw"
            width="400"
            height="300"
            loading="lazy"
          ></iframe>
        </figure>
      </div>

      <h3 className="text-white-2 text-2xl font-bold mb-[20px]">Contact Form</h3>
      <form onSubmit={onSubmit} className="form">
        <div className="input-wrapper">
          <input
            type="text"
            name="Full Name"
            className="form-input"
            placeholder="Full name"
            required
          />
          <input
            type="email"
            name="Email"
            className="form-input"
            placeholder="Email address"
            required
          />
        </div>
        <textarea
          name="Message"
          className="form-input"
          placeholder="Your Message"
          required
          ref={inputRef}
        ></textarea>
        <button
          className="form-btn"
          type="submit"
          disabled={result === "Sending...."}
        >
          <Send />
          <span>
            {result === ""
              ? "Send Message"
              : result === "Sending...."
                ? "Sending..."
                : result === "Form Submitted Successfully"
                  ? "Message Sent!"
                  : result}
          </span>
        </button>
      </form>
    </section>
  );
}

export { ContactSection };
export default ContactSection;
