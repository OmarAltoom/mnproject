"use client";
import { useState } from "react";

export default function UnifiedLayout({
  children,
  Sidebar,
  Topbar,
  Breadcrumbs,
  breadcrumbsItems = [],
  rtl = false,
  overlaySidebar = false,
  overlayDefaultOpen = true,
  overlayWidthRem = 16,
}) {
  const [overlayOpen, setOverlayOpen] = useState(overlayDefaultOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900" dir={rtl ? "rtl" : undefined}>
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className={`py-4 ${overlaySidebar ? "grid gap-4" : "grid gap-4 lg:grid-cols-[18rem,1fr] lg:gap-6"}`}>
          {overlaySidebar ? null : (
            <aside className="hidden lg:block sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto">
              {Sidebar ? <Sidebar /> : null}
            </aside>
          )}
          <div className="space-y-4 relative">
            {overlaySidebar && Sidebar ? (
              <>
                {/* Toggle button */}
                <button
                  type="button"
                  onClick={() => setOverlayOpen((v) => !v)}
                  className="hidden lg:flex fixed right-2 top-4 z-40 items-center gap-2 rounded-lg border border-gray-200 bg-white/90 px-3 py-1.5 text-sm text-gray-900 shadow-sm hover:bg-white dark:border-slate-700 dark:bg-slate-800/90 dark:text-gray-100"
                >
                  {overlayOpen ? "طي الشريط" : "إظهار الشريط"}
                </button>
                {/* Clickable backdrop */}
                {overlayOpen && (
                  <div
                    className="hidden lg:block fixed inset-0 z-30 bg-black/10"
                    onClick={() => setOverlayOpen(false)}
                  />
                )}
                {/* Overlay sidebar */}
                <div
                  className="hidden lg:block fixed right-0 top-0 z-40 h-screen"
                  style={{
                    width: `${overlayWidthRem}rem`,
                    transform: overlayOpen ? "translateX(0)" : "translateX(100%)",
                    transition: "transform 200ms ease",
                  }}
                >
                  <Sidebar />
                </div>
              </>
            ) : null}
            {Topbar ? <Topbar /> : null}
            {Breadcrumbs ? (
              <div>
                <Breadcrumbs items={breadcrumbsItems} />
              </div>
            ) : null}
            <main className="space-y-6 text-base md:text-lg">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
