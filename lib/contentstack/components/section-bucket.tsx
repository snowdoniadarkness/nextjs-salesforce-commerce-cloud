"use client";

import parse from 'html-react-parser';
import Link from 'next/link';
import { Action, Image } from "../typescript/action";
import { BucketProps, SectionWithBucket } from '../typescript/component';

type AdditionalParam = {
  title: string;
  title_h2: string;
  title_h3: string;
  description: string;
  html_code: string;
  designation: string;
  name: string;
  padding_top_pixel_value?: string;
  padding_bottom_pixel_value?: string;
  mobile_grid_layout?: string;
}

type Buckets = {
  title_h3: string;
  description: string;
  call_to_action: Action;
  image: Image;
  $: AdditionalParam;
}

export default function SectionBucket({ section }: { section: BucketProps | SectionWithBucket }) {
  // Handle both section_with_buckets and bucket_section data structures
  const title = 'title_h2' in section ? section.title_h2 : '';
  const description = 'description' in section ? section.description : '';
  const buckets = 'buckets' in section ? section.buckets : [];
  const additionalParams = '$' in section ? section.$ : {};
  const mobile_grid_layout = additionalParams?.mobile_grid_layout || '1';

  // Calculate grid layouts based on bucket count
  const bucketCount = buckets?.length || 0;
  const mobileGridCols = 'grid-cols-' + mobile_grid_layout;
  const mdGridCols =  'md:grid-cols-' + bucketCount;

  // Get custom padding values
  const paddingTop = additionalParams?.padding_top_pixel_value ? `${additionalParams.padding_top_pixel_value}px` : '';
  const paddingBottom = additionalParams?.padding_bottom_pixel_value ? `${additionalParams.padding_bottom_pixel_value}px` : '';

  return (
    <div className="bg-white" style={{ paddingTop, paddingBottom }}>
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {title && (
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl" {...additionalParams?.title_h2 as {}}>
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-lg text-gray-500" {...additionalParams?.description as {}}>
              {description}
            </p>
          )}
        </div>
        <div className={`mt-12 grid gap-4 ${mobileGridCols} ${mdGridCols}`}>
          {buckets?.map((bucket, index) => {
            return (
              <div className="flex flex-col items-center text-center" key={index}>
                {bucket.image?.url && (
                  <img
                    className="mb-4 object-contain md:object-cover"
                    {...bucket.image.$?.url as {}}
                    src={bucket.image.url}
                    alt='bucket image'
                  />
                )}

                {bucket.title_h3 ? (
                  <h3 className="text-xl font-semibold text-gray-900 mb-2" {...bucket.$?.title_h3 as {}}>
                    {bucket.title_h3}
                  </h3>
                ) : null}
                
                {typeof bucket.description === 'string' && (
                  <div className="text-gray-500 mb-4" {...bucket.$?.description as {}}>
                    {parse(bucket.description)}
                  </div>
                )}
                
                {bucket.call_to_action?.title ? (
                  <Link
                    href={bucket.call_to_action.href ? bucket.call_to_action.href : '#'}
                    className="inline-flex items-center text-blue-600 hover:text-blue-500"
                  >
                    {bucket.call_to_action.title}
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}