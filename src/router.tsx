import { QueryClient } from "@tanstack/react-query";
import { createRouter, type ParsedLocation } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const ROUTE_DEPTH: Record<string, number> = {
  "/": 0,
  "/faqs": 1,
  "/about": 1,
};

function resolveViewTransitionTypes(
  fromLocation: ParsedLocation | undefined,
  toLocation: ParsedLocation,
): Array<string> | false {
  if (!fromLocation) return false;
  if (fromLocation.pathname === toLocation.pathname) return false;

  const fromDepth = ROUTE_DEPTH[fromLocation.pathname] ?? 0;
  const toDepth = ROUTE_DEPTH[toLocation.pathname] ?? 0;

  if (toDepth > fromDepth) return ["page-forward"];
  if (toDepth < fromDepth) return ["page-back"];
  return ["page-default"];
}

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultViewTransition: {
      types: ({ fromLocation, toLocation, pathChanged }) => {
        if (!pathChanged) return false;
        return resolveViewTransitionTypes(fromLocation, toLocation);
      },
    },
  });

  return router;
};
