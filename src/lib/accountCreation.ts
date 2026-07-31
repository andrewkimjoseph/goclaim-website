/** Mirror app enrollment pause on the marketing site. Set VITE_GOCLAIM_ACCOUNT_CREATION_ENABLED=false when paused. */
export function isAccountCreationEnabled(): boolean {
  return import.meta.env.VITE_GOCLAIM_ACCOUNT_CREATION_ENABLED !== "false";
}
