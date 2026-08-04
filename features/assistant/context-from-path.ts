import type { AssistantPageContext } from "../../common/ai/types/assistant";

/**
 * Derive assistant page context from the current route.
 *
 * Phase 7 requires the assistant to know where a question was asked - "what
 * should I prepare?" on the Canada page is a question about Canada. The
 * launcher is mounted once in the header, which has no per-page props to pass
 * down, so the context is read from the path instead.
 */
export function contextFromPath(pathname: string): AssistantPageContext | undefined {
  const path = pathname.replace(/\/+$/, "");

  const country = path.match(/^\/visaworx\/countries\/([^/]+)$/);
  if (country) return { pageType: "country", countrySlug: country[1] };

  const service = path.match(/^\/visaworx\/services\/([^/]+)$/);
  if (service) return { pageType: "service", serviceSlug: service[1] };

  const guide = path.match(/^\/visaworx\/resources\/guides\/([^/]+)$/);
  if (guide) return { pageType: "guide", guideSlug: guide[1] };

  if (path.startsWith("/visaworx/readiness")) return { pageType: "readiness" };
  if (path.startsWith("/visaworx/consultation")) return { pageType: "consultation" };
  if (path === "/visaworx") return { pageType: "homepage" };

  // Listing and resource pages carry no specific subject; sending a pageType
  // with nothing attached would add noise to retrieval without adding signal.
  return undefined;
}
