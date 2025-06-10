'use client';

import { Component, RenderProps } from "../typescript/component";
import HeroBanner from './hero-banner';
import Section from './section';
import SectionBucket from './section-bucket';

export function RenderComponents(props: RenderProps) {
  const { pageComponents, entryUid, contentTypeUid, locale } = props;

  console.log('RenderComponents props:', {
    entryUid,
    contentTypeUid,
    locale,
    pageComponentsCount: pageComponents?.length
  });

  if (!pageComponents || !Array.isArray(pageComponents)) {
    console.error('No page components found or invalid format:', pageComponents);
    return null;
  }

  // Debug log the full page components
  console.log('Page Components:', JSON.stringify(pageComponents, null, 2));

  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
      className="space-y-8"
    >
      {pageComponents.map((component: Component, key: number) => {
        // Log each component's structure
        console.log('Processing component:', {
          key,
          componentType: Object.keys(component)[0],
          componentData: component
        });

        if (component.hero_banner) {
          console.log('Rendering hero banner with data:', component.hero_banner);
          return (
            <HeroBanner
              banner={component.hero_banner}
              key={`component-${key}`}
            />
          );
        }
        if (component.section) {
          console.log('Rendering section:', component.section);
          return (
            <Section
              section={component.section}
              key={`component-${key}`}
            />
          );
        }
        if (component.section_with_buckets) {
          console.log('Rendering section with buckets:', component.section_with_buckets);
          return (
            <SectionBucket
              section={component.section_with_buckets}
              key={`component-${key}`}
            />
          );
        }
        if (component.bucket_section) {
          console.log('Rendering bucket section:', component.bucket_section);
          return (
            <SectionBucket
              section={{
                title_h2: component.bucket_section.title_h2 || '',
                description: component.bucket_section.description || '',
                buckets: component.bucket_section.buckets || []
              }}
              key={`component-${key}`}
            />
          );
        }
        
        // Log any unhandled components
        console.warn('Unhandled component type:', {
          component,
          keys: Object.keys(component)
        });
        return null;
      })}
    </div>
  );
} 