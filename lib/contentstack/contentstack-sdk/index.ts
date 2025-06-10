import ContentstackLivePreview from "@contentstack/live-preview-utils";
import * as Utils from "@contentstack/utils";
import getConfig from "next/config";
import {
  customHostUrl,
  initializeContentStackSdk,
  isValidCustomHostUrl,
} from "./utils";

type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;

let customHostBaseUrl = envConfig.CONTENTSTACK_API_HOST as string;

customHostBaseUrl = customHostBaseUrl? customHostUrl(customHostBaseUrl): '';

// SDK initialization
const Stack = initializeContentStackSdk();

// set host url only for custom host or non prod base url's
if (!!customHostBaseUrl && isValidCustomHostUrl(customHostBaseUrl)) {
  Stack.setHost(customHostBaseUrl);
}

// Setting LP if enabled
if (typeof window !== 'undefined') {
  ContentstackLivePreview.init({
    stackSdk: Stack,
    clientUrlParams: {
      host: envConfig.CONTENTSTACK_APP_HOST,
    },
    ssr: false,
  })?.catch((err) => console.error('Live Preview initialization error:', err));
}

export const { onEntryChange } = ContentstackLivePreview;

const renderOption = {
  span: (node: any, next: any) => next(node.children),
};

/**
 *
 * fetches all the entries from specific content-type
 * @param {* content-type uid} contentTypeUid
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 *
 */
export const getEntry = ({
  contentTypeUid,
  referenceFieldPath,
  jsonRtePath,
}: GetEntry) => {
  return new Promise((resolve, reject) => {
    const query = Stack.ContentType(contentTypeUid).Query();
    if (referenceFieldPath) query.includeReference(referenceFieldPath);
    query
      .toJSON()
      .find()
      .then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
};

/**
 *fetches specific entry from a content-type
 *
 * @param {* content-type uid} contentTypeUid
 * @param {* url for entry to be fetched} entryUrl
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 * @returns
 */
export const getEntryByUrl = ({
  contentTypeUid,
  entryUrl,
  referenceFieldPath,
  jsonRtePath,
}: GetEntryByUrl) => {
  return new Promise((resolve, reject) => {
    try {
      console.log('Fetching entry by URL:', {
        contentTypeUid,
        entryUrl,
        referenceFieldPath,
        jsonRtePath
      });

      const pageQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) {
        console.log('Including reference fields:', referenceFieldPath);
        pageQuery.includeReference(referenceFieldPath);
      }
      pageQuery.toJSON();
      
      console.log('Executing query for URL:', entryUrl);
      pageQuery.where("url", `${entryUrl}`).find()
        .then((result) => {
          console.log('Query result:', result);
          
          if (!result || !result[0]) {
            console.log('No entry found for URL:', entryUrl);
            resolve(null);
            return;
          }
          
          if (jsonRtePath) {
            console.log('Processing JSON RTE paths:', jsonRtePath);
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption,
            });
          }
          console.log('Resolving with entry:', result[0]);
          resolve(result[0]);
        })
        .catch((error) => {
          console.error('Error fetching entry by URL:', error);
          reject(error);
        });
    } catch (error) {
      console.error('Error in getEntryByUrl:', error);
      reject(error);
    }
  });
};