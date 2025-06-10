import HomePage from './client';
import { getHomepageData } from './server';

export default async function Page() {
  const data = await getHomepageData('/');
  
  if ('notFound' in data) {
    return <div>Page not found</div>;
  }
  
  return <HomePage page={data.page} entryUrl={data.entryUrl} />;
} 