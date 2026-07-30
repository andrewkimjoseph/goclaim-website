// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import type { ConfigEnv, PluginOption, UserConfig } from "vite";
import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";

const lovableConfig = defineLovableConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

function withoutViteTsconfigPaths(plugins: PluginOption[] | undefined): PluginOption[] {
  if (!plugins) return [];

  return plugins.flatMap((plugin) => {
    if (!plugin) return [];
    if (Array.isArray(plugin)) return withoutViteTsconfigPaths(plugin);
    if (typeof plugin === "object" && "name" in plugin && plugin.name === "vite-tsconfig-paths") {
      return [];
    }
    return [plugin];
  });
}

export default async (env: ConfigEnv): Promise<UserConfig> => {
  const config = await lovableConfig(env);

  return {
    ...config,
    resolve: {
      ...config.resolve,
      tsconfigPaths: true,
    },
    plugins: withoutViteTsconfigPaths(config.plugins),
  };
};
