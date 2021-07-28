// Add Range Request support to fetching videos from cache
workbox.routing.registerRoute(
  /.*\.mp4/,
  new workbox.strategies.CacheFirst({
    plugins: [
      new workbox.cacheableResponse.Plugin({ statuses: [200] }),
      new workbox.rangeRequests.Plugin()
    ]
  }),
  'GET'
)

// When gatsby-plugin-offline updates to v.5 of Workbox, we’ll need to update how we use the plugins:

// Add Range Request support to fetching videos from cache
// workbox.routing.registerRoute(
//   /.*\.mp4/,
//   new workbox.strategies.CacheFirst({
//     plugins: [
//       new workbox.cacheableResponse.CacheableResponsePlugin({
//         statuses: [200],
//       }),
//       new workbox.rangeRequests.RangeRequestsPlugin(),
//     ],
//   }),
//   'GET'
// );
