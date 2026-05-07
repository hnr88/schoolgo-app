import { INDEXNOW_KEY, SITE_URL } from "@/modules/seo/constants/seo.constants";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

export async function submitUrlsToIndexNow(
  urls: string[],
): Promise<{ success: boolean; status: number }> {
  if (!INDEXNOW_KEY) {
    return { success: false, status: 0 };
  }

  const absoluteUrls = urls.map((url) =>
    url.startsWith("http") ? url : `${SITE_URL}${url}`,
  );

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      host: new URL(SITE_URL).hostname,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: absoluteUrls,
    }),
  });

  return { success: response.ok, status: response.status };
}

export async function submitUrlToIndexNow(
  url: string,
): Promise<{ success: boolean; status: number }> {
  return submitUrlsToIndexNow([url]);
}
