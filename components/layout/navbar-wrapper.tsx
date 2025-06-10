import { TAGS } from "lib/constants";
import { getMenus } from "lib/sfcc/server";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import Navbar from "./navbar";

const { SITE_NAME } = process.env;

const getCachedMenus = unstable_cache(
  async (token: string) => {
    return getMenus(token);
  },
  ['menus'],
  {
    tags: [TAGS.menus],
    revalidate: 60 * 60 * 24, // 24 hours
  }
);

export default async function NavbarWrapper() {
  const cookieStore = await cookies();
  const token = cookieStore.get("guest_token")?.value;
  const menuGroups = await getCachedMenus(token || '');

  return <Navbar menuGroups={menuGroups} siteName={SITE_NAME || ''} />;
} 