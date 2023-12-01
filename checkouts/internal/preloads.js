
    (function() {
      var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
      var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.baseline.es.6a95e657f9e56b8a6da0.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/388.baseline.es.eabd623e466b40f13f3a.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/907.baseline.es.be905c052ec435bc61a4.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/598.baseline.es.461bde58bdee2af833fb.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.baseline.es.5906b0d76336ee6f33a7.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/731.baseline.es.68ceefcc66cfc32ca175.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/774.baseline.es.9c794c100a2fbc59ae77.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/917.baseline.es.88daeefe46c532f2180e.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/844.baseline.es.2bcddb1bebd8d00bde9a.js","https://cdn.shopify.com/shopifycloud/checkout-web/assets/Redesign.baseline.es.589970fe629281bcd76b.js"];
      var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/388.baseline.es.7a22d831e7edff057670.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.baseline.es.a3984c31989d09f92fc0.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/774.baseline.es.90995d593e3657cbd8c7.css","https://cdn.shopify.com/shopifycloud/checkout-web/assets/661.baseline.es.9956cb0ee1c783023055.css"];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = [];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res[0], next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        })();
      }

      function onLoaded() {
        preconnectAssets();
        prefetchAssets();
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  