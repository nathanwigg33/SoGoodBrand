# So Good

Simple shirts with the words he says every day. Plain website (HTML, CSS, a little JavaScript), hosted on Cloudflare.

## Change the words (sayings, quotes, story, prices)

Everything you'd want to edit is in **`public/content.js`**:

| Section | What it controls |
|---|---|
| `announcement` | Thin bar at the top of every page |
| `purposeStatement` | The headline, text and buttons people see first on the home page |
| `sayings` | The big rotating words in the dark band on the home page |
| `quotes` | "Things he says" on Our Story |
| `person`, `brainInjury`, `purpose`, `money` | The Our Story page: his story, photo, brain injury section, why we exist, where the money goes |
| `shirts` | Every product: saying, name, tee/crew, print size, price, colors, description, details, shop link |
| `colors` | Shirt colors and the print color on each |
| `sizes`, `fitNote`, `shippingNote` | Size chart, fit note, shipping & returns text |
| `faq` | Help & FAQ page |

To edit in GitHub: open `public/content.js`, click the pencil icon, change the text, then **Commit changes**. Cloudflare updates the live site in about a minute.

The product images are drawn by code (`public/assets/shirt.js`), so a new saying, color or shirt shows up automatically. When you have real photos or mockups, these can be swapped for images.

## Add his photo

Upload a photo into `public/assets/` (for example `his-photo.jpg`), then set `photo: "assets/his-photo.jpg"` in `content.js`.

## Turn on buying later

Each shirt has `shopLink: ""`. Paste the Shopify (or other) product link there and that product's button changes from "Notify me" to "Add to bag".

## Files

| File | What it is |
|---|---|
| `public/index.html` | Home: purpose statement, then the collection |
| `public/shop.html` | All products with Tees / Crewnecks filters |
| `public/product.html` | One product (`/product?id=so-good-tee`) |
| `public/story.html` | Our Story: his story, brain injury, where the money goes |
| `public/faq.html` | Help & FAQ + size chart |
| `public/assets/site.js` | Builds the pages from `content.js` |
| `public/assets/shirt.js` | Draws the product images |
| `public/assets/styles.css` | All the styling |

## Hosting

Cloudflare builds the site from this GitHub repo. Every push to `main` updates the live site automatically.
