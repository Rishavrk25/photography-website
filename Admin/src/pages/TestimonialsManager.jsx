import React from 'react';
import { HiStar } from 'react-icons/hi';

export default function TestimonialsManager() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold text-cream flex items-center gap-2">
          <HiStar className="text-gold" /> Testimonials Management
        </h1>
        <p className="text-sm text-gray-soft/60 mt-1">Manage client reviews and testimonials.</p>
      </div>
      <div className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center border border-white/5">
        <h3 className="text-xl font-bold text-cream mb-2">Coming Soon</h3>
        <p className="text-gray-soft/60 max-w-md">
          The Testimonials Management feature is currently under development. You will be able to approve, edit, and publish client reviews here.
        </p>
      </div>
    </div>
  );
}
