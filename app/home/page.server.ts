import { getHomepageRes } from 'lib/contentstack/helper/index';

export async function getHomepageData(entryUrl: string) {
  try {
    const entryRes = await getHomepageRes(entryUrl);
    if (!entryRes) throw new Error('404');
    return {
      entryUrl,
      page: entryRes,
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return { notFound: true };
  }
} 