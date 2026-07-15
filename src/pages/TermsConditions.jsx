import React from 'react';
import SEOHeader from '../components/common/SEOHeader';

export default function TermsConditions() {
  return (
    <>
      <SEOHeader title="Terms & Conditions" />
      <section className="py-20 bg-dark-bg text-white/80 max-w-4xl mx-auto px-4 md:px-8 space-y-6">
        <h1 className="font-poppins font-black text-3xl uppercase tracking-tight text-white border-b border-white/5 pb-4">
          Terms & Conditions
        </h1>
        <p className="text-sm leading-relaxed font-inter">
          Welcome to Maruti Hydraulics! These terms and conditions outline the rules and regulations for the use of Maruti Hydraulics's Website, located at www.marutihydraulics.in.
        </p>
        <p className="text-sm leading-relaxed font-inter">
          By accessing this website we assume you accept these terms and conditions. Do not continue to use Maruti Hydraulics if you do not agree to take all of the terms and conditions stated on this page.
        </p>
        <h2 className="font-poppins font-bold text-lg text-white pt-4">
          License
        </h2>
        <p className="text-sm leading-relaxed font-inter">
          Unless otherwise stated, Maruti Hydraulics and/or its licensors own the intellectual property rights for all material on Maruti Hydraulics. All intellectual property rights are reserved. You may access this from Maruti Hydraulics for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
        <p className="text-sm leading-relaxed font-inter">
          You must not republish material from Maruti Hydraulics, sell, rent or sub-license material from Maruti Hydraulics, or reproduce, duplicate or copy material from Maruti Hydraulics.
        </p>
        <h2 className="font-poppins font-bold text-lg text-white pt-4">
          Product Warranties & Dimensions
        </h2>
        <p className="text-sm leading-relaxed font-inter">
          All catalog sheets, bore and rod dimensions, and structural drawings represent standard tolerances. Maruti Hydraulics reserves the right to optimize raw material steel grades (e.g. from EN-8D to equivalent high-tensile specifications) or modify seal brands to optimize cylinder performance without direct prior notifications. Custom cylinders are warranted for 12 months under design pressure bounds.
        </p>
      </section>
    </>
  );
}
