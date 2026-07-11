"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Send, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import { EXPO_OUT, fadeUp } from "@/lib/motion";

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  type: string;
  message: string;
}

const INITIAL: FormData = { name: "", email: "", type: "", message: "" };

export function Contact() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const rm = useReducedMotion();

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.message.trim() || form.message.length < 10)
      e.message = "At least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    // Replace with your actual form endpoint (Formspree, Netlify Forms, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  const inputClass = (field: keyof FormData) =>
    `w-full bg-muted/50 border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-accent focus:bg-background ${
      errors[field] ? "border-destructive/60" : "border-border"
    }`;

  return (
    <section
      id="contact"
      className="section-padding py-section border-t border-border bg-surface"
      aria-label="Contact"
    >
      <div className="content-grid">
        <SectionLabel label="Contact" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column */}
          <motion.div className="lg:col-span-5 space-y-8" {...fadeUp(rm)}>
            <div>
              <h2 className="text-display-md font-bold text-balance mb-4">
                Let&apos;s make something worth using
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Available for new projects, design partnerships, and the occasional consulting
                engagement.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  label: "Email",
                  value: "rahulvaidux@gmail.com",
                  href: "mailto:rahulvaidux@gmail.com",
                },
                {
                  label: "LinkedIn",
                  value: "/in/rahul-vaid",
                  href: "https://www.linkedin.com/in/rahul-vaid-1b768423a",
                },
                {
                  label: "Behance",
                  value: "@rahulvaid1",
                  href: "https://www.behance.net/rahulvaid1",
                },
              ].map(({ label, value, href }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {label}
                  </span>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors group"
                  >
                    {value}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </a>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-success" aria-hidden="true" />
                <p className="text-sm font-semibold text-foreground">
                  Open to opportunities
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Particularly interested in product teams working on design systems, complex
                dashboards, or accessibility-critical products. Open to product designer and
                senior IC roles, remote or hybrid.
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div className="lg:col-span-7" {...fadeUp(rm, 0.15)}>
            {status === "success" ? (
              <motion.div
                initial={{ opacity: rm ? 1 : 0, scale: rm ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: rm ? 0 : 0.4, ease: EXPO_OUT }}
                className="rounded-2xl border border-border bg-card p-10 flex flex-col items-center text-center gap-4 h-full justify-center min-h-[420px]"
                role="status"
              >
                <CheckCircle2 size={40} className="text-success" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message received</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Thanks for reaching out. I typically reply within 1 business day.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setForm(INITIAL);
                    setStatus("idle");
                  }}
                  className="text-sm text-accent hover:underline font-medium"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl border border-border bg-card p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass("name")}
                      required
                      aria-required="true"
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-xs text-destructive mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass("email")}
                      required
                      aria-required="true"
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-xs text-destructive mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                    Type of work
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    className={inputClass("type")}
                  >
                    <option value="">Select a project type</option>
                    <option value="fulltime">Full-time role</option>
                    <option value="contract">Contract / freelance</option>
                    <option value="consulting">Design consulting</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your project, timeline, and what kind of help you're looking for..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass("message")} resize-none`}
                    required
                    aria-required="true"
                    aria-invalid={errors.message ? true : undefined}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-xs text-destructive mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === "error" && (
                  <p className="text-sm text-destructive" role="status">
                    Something went wrong. Please email me directly at rahulvaidux@gmail.com
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-foreground text-background font-semibold text-sm hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <Send size={14} />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-muted-foreground">
                  Or email directly at{" "}
                  <a href="mailto:rahulvaidux@gmail.com" className="text-foreground hover:text-accent transition-colors">
                    rahulvaidux@gmail.com
                  </a>
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
