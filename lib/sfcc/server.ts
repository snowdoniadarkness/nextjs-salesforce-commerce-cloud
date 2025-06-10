'use server';

import { ShopperProducts } from "commerce-sdk-isomorphic";
import { storeCatalog } from "./constants";
import { MenuGroup } from "./types";

const apiConfig = {
  throwOnBadResponse: true,
  parameters: {
    clientId: process.env.SFCC_CLIENT_ID || "",
    organizationId: process.env.SFCC_ORGANIZATIONID || "",
    shortCode: process.env.SFCC_SHORTCODE || "",
    siteId: process.env.SFCC_SITEID || "",
    channelId: process.env.SFCC_CHANNELID || "",
  },
};

async function getGuestToken() {
  try {
    const response = await fetch(`${process.env.SFCC_API_URL}/dw/oauth2/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.SFCC_CLIENT_ID || '',
        client_secret: process.env.SFCC_CLIENT_SECRET || '',
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get guest token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting guest token:', error);
    throw error;
  }
}

async function getGuestUserConfig(token?: string) {
  if (!token) {
    token = await getGuestToken();
  }
  
  return {
    ...apiConfig,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function getMenus(token?: string): Promise<MenuGroup[]> {
  try {
    const config = await getGuestUserConfig(token);
    const productsClient = new ShopperProducts(config);

    // Get all categories
    const result = await productsClient.getCategories({
      parameters: {
        ids: storeCatalog.ids,
      },
    });

    if (!result?.data) {
      return [];
    }

    // Transform categories into menu groups
    const menuGroups: MenuGroup[] = result.data
      .filter(category => category.id && category.name) // Filter out invalid categories
      .map(category => ({
        handle: category.id!,
        links: (category.categories || [])
          .filter(subCategory => subCategory.id && subCategory.name) // Filter out invalid subcategories
          .map(subCategory => ({
            title: subCategory.name!,
            path: `/category/${subCategory.id}`
          }))
      }));

    return menuGroups;
  } catch (error) {
    console.error('Error fetching menus:', error);
    return [];
  }
} 