import { Action, Image } from "./action";

type AdditionalParam = {
  title: string;
  title_h2: string;
  title_h3: string;
  description: string;
  banner_title: string;
  banner_description: string;
  designation: string;
  name: string;
  html_code: string;
  body: string;
  date: string;
  padding_top_pixel_value?: string;
  padding_bottom_pixel_value?: string;
  mobile_grid_layout?: string;
}

type Employee = {
  image: Image;
  name: string;
  designation: string;
  $: AdditionalParam;
}

type BucketList = [
  BucketArray:{
    title_h3: string;
    description: string;
    url: string;
    call_to_action: Action;
    image: Image;
    $: AdditionalParam;
  }
]

type Card = [
  cardArray: {
    title_h3: string;
    description: string;
    call_to_action: Action;
    $: AdditionalParam;
    }
]

type Article = {
  href: string;
  title: string;
  $: AdditionalParam;
}

type FeaturedBlog = [
  BlogArray: {
    title: string;
    featured_image: Image;
    body: string;
    url: string;
    $: AdditionalParam;
  }
]

type Widget = {
  title_h2: string;
  type?: string;
  $: AdditionalParam;
}

export type Component = {
  hero_banner?: Banner;
  section?: SectionProps;
  section_with_buckets?: SectionWithBucket;
  product_grid?: any; // TODO: Add proper type
  bucket_section?: {
    title_h2?: string;
    description?: string;
    buckets?: Array<{
      icon?: {
        url: string;
      };
      title_h3?: string;
      description?: string;
      call_to_action?: {
        title: string;
        href?: string;
      };
    }>;
  };
  from_blog?: FeaturedBlogData;
  section_with_cards?: Cards;
  section_with_html_code?: AdditionalParamProps;
  our_team?: TeamProps;
  widget?: Widget;
}

export type SectionWithBucket = {
    bucket_tabular: boolean
    title_h2: string;
    buckets: BucketList;
    description: string;
    $: AdditionalParam;
  }

export type Cards = {
    cards: Card;
  }
  
export type Banner = {
    banner_title:string;
    banner_description: string;
    bg_color: string;
    call_to_action: Action;
    banner_image: Image;
    text_color: string;
    $: AdditionalParam;
  }
  
export type AdditionalParamProps = {
    html_code_alignment: string;
    title: string;
    $: AdditionalParam;
    description: string;
    html_code: string;
  }
  
export type SectionProps = {
    title_h2: string;
    description: string;
    call_to_action: Action;
    image: Image;
    is_image_right_aligned: boolean;
    background_color?: {
      hex: string;
    };
    $: AdditionalParam;
  } 
  
export type TeamProps = {
    title_h2: string;
    description: string;
    $: AdditionalParam;
    employees: [Employee];
  }
  
export type FeaturedBlogData = {
    title_h2: string;
    view_articles: Article;
    featured_blogs: FeaturedBlog;
    $: AdditionalParam;
}

export type RenderProps = {
  blogPost?: boolean;
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  pageComponents:Component[];
}

export type BucketProps = {
  title_h2: string;
  description: string;
  buckets: {
    image?: {
      url: string;
      $?: {
        url: string;
      };
    };
    title_h3?: string;
    description?: string;
    call_to_action?: {
      title: string;
      href?: string;
    };
    $?: {
      title_h3?: string;
      description?: string;
    };
  }[];
  $?: {
    title_h2?: string;
    description?: string;
    padding_top_pixel_value?: string;
    padding_bottom_pixel_value?: string;
    mobile_grid_layout?: string;
    background_color?: string;
  };
};