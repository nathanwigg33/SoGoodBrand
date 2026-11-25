# So Good

Simple shirts with the words he says every day. Plain website (HTML, CSS, a little JavaScript), hosted on Cloudflare.

## Change the words (sayings, quotes, story, prices)

Everything you'd want to edit is in **`public/content.js`**:

| Section | What it controls |
|---|---|
| `sayings` | The big speech bubble on the home page (tap it to cycle) |
| `heroText` | The paragraph under the bubble |
| `quotes` | "Things he says" speech bubbles |
| `person` | His name, photo, caption and story (Our Purpose page) |
| `purpose` | The three "what we're here to do" points |
| `money` | Where the Money Goes: the split, the promise, updates |
| `shirts` | Every shirt: saying, name, price, colors, description, shop link |
| `colors` | Shirt colors and the print color on each |
| `sizes`, `fitNote` | Size chart and fit note |
| `faq` | Questions page |

To edit in GitHub: open `public/content.js`, click the pencil icon, change the text, then **Commit changes**. Cloudflare updates the live site in about a minute.

The shirts are drawn by code, so a new saying shows up on the shirt picture automatically.

## Add his photo

Upload a photo into `public/assets/` (for example `his-photo.jpg`), then set `photo: "assets/his-photo.jpg"` in `content.js`.

## Turn on buying later

Each shirt has `shopLink: ""`. Paste the Shopify (or other) product link there and that shirt's button changes from "Get notified" to "Buy now".

## Files

| File | What it is |
|---|---|
| `public/index.html` | Home |
| `public/shop.html` | All shirts |
| `public/shirt.html` | One shirt (`/shirt?id=so-good-tee`) |
| `public/purpose.html` | Our Purpose |
| `public/money.html` | Where the Money Goes |
| `public/faq.html` | FAQ + size chart |
| `public/assets/site.js` | Builds the pages from `content.js` |
| `public/assets/styles.css` | All the styling |

## Hosting

Cloudflare builds the site from this GitHub repo. Every push to `main` updates the live site automatically.
