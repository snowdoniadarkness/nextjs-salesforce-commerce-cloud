"use client";

import Link from 'next/link';
import { SectionProps } from '../typescript/component';

export default function Section({ section }: { section: SectionProps }) {
  const content = (
    <div className="lg:max-w-lg lg:self-end">
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl" {...section.$?.title_h2 as {}}>
        {section.title_h2}
      </h2>
      <p className="mt-4 text-lg text-gray-500" {...section.$?.description as {}}>
        {section.description}
      </p>
      {section.call_to_action?.title && (
        <div className="mt-8">
          <Link
            href={section.call_to_action.href ? section.call_to_action.href : '#'}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            {section.call_to_action.title}
          </Link>
        </div>
      )}
    </div>
  );

  const image = section.image?.url && (
    <div className="mt-10 lg:mt-0 lg:col-start-1">
      <img
        className="w-full rounded-lg shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
        src={section.image.url}
        alt={section.image.filename || 'Section image'}
      />
    </div>
  );

  return (
    <div className="relative py-16 overflow-hidden" style={{ backgroundColor: section.background_color?.hex || '#ffffff' }}>
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="container">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            {section.is_image_right_aligned ? (
              <>
                {content}
                {image}
              </>
            ) : (
              <>
                {image}
                {content}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}