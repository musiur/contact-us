"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

export default function Home() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_SERVICE_ID || "",
          process.env.NEXT_PUBLIC_TEMPLATE_ID || "",
          form?.current || "",
          {
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY || "",
          }
        )
        .then(
          () => {
            console.log("SUCCESS!");
            setLoading(false);
            toast.success("Email sent successfully");
            form.current?.reset();
          },
          (error) => {
            console.log("FAILED...", error.text);
            setLoading(false);
            toast.error("Failed to send email");
          }
        );
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("An error occurred");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="p-6 rounded-xl bg-white/10 w-full max-w-[460px] grid grid-cols-1 gap-4"
      >
        <h3 className="text-2xl font-semibold text-center">Contact Us</h3>
        <fieldset className="flex flex-col gap-2">
          <label>Full Name</label>
          <input
            type="text"
            name="user_name"
            placeholder="e.g John Doe"
            required
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="email"
            name="user_email"
            placeholder="e.g john@doe.com"
            required
          />
        </fieldset>
        <fieldset className="flex flex-col gap-2">
          <label>Message</label>
          <textarea
            name="message"
            placeholder="Your message here..."
            required
          />
        </fieldset>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </section>
  );
}
