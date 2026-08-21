export const siteConfig = {
  siteName: "HD Photography",
  shortName: "HD Photography",
  siteUrl: "https://hdphotography.com",

  ownerName: "Hong-Duc Nguyen",
  ownerNameVi: "Nguyễn Hồng Đức",
  ownerSlug: "hong-duc",

  siteType: "personal" as "personal" | "club",

  defaultLanguage: "vi" as "vi" | "en",
  supportedLanguages: ["en", "vi"] as const,

  location: {
    city: "San Jose",
    state: "California",
    country: "USA",
  },

  contact: {
    email: "theduke.sj@gmail.com",
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
    footerCredit: "Photography by Hong-Duc Nguyen",
  },
} as const

export type SiteConfig = typeof siteConfig

export type LanguageCode =
  (typeof siteConfig.supportedLanguages)[number]