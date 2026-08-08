export const siteConfig = {
  siteName: "HD Photography",
  shortName: "HD Photography",

  ownerName: "Hong-Duc Nguyen",
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
    email: "",
    facebook: "",
    instagram: "",
  },

  navigation: {
    showOwner: true,
    showGuestPhotographers: true,
    showShowcase: true,
    showAbout: false,
    showContact: true,
    showNews: true,
    showTutorials: true,
  },

  gallery: {
    maximumCategoriesPerMember: 5,
    recommendedPhotosPerAlbum: 30,
    recommendedLongEdgePixels: 2400,
    recommendedMaximumFileSizeMB: 1,
  },

  branding: {
    logo: "",
    footerCredit: "Photography by Hong-Duc Nguyen",
  },
} as const

export type SiteConfig = typeof siteConfig
export type LanguageCode =
  (typeof siteConfig.supportedLanguages)[number]