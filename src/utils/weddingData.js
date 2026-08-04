export const wedding = {
  // Derived from the couple's names — change freely if you use a different tag.
  hashtag: "#Nandhawedsnandhini",

  groom: {
    name: "Nandha Kumar",
    // TODO: add the groom's parents, e.g. "Son of Mr. ____ & Mrs. ____"
    parents: "",
    // TODO: add the groom's home town, e.g. "Madurai, Tamil Nadu"
    place: "",
    quote: '"A heart full of dreams, a soul full of love"',
  },

  bride: {
    name: "Ega Nandhini",
    // TODO: add the bride's parents, e.g. "Daughter of Mr. ____ & Mrs. ____"
    parents: "",
    // TODO: add the bride's home town
    place: "",
    quote: '"Graceful, radiant, and endlessly kind"',
  },

  dateRange: "September 13, 2026",
  cities: "Madurai, Tamil Nadu",

  // Drives the countdown. Time is a placeholder — set the real muhurtham time
  // here so the countdown lands on the exact hour.
  weddingDateISO: "2026-09-13T08:00:00+05:30",

  events: [
    {
      tag: "The Union",
      title: "Wedding",
      venue: "Abirami Kalyana Mahal",
      address: "15, Thoomatti 2nd Cross Street, New Ramnad Rd",
      location: "Madurai",
      date: "September 13, 2026",
      // TODO: replace with the muhurtham time once fixed.
      time: "To be announced",
      // The couple's own Google Maps pin.
      mapUrl: "https://maps.app.goo.gl/QRh7dnsSaq3z5Ecu6",
      mapQuery: "Abirami Kalyana Mahal, New Ramnad Rd, Madurai, Tamil Nadu 625009",
    },
  ],

  blessing:
    "May your love story be filled with timeless devotion, gentle laughter, and the quiet strength of two hearts becoming one.",

  gallery: [
    { id: 1, tall: true },
    { id: 2, tall: false },
    { id: 3, tall: false },
    { id: 4, tall: true },
    { id: 5, tall: false },
    { id: 6, tall: true },
    { id: 7, tall: false },
    { id: 8, tall: false },
  ],
};
