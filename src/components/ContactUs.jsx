import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import FormField from "./contact/FormField";
import { initialValues, validateContact } from "./contact/contactValidation";

const CONTACT_DETAILS = [
  { id: "phone", label: "Phone", value: "0310 - 7756294", Icon: FaPhoneAlt },
  { id: "email", label: "Email", value: "hello@keepcodein.com", Icon: MdMarkEmailUnread },
  { id: "location", label: "Location", value: "Islamabad, Pakistan", Icon: FaLocationDot },
];

const SUBMIT_DELAY_MS = 900;

const ContactUs = () => {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = validateContact(values);
  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (submitted) setSubmitted(false);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reveal every error on a submit attempt.
    setTouched({ name: true, email: true, message: true });
    if (!isValid || submitting) return;

    setSubmitting(true);
    // Mock request: no real API call.
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setValues(initialValues);
      setTouched({});
    }, SUBMIT_DELAY_MS);
  };

  const fieldProps = (id) => ({
    id,
    value: values[id],
    error: errors[id],
    touched: touched[id],
    onChange: handleChange,
    onBlur: handleBlur,
  });

  return (
    <div id="contact" className="container mx-auto px-4 sm:px-8 lg:px-20 py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <section className="rounded-2xl bg-gradient-to-l from-[#110D2E]/40 to-[#fc466a4a]/10 p-6 shadow-md sm:p-10 lg:p-14">
          <div className="mb-8 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold capitalize text-white">Drop Us Your Message</h2>
            <p className="mt-2 text-gray-400">
              Freely contact with us anytime. We're available here for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField label="Full Name" {...fieldProps("name")} />
              <FormField label="Your Email" type="email" {...fieldProps("email")} />
              <FormField
                label="Message"
                as="textarea"
                className="md:col-span-2"
                {...fieldProps("message")}
              />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={!isValid || submitting}
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#6318F1] px-8 py-2 font-semibold text-white transition duration-200 enabled:hover:scale-105 enabled:hover:bg-gradient-to-r enabled:hover:from-[#FC466B] enabled:hover:to-[#3F5EFB] enabled:hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting && (
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
                  />
                )}
                {submitting ? "Sending..." : "Send Message"}
              </button>

              {submitted && (
                <p
                  role="status"
                  className="rounded-full border border-[#59D3AA]/50 bg-[#59D3AA]/10 px-4 py-2 text-sm text-[#59D3AA] animate-in fade-in duration-300"
                >
                  Thanks! Your message has been sent. We'll get back to you shortly.
                </p>
              )}
            </div>
          </form>
        </section>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {CONTACT_DETAILS.map(({ id, label, value, Icon }) => (
            <div
              key={id}
              className="formBorder-gradient flex flex-col items-center border bg-[#110D2E]/40 px-6 py-8 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#3F5EFB]/20"
            >
              <Icon size={40} className="mb-4 text-blue-600" />
              <div className="text-lg font-semibold text-white">{label}</div>
              <hr className="my-3 h-[1px] w-16 border-0 bg-gradient-to-r from-[#FC466B] to-[#3F5EFB]" />
              <div className="break-all text-gray-400">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
