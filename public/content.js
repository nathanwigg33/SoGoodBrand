/* =====================================================================
   SO GOOD — SITE CONTENT
   ---------------------------------------------------------------------
   Every word on the website lives in this one file.
   Change the text between the "quotes", save, and the site updates.

   Tips:
   - Keep the quote marks and the comma at the end of each line.
   - To add a saying, copy a line in "sayings" and change the words.
   - To add a shirt, copy one { ... } block in "shirts" and edit it.
   - Shirt colors are names from the "colors" list near the bottom.
   ===================================================================== */

window.SOGOOD = {

  brand: "So Good",
  tagline: "Simple shirts. Big heart.",

  // Who to email. Used for "Get notified" and the contact links.
  contactEmail: "hello@sogood.example",

  // Optional: paste links here and the icons appear in the footer.
  instagram: "",
  tiktok: "",
  facebook: "",

  /* ---------- HOME PAGE ---------- */

  // The big word at the top of the home page cycles through these.
  // Tap/click it on the site to hear the next one.
  sayings: [
    "So good",
    "Very good",
    "So, so good",
    "Very, very good",
  ],

  heroText:
    "[His Name] says these words every day. After his brain injury, they became his way of telling the world he's still here, still grateful, still himself. Now you can wear them too.",

  // Little quotes that show up around the site. Add as many as you like.
  quotes: [
    { text: "So good.", who: "[His Name], about almost everything" },
    { text: "Very good. Very, very good.", who: "[His Name], after his first walk outside" },
    { text: "He reminds all of us to notice the good.", who: "[Family member]" },
  ],

  /* ---------- OUR PURPOSE PAGE ---------- */

  person: {
    name: "[His Name]",
    // Put a photo in public/assets/ and type its file name here,
    // for example "assets/his-photo.jpg". Leave "" to show a placeholder.
    photo: "",
    photoCaption: "[His Name], [City], [Year]",
    story: [
      "[His Name] was [age] when [briefly, what happened — an accident, a fall, an illness]. The injury changed how he talks, moves and remembers.",
      "But some things stayed. When something makes him happy, he says it: \"So good.\" A meal, a song, a hug, a sunny day. \"Very good.\"",
      "We started So Good to put his words on shirts, so more people can carry a little of his outlook, and so every shirt helps pay for the care and therapy that keep him moving forward.",
    ],
  },

  purpose: {
    headline: "We started with his words.",
    points: [
      { title: "Share his outlook", text: "Two simple words that remind people to notice the good, wherever they're worn." },
      { title: "Support his recovery", text: "Money from every shirt goes toward his therapy, care and everyday needs." },
      { title: "Help people like him", text: "As we grow, we want to help other brain injury survivors and their families too." },
    ],
  },

  /* ---------- WHERE THE MONEY GOES PAGE ---------- */

  money: {
    headline: "Where the money from every tee goes",
    intro:
      "We haven't finalized the exact split yet. These numbers are placeholders, and we'll post the real breakdown here before the first shirt sells.",
    // The parts should add up to the shirt price above. Colors are from the list below.
    parts: [
      { label: "Making & shipping the shirt", amount: 14, color: "sky" },
      { label: "[His Name]'s care & therapy", amount: 10, color: "sun" },
      { label: "Helping other survivors", amount: 4, color: "bubblegum" },
    ],
    promise:
      "We'll share an update every few months showing how much was raised and exactly where it went.",
    updates: [
      // Add updates like this:
      // { date: "March 2027", text: "$1,240 raised. Paid for 8 weeks of speech therapy." },
    ],
  },

  /* ---------- SHIRTS ---------- */
  // "shopLink": paste your Shopify (or other) product link here later.
  // When it's empty, the button says "Get notified" instead of "Buy".

  shirts: [
    {
      id: "so-good-tee",
      saying: "So good",
      name: "So Good Tee",
      kind: "tee",
      price: 28,
      colors: ["white", "sun", "sky", "bubblegum"],
      description: "The original. Soft, everyday tee with the words he says most.",
      shopLink: "",
    },
    {
      id: "very-good-tee",
      saying: "Very good",
      name: "Very Good Tee",
      kind: "tee",
      price: 28,
      colors: ["sun", "white", "grass", "ink"],
      description: "For the days that are better than good.",
      shopLink: "",
    },
    {
      id: "so-good-crew",
      saying: "So good",
      name: "So Good Crewneck",
      kind: "crew",
      price: 48,
      colors: ["sky", "ink", "white"],
      description: "Heavyweight crewneck sweatshirt for cozy, so-good days.",
      shopLink: "",
    },
    {
      id: "very-good-crew",
      saying: "Very good",
      name: "Very Good Crewneck",
      kind: "crew",
      price: 48,
      colors: ["bubblegum", "grass", "ink"],
      description: "Same words, warmer fit.",
      shopLink: "",
    },
  ],

  // Shirt color names and how they look. Add your own: name: ["shirt color", "print color"]
  colors: {
    white:     ["#FFFFFF", "#1B1F5E"],
    sun:       ["#FFD23F", "#1B1F5E"],
    sky:       ["#7CC4FF", "#1B1F5E"],
    bubblegum: ["#FF8FC7", "#1B1F5E"],
    grass:     ["#3FC27A", "#FFFFFF"],
    ink:       ["#1B1F5E", "#FFD23F"],
  },

  /* ---------- SIZES & FIT ---------- */

  fitNote: "Unisex fit. Runs true to size. Size up for a roomy look.",
  sizes: [
    // size, chest width (inches, laid flat), length (inches)
    ["S", 18, 28],
    ["M", 20, 29],
    ["L", 22, 30],
    ["XL", 24, 31],
    ["2XL", 26, 32],
  ],

  /* ---------- QUESTIONS (FAQ) ---------- */

  faq: [
    { q: "When can I buy a shirt?", a: "Soon! We're setting up printing and shipping now. Tap \"Get notified\" on any shirt and we'll email you when it's ready." },
    { q: "How do I pick my size?", a: "Our shirts are a unisex fit and run true to size. Check the size chart on any shirt page and compare it to a shirt you already love." },
    { q: "Where does the money go?", a: "Part of every sale supports [His Name]'s care and recovery, and part helps other brain injury survivors. See the Where the Money Goes page for details." },
    { q: "Can I return or exchange?", a: "[Return policy goes here, for example: exchanges within 30 days for unworn shirts.]" },
    { q: "How long does shipping take?", a: "[Shipping times go here once printing is set up.]" },
  ],
};
