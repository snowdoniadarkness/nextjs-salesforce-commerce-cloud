"use client";

import Footer from "components/layout/footer";
import RenderComponents from 'lib/contentstack/components/render-components';
import { onEntryChange } from 'lib/contentstack/contentstack-sdk/index';
import { getHomepageRes } from 'lib/contentstack/helper/index';
import { PageProps } from "lib/contentstack/typescript/pages";
import { useEffect, useState } from 'react';

export default function HomePage({ page, entryUrl }: PageProps) {
  const [getEntry, setEntry] = useState(page);

  async function fetchData() {
    try {
      const entryRes = await getHomepageRes(entryUrl);
      if (!entryRes) throw new Error('404');
      setEntry(entryRes);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [entryUrl]);

  return (
    <>
      {getEntry && (
        <RenderComponents
          pageComponents={getEntry.page_components}
          entryUid={getEntry.uid}
          contentTypeUid={'homepage'}
          locale={getEntry.locale}
        />
      )}
      <Footer />
    </>
  );
} 