import React from 'react';
import SEOHeader from '../components/common/SEOHeader';

export default function PrivacyPolicy() {
  return (
    <>
      <SEOHeader title="Privacy Policy" />
      <section className="py-20 bg-dark-bg text-white/80 max-w-4xl mx-auto px-4 md:px-8 space-y-6">
        <h1 className="font-poppins font-black text-3xl uppercase tracking-tight text-white border-b border-white/5 pb-4">
          Privacy Policy
        </h1>
        <p className="text-sm leading-relaxed font-inter">
          At Maruti Hydraulics, accessible from www.marutihydraulics.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Maruti Hydraulics and how we use it.
        </p>
        <h2 className="font-poppins font-bold text-lg text-white pt-4">
          Log Files
        </h2>
        <p className="text-sm leading-relaxed font-inter">
          Maruti Hydraulics follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
        </p>
        <h2 className="font-poppins font-bold text-lg text-white pt-4">
          Cookies and Web Beacons
        </h2>
        <p className="text-sm leading-relaxed font-inter">
          Like any other website, Maruti Hydraulics uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>
        <h2 className="font-poppins font-bold text-lg text-white pt-4">
          Privacy Policies
        </h2>
        <p className="text-sm leading-relaxed font-inter">
          Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Maruti Hydraulics, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
        </p>
        <p className="text-sm leading-relaxed font-inter">
          Note that Maruti Hydraulics has no access to or control over these cookies that are used by third-party advertisers.
        </p>
      </section>
    </>
  );
}
