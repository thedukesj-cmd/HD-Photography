export const siteConfig = {
  siteName: "TrucVien Photography Club",
  shortName: "TrucVien",
  siteUrl: "http://localhost:8888",

  ownerName: "TrucVien Photography Club",
  ownerNameVi: "Hội Nhiếp ảnh Trúc Viên",
  ownerSlug: "trucvien",

  siteType: "club" as "personal" | "club",

  defaultLanguage: "vi" as "vi" | "en",
  supportedLanguages: ["en", "vi"] as const,

  location: {
    city: "San Jose",
    state: "California",
    country: "USA",
  },

  contact: {
    email: "",
    facebook: "",
    instagram: "",
  },

  navigation: {
    showOwner: true,
    showGuestPhotographers: true,
    showShowcase: true,
    showNews: true,
    showTutorials: true,
    showAbout: true,
    showContact: true,
  },

  gallery: {
    maximumCategoriesPerMember: 5,
    recommendedPhotosPerAlbum: 30,
    recommendedLongEdgePixels: 2400,
    recommendedMaximumFileSizeMB: 1,
  },

  branding: {
    logo: "/logo.png",
  footerCredit: "© TrucVien Photography Club",
  },
} as const

export type SiteConfig = typeof siteConfig

export type LanguageCode =
  (typeof siteConfig.supportedLanguages)[number]