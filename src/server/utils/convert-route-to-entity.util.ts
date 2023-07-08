const mapping: Record<string, string> = {
  'customer-replies': 'customer_reply',
  marketings: 'marketing',
  users: 'user',
  vendors: 'vendor',
  'video-shares': 'video_share',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
