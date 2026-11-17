export type Celebration = {
  date: string;
  dateConfirmed: boolean;
  time: string;
  venue: string;
  address: string;
  city: string;
  mapsUrl: string;
  embedUrl: string;
  note: string;
};

// The wedding date is confirmed. Event times and reception details await confirmation.
export const weddingConfig = {
  couple: { bride: "Harika", groom: "Dharmendra" },
  timezone: "Asia/Kolkata",
  wedding: {
    date: "2026-12-23",
    dateConfirmed: true,
    time: "", // Local 24-hour time, e.g. '10:30'. Leave empty until confirmed.
    venue: "",
    address: "",
    city: "",
    mapsUrl: "",
    embedUrl: "",
    note: "With sacred vows and the blessings of our loved ones, we begin our forever.",
  } satisfies Celebration,
  reception: {
    date: "",
    dateConfirmed: false,
    time: "",
    venue: "",
    address: "",
    city: "",
    mapsUrl: "",
    embedUrl: "",
    note: "An evening of togetherness, warm wishes, and a beautiful new beginning.",
  } satisfies Celebration,
  invitation: {
    introduction:
      "Together with their families, joyfully invite you to celebrate their wedding.",
    message:
      "With love in our hearts and blessings from our families, we invite you to share in the joy of our wedding celebration.",
    presence:
      "Your presence will make our special moments even more memorable.",
    closing: "Your blessings and presence mean the world to us.",
  },
  religious: {
    heading: "शुभ विवाह",
    salutation: "॥ श्री गणेशाय नमः ॥",
    verse: ["वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः।", "निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"],
  },
  // Retain this address to keep the existing printed QR codes valid.
  siteUrl: "https://hari-aditya-003.github.io/harika-and-kittu/",
  qrEntryUrl: "https://hari-aditya-003.github.io/harika-and-kittu/",
  musicEnabledByDefault: false,
};
