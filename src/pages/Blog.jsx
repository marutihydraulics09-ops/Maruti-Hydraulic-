import React from 'react';
import { Calendar, User } from 'lucide-react';
import SEOHeader from '../components/common/SEOHeader';
import { blogPosts } from '../data/siteData';

export default function Blog() {
  return (
    <>
      <SEOHeader 
        title="Hydraulics Engineering Insights & Maintenance Blog"
        description="Read technical advice from Maruti Hydraulics engineers on cylinder seal selection, high-pressure design tips, and tipper cylinder maintenance."
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-dark-bg border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 engineering-grid opacity-[0.04] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center space-y-4">
          <span className="font-poppins font-extrabold text-xs tracking-widest text-accent uppercase">
            Knowledge Hub
          </span>
          <h1 className="font-poppins font-black text-3xl md:text-5xl text-white uppercase tracking-tight">
            Industrial Insights Blog
          </h1>
          <p className="text-sm font-inter text-white/70 max-w-xl mx-auto leading-relaxed">
            Tips, engineering recommendations, and selection guides written by Maruti design engineers.
          </p>
        </div>
      </section>

      {/* Blog post display */}
      <section className="py-20 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col justify-between hover:border-accent/25 transition-all group"
            >
              <div className="space-y-4">
                
                {/* Meta details */}
                <div className="flex flex-wrap gap-4 text-xs font-manrope text-white/50">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </span>
                </div>

                <h3 className="font-poppins font-bold text-xl text-white group-hover:text-accent transition-colors leading-snug">
                  {post.title}
                </h3>
                
                <p className="text-xs md:text-sm text-white/60 leading-relaxed font-inter line-clamp-3">
                  {post.summary}
                </p>

                {/* Expanded article block snippet */}
                <div className="pt-4 border-t border-white/5 text-xs text-white/50 font-inter leading-relaxed italic">
                  {post.content.substring(0, 150)}...
                </div>
              </div>



            </div>
          ))}
        </div>
      </section>
    </>
  );
}
