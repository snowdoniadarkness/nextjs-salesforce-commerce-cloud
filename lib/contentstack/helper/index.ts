import { addEditableTags } from "@contentstack/utils";
import getConfig from "next/config";
import { getEntry, getEntryByUrl } from "../contentstack-sdk";
import { RenderProps } from "../typescript/component";
import { FooterProps, HeaderProps } from "../typescript/layout";
import { BlogPosts, Page } from "../typescript/pages";

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

const liveEdit = envConfig.CONTENTSTACK_LIVE_EDIT_TAGS === "true";

export const getHeaderRes = async (): Promise<HeaderProps> => {
  const response = await getEntry({
    contentTypeUid: "header",
    referenceFieldPath: ["navigation_menu.page_reference"],
    jsonRtePath: ["notification_bar.announcement_text"],
  }) as HeaderProps[][];

  if (response?.[0]?.[0]) {
    liveEdit && addEditableTags(response[0][0], "header", true);
    return response[0][0];
  }
  throw new Error('Header not found');
};

export const getFooterRes = async (): Promise<FooterProps> => {
  const response = await getEntry({
    contentTypeUid: "footer",
    referenceFieldPath: undefined,
    jsonRtePath: ["copyright"],
  }) as FooterProps[][];

  if (response?.[0]?.[0]) {
    liveEdit && addEditableTags(response[0][0], "footer", true);
    return response[0][0];
  }
  throw new Error('Footer not found');
};

export const getAllEntries = async (): Promise<Page[]> => {
  const response = await getEntry({
    contentTypeUid: "page",
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  }) as Page[][];

  if (response?.[0]) {
    liveEdit && response[0].forEach((entry) => addEditableTags(entry, "page", true));
    return response[0];
  }
  return [];
};

export const getPageRes = async (entryUrl: string): Promise<Page> => {
  const response = await getEntryByUrl({
    contentTypeUid: "page",
    entryUrl,
    referenceFieldPath: ["page_components.from_blog.featured_blogs"],
    jsonRtePath: [
      "page_components.from_blog.featured_blogs.body",
      "page_components.section_with_buckets.buckets.description",
      "page_components.section_with_html_code.description",
    ],
  }) as Page[];

  if (response?.[0]) {
    liveEdit && addEditableTags(response[0], "page", true);
    return response[0];
  }
  throw new Error('Page not found');
};

export const getBlogListRes = async (): Promise<BlogPosts[]> => {
  const response = await getEntry({
    contentTypeUid: "blog_post",
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body"],
  }) as BlogPosts[][];

  if (response?.[0]) {
    liveEdit && response[0].forEach((entry) => addEditableTags(entry, "blog_post", true));
    return response[0];
  }
  return [];
};

export const getBlogPostRes = async (entryUrl: string): Promise<BlogPosts> => {
  const response = await getEntryByUrl({
    contentTypeUid: "blog_post",
    entryUrl,
    referenceFieldPath: ["author", "related_post"],
    jsonRtePath: ["body", "related_post.body"],
  }) as BlogPosts[];

  if (response?.[0]) {
    liveEdit && addEditableTags(response[0], "blog_post", true);
    return response[0];
  }
  throw new Error('Blog post not found');
};

export const getHomepageRes = async (url: string) => {
  try {
    console.log('Fetching homepage for URL:', url);
    const response = await getEntryByUrl({
      contentTypeUid: "homepage",
      entryUrl: url,
      referenceFieldPath: [
        "page_components.hero_banner",
        "page_components.section",
        "page_components.section_with_buckets",
        "page_components.bucket_section",
        "page_components.bucket_section.buckets"
      ],
      jsonRtePath: ["sections.body"],
    });
    
    console.log('Raw homepage response:', JSON.stringify(response, null, 2));
    
    if (!response || !Array.isArray(response) || !response[0]) {
      console.log('No homepage data found');
      return null;
    }

    const entry = response[0];
    console.log('Homepage entry:', JSON.stringify(entry, null, 2));

    const homepageData: RenderProps = {
      entryUid: entry.uid,
      contentTypeUid: "homepage",
      locale: entry.locale,
      pageComponents: entry.page_components || [],
    };

    console.log('Processed homepage data:', JSON.stringify(homepageData, null, 2));
    return homepageData;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    throw error;
  }
};