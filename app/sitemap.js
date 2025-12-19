const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

const locales = ["en", "ar"];
const staticPaths = [
  "",
  "/login",
  "/signup",
  "/about",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
  "/doctor/dashboard",
  "/patient/dashboard",
  "/admin/dashboard",
];

export default async function sitemap() {
  const today = new Date().toISOString().split("T")[0];

  return locales.flatMap((locale) => {
    return staticPaths.map((path) => {
      const normalized = path.startsWith("/") ? path : `/${path}`;
      const url = `${base}/${locale}${normalized}`.replace(/\\+/, "/");
      return {
        url,
        lastModified: today,
        changeFrequency: "weekly",
        priority: path === "" ? 1.0 : 0.7,
      };
    });
  });
}
