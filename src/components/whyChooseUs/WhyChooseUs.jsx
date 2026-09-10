import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import AnchorLink from "react-anchor-link-smooth-scroll";
import {
  selectActiveFeatureId,
  selectFeatures,
  setActiveFeature,
} from "../../features/whyChooseUs/whyChooseUsSlice";
import FeatureCard from "./FeatureCard";

const WhyChooseUs = () => {
  const dispatch = useDispatch();
  const features = useSelector(selectFeatures);
  const activeFeatureId = useSelector(selectActiveFeatureId);

  return (
    <section id="why-choose-us" className="relative overflow-hidden container mx-auto px-4 sm:px-8 lg:px-20 py-16 lg:py-24">
      {/* Soft background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 -z-10 h-72 w-72 rounded-full bg-purple-600 opacity-20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-[#3F5EFB] opacity-20 blur-3xl"
      />

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <span className="rounded-full border border-[#6318F1]/60 bg-[#110D2E] px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-200 shadow-[0_0_20px_rgba(99,24,241,0.35)]">
            Why Choose Us
          </span>
          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Why Companies{" "}
            <span className="bg-gradient-to-r from-[#a855f7] via-[#3F5EFB] to-[#22d3ee] bg-clip-text text-transparent">
              Choose Us
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-gray-400 sm:text-lg">
            We deliver scalable, secure, and future-ready solutions.
          </p>
          <span className="mt-6 h-1 w-40 rounded-full bg-gradient-to-r from-[#a855f7] via-[#3F5EFB] to-[#22d3ee]" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              {...feature}
              isActive={feature.id === activeFeatureId}
              onClick={() => dispatch(setActiveFeature(feature.id))}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <AnchorLink
            offset={80}
            href="#contact"
            className="inline-flex min-h-[48px] items-center gap-3 rounded-xl bg-gradient-to-r from-[#6318F1] to-[#d946ef] px-8 py-3 font-semibold text-white shadow-lg shadow-[#6318F1]/40 transition duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Start Your Project
            <FaArrowRight className="h-4 w-4" aria-hidden="true" />
          </AnchorLink>
          <p className="text-sm text-gray-500">Let's build something amazing together.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
