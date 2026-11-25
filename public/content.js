/* =====================================================================
   SO GOOD — SITE CONTENT
   ---------------------------------------------------------------------
   Every word on the website lives in this one file.
   Change the text between the "quotes", save, and the site updates.

   Tips:
   - Keep the quote marks and the comma at the end of each line.
   - To add a saying or quote, copy a line and change the words.
   - To add a shirt, copy one { ... } block in "shirts" and edit it.
   - Shirt colors are names from the "colors" list near the bottom.
   ===================================================================== */

window.SOGOOD = {

  brand: "So Good",
  tagline: "Simple shirts. Big heart.",

  // Thin bar at the very top of every page.
  announcement: "First collection coming soon. Part of every piece supports brain injury recovery.",

  // Who to email. Used for "Notify me" and the contact links.
  contactEmail: "hello@sogood.example",

  // Optional: paste links here and they appear in the footer.
  instagram: "",
  tiktok: "",
  facebook: "",

  /* ---------- HOME PAGE: the purpose statement people see first ---------- */

  purposeStatement: {
    headline: "Two little words. A whole lot of heart.",
    text: "[His Name] says “so good” every day. After his brain injury, those words became his way of telling the world he's still here, still grateful, still himself. We put them on clothes you'll actually want to wear, and part of every piece goes back to him and people like him.",
    button: "Shop the collection",
    link: "Read our story",
  },

  // The rotating line under the logo on the home page and in the footer.
  sayings: [
    "So good",
    "Very good",
    "So, so good",
    "Very, very good",
    "Yup",
  ],

  // Quotes shown on the home page and Our Story page.
  quotes: [
    { text: "So good.", who: "[His Name], about almost everything" },
    { text: "Very good. Very, very good.", who: "[His Name], after his first walk outside" },
    { text: "Yup.", who: "[His Name], when you ask if he wants dessert" },
    { text: "He reminds all of us to notice the good.", who: "[Family member]" },
  ],

  /* ---------- OUR STORY PAGE (the deeper purpose page) ---------- */

  person: {
    name: "[His Name]",
    // Put a photo in public/assets/ and type its file name here,
    // for example "assets/his-photo.jpg". Leave "" to show a placeholder.
    photo: "",
    photoCaption: "[His Name], [City], [Year]",
    story: [
      "[His Name] was [age] when [briefly, what happened: an accident, a fall, an illness]. The injury changed how he talks, moves and remembers.",
      "But some things stayed. When something makes him happy, he says it: “So good.” A meal, a song, a hug, a sunny day. “Very good.” And when you ask him a question, more often than not: “Yup.”",
      "We started So Good to put his words on clothes, so more people can carry a little of his outlook, and so every piece helps pay for the care and therapy that keep him moving forward.",
    ],
  },

  // A section about brain injury recovery in general.
  brainInjury: {
    headline: "Life after a brain injury",
    paragraphs: [
      "[Write here about what recovery has looked like for him and his family: therapies, small wins, hard days, the people who helped.]",
      "[Write here about why you want to help other survivors and families, and what kind of help matters most: therapy costs, equipment, time, community.]",
    ],
  },

  purpose: {
    headline: "Why we exist",
    points: [
      { title: "Share his outlook", text: "Two simple words that remind people to notice the good, wherever they're worn." },
      { title: "Support his recovery", text: "Money from every piece goes toward his therapy, care and everyday needs." },
      { title: "Help people like him", text: "As we grow, we want to help other brain injury survivors and their families too." },
    ],
  },

  money: {
    headline: "Where the money goes",
    intro:
      "We haven't finalized the exact split yet. These numbers are placeholders, and we'll post the real breakdown here before the first piece sells.",
    // How one tee's price is split. Colors are from the list below.
    parts: [
      { label: "Making & shipping the shirt", amount: 14, color: "oat" },
      { label: "[His Name]'s care & therapy", amount: 10, color: "charcoal" },
      { label: "Helping other survivors", amount: 4, color: "sage" },
    ],
    promise:
      "We'll share an update every few months showing how much was raised and exactly where it went.",
    updates: [
      // Add updates like this:
      // { date: "March 2027", text: "$1,240 raised. Paid for 8 weeks of speech therapy." },
    ],
  },

  /* ---------- SHIRTS ---------- */
  // kind: "tee" or "crew"
  // print: "center" (big on the chest) or "chest" (small, left chest)
  // printFont: "serif" or "sans"
  // shopLink: paste your Shopify (or other) product link here later.
  //   When it's empty, the button says "Notify me" instead of "Add to bag".

  shirts: [
    {
      id: "so-good-tee",
      saying: "So good",
      name: "So Good Tee",
      kind: "tee",
      print: "center",
      printFont: "serif",
      price: 28,
      colors: ["bone", "charcoal", "oat", "sage"],
      description: "The original. A heavyweight everyday tee with the words he says most, printed across the chest.",
      details: ["Heavyweight 100% cotton", "Relaxed unisex fit", "Garment-dyed for a soft, worn-in feel", "Printed in the USA"],
      shopLink: "",
    },
    {
      id: "very-good-tee",
      saying: "Very good",
      name: "Very Good Tee",
      kind: "tee",
      print: "center",
      printFont: "serif",
      price: 28,
      colors: ["charcoal", "bone", "navy"],
      description: "For the days that are better than good.",
      details: ["Heavyweight 100% cotton", "Relaxed unisex fit", "Garment-dyed for a soft, worn-in feel", "Printed in the USA"],
      shopLink: "",
    },
    {
      id: "yup-tee",
      saying: "Yup",
      name: "Yup Tee",
      kind: "tee",
      print: "chest",
      printFont: "serif",
      price: 28,
      colors: ["sage", "bone", "charcoal"],
      description: "One word. Total agreement. His go-to answer for just about everything, small on the left chest.",
      details: ["Heavyweight 100% cotton", "Relaxed unisex fit", "Garment-dyed for a soft, worn-in feel", "Printed in the USA"],
      shopLink: "",
    },
    {
      id: "so-good-crew",
      saying: "So good",
      name: "So Good Crewneck",
      kind: "crew",
      print: "center",
      printFont: "serif",
      price: 58,
      colors: ["oat", "navy", "bone"],
      description: "A brushed-fleece crewneck for cozy, so-good days.",
      details: ["Midweight cotton fleece, brushed inside", "Ribbed collar, cuffs and hem", "Relaxed unisex fit", "Printed in the USA"],
      shopLink: "",
    },
    {
      id: "very-good-crew",
      saying: "Very good",
      name: "Very Good Crewneck",
      kind: "crew",
      print: "chest",
      printFont: "serif",
      price: 58,
      colors: ["navy", "charcoal", "oat"],
      description: "Same words, warmer fit. Small and simple on the left chest.",
      details: ["Midweight cotton fleece, brushed inside", "Ribbed collar, cuffs and hem", "Relaxed unisex fit", "Printed in the USA"],
      shopLink: "",
    },
  ],

  // Shirt color names and how they look. Add your own: name: ["shirt color", "print color"]
  colors: {
    bone:     ["#F1EDE5", "#2A2824"],
    oat:      ["#DED3C0", "#2A2824"],
    sage:     ["#9DA58C", "#F3EFE7"],
    charcoal: ["#2E2D2B", "#ECE6DA"],
    navy:     ["#3A4456", "#EEE8DD"],
  },

  /* ---------- SIZES & FIT ---------- */

  fitNote: "Relaxed unisex fit. Runs true to size. Size down for a closer fit.",
  sizes: [
    // size, chest width (inches, laid flat), length (inches)
    ["S", 20, 28],
    ["M", 21.5, 29],
    ["L", 23, 30],
    ["XL", 24.5, 31],
    ["2XL", 26, 32],
  ],

  shippingNote: "[Shipping times and return policy go here once printing is set up. For example: free shipping over $75, exchanges within 30 days.]",

  /* ---------- QUESTIONS (FAQ) ---------- */

  faq: [
    { q: "When can I buy?", a: "Soon. We're setting up printing and shipping now. Tap “Notify me” on any piece and we'll email you the day it's ready." },
    { q: "How do I pick my size?", a: "Our pieces are a relaxed unisex fit and run true to size. Check the size chart on any product page and compare it to a shirt you already love." },
    { q: "Where does the money go?", a: "Part of every sale supports [His Name]'s care and recovery, and part helps other brain injury survivors. See Our Story for the breakdown." },
    { q: "Can I return or exchange?", a: "[Return policy goes here, for example: exchanges within 30 days for unworn pieces.]" },
    { q: "How long does shipping take?", a: "[Shipping times go here once printing is set up.]" },
  ],
};
