import { RenderComponents } from 'lib/contentstack/components/render-components';
import { getHomepageRes } from 'lib/contentstack/helper/index';
import { notFound } from 'next/navigation';

export default async function HomePage() {
  try {
    const entryRes = await getHomepageRes('/');
    console.log('Homepage entry response:', JSON.stringify(entryRes, null, 2));
    
    if (!entryRes) throw new Error('404');
    
    return (
      <main>
        <RenderComponents 
          pageComponents={entryRes.pageComponents} 
          contentTypeUid={entryRes.contentTypeUid}
          entryUid={entryRes.entryUid}
          locale={entryRes.locale}
        />
      </main>
    );
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return notFound();
  }
} 