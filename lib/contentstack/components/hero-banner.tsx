"use client";

import Link from 'next/link';
import { Banner } from '../typescript/component';

export default function HeroBanner({ banner }: { banner: Banner }) {
  if (!banner) {
    console.warn('HeroBanner: No banner data provided');
    return null;
  }

  console.log('HeroBanner data:', banner);

  return (
    <div 
      className="relative bg-gray-900"
      style={{
        background: banner.bg_color || '',
      }}
    >
      {banner.banner_image?.url && (
        <>
          <div className="absolute inset-0">
            <img
              className="h-full w-full object-cover"
              src={banner.banner_image.url}
              alt={banner.banner_image.filename || 'Hero banner image'}
            />
            <div className="absolute inset-0 bg-gray-900 mix-blend-multiply" />
          </div>
        </>
      )}
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          style={{
            color: banner.text_color || '#fff',
          }}
        >
          {banner.banner_title}
        </h1>
        {banner.banner_description && (
          <p 
            className="mt-6 text-xl text-gray-300 max-w-3xl"
            style={{
              color: banner.text_color || '#fff',
            }}
          >
            {banner.banner_description}
          </p>
        )}
        {banner.call_to_action?.title && banner.call_to_action?.href && (
          <div className="mt-10">
            <Link
              href={banner.call_to_action.href}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
            >
              {banner.call_to_action.title}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}