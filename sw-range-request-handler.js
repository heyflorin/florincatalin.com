// Not used at this time, using no cache method in gatsby-config.js instead of this.
// https://betterprogramming.pub/how-to-get-videos-to-work-in-safari-with-gatsby-and-service-workers-9e1f099249ac
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
