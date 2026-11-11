/**
 * Embed layout — the ROOT layout owns <html>/<body> on every route, and
 * ConditionalLayout already hides the site header/footer on /embed/*.
 * This nested layout therefore only guarantees the transparent backdrop
 * (overriding the root body's bg) so widgets blend into host pages.
 */
export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`html, body { background: transparent !important; min-height: 0 !important; }`}</style>
      {children}
    </>
  );
}
