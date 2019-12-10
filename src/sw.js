if ('function' === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
    /* global workbox */
    if (workbox) {
      console.log('Workbox is loaded ahiahi');
  
      /* injection point for manifest files.  */
      workbox.precaching.precacheAndRoute([]);

      // const showNotification = () => {
      //   console.log('show');
      //   // eslint-disable-next-line no-restricted-globals
      //   self.registration.showNotification('Background sync success!', {
      //     body: '🎉`🎉`🎉`'
      //   });
      // };
      const showNotification = () => {
        console.log("show no ti di");
        self.registration.showNotification('Background sync success!', {
          body: '🎉`🎉`🎉`'
        });
      };
      
      const bgSyncPlugin = new workbox.backgroundSync.Plugin(
        'dashboardr-queue',
        {
          callbacks: {
            queueDidReplay: showNotification
            // other types of callbacks could go here
          }
        }
      );
      const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
        plugins: [bgSyncPlugin],
      });
      



  /* custom cache rules*/
  workbox.routing.registerNavigationRoute('/index.html', {
        blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
      });
  
  workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg)$/,
        workbox.strategies.cacheFirst({
          cacheName: 'images',
          plugins: [
            new workbox.expiration.Plugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
            }),
          ],
        })
      );
  
workbox.routing.registerRoute(
  'https://jsonplaceholder.typicode.com/posts',
  workbox.strategies.networkFirst(),
  'GET'
);
workbox.routing.registerRoute(
  'https://jsonplaceholder.typicode.com/posts',
  networkWithBackgroundSync,
  'POST'
);

  
  } else {
      console.log('Workbox could not be loaded. No Offline support');
    }
  }