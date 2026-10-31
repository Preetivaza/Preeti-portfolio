export default function sitemap() { return [{ url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000", lastModified: new Date() }]; }
