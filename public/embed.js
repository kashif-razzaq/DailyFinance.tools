/**
 * DailyFinance.tools embed loader.
 *
 * Usage:
 *   <script src="https://dailyfinance.tools/embed.js"
 *           data-calculator="mortgage-payment-calculator"
 *           data-theme="light"></script>
 *
 * Optional attributes:
 *   data-width   — iframe width (default "100%")
 *   data-height  — fixed iframe height (e.g. "720px"). When omitted the
 *                  iframe AUTO-SIZES to the calculator's exact height:
 *                  the widget reports its height via postMessage and the
 *                  iframe follows it, so there is never blank space
 *                  under the widget.
 *   data-theme   — "light" | "dark" (passed through to the widget)
 *
 * The widget always renders with DailyFinance.tools branding and a
 * backlink to the full calculator.
 */
(function () {
  var scripts = document.querySelectorAll('script[src*="embed.js"]');

  scripts.forEach(function (script) {
    if (script.getAttribute('data-injected') === 'true') return;

    var slug = script.getAttribute('data-calculator');
    if (!slug) return;

    var theme = script.getAttribute('data-theme') || 'light';
    var width = script.getAttribute('data-width') || '100%';
    var fixedHeight = script.getAttribute('data-height');

    var domain = window.location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : 'https://dailyfinance.tools';

    var iframe = document.createElement('iframe');
    iframe.src = domain + '/embed/' + slug + '?theme=' + encodeURIComponent(theme);
    iframe.title = slug.replace(/-/g, ' ') + ' calculator — DailyFinance.tools';
    iframe.setAttribute('loading', 'lazy');
    iframe.style.width = width;
    iframe.style.height = fixedHeight || '480px';
    iframe.style.border = 'none';
    iframe.style.display = 'block';
    iframe.style.overflow = 'hidden';
    iframe.style.background = 'transparent';

    if (!fixedHeight) {
      window.addEventListener('message', function (event) {
        if (event.origin !== domain) return;
        if (event.source !== iframe.contentWindow) return;
        var data = event.data || {};
        if (data.type === 'df-embed-height' && typeof data.height === 'number' && data.height > 0) {
          iframe.style.height = data.height + 'px';
        }
      });
    }

    script.parentNode.insertBefore(iframe, script);
    script.setAttribute('data-injected', 'true');
  });
})();
