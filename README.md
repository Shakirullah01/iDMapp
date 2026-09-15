# MedAccess — Medical Education Marketing Website

Static marketing and lead-generation website for a medical exam preparation resource platform.

No online payments, no login, no database, no shopping cart. Visitors browse resources and contact you via WhatsApp, Telegram, or email to arrange access manually.

## How to run locally

Because the Resources page loads `data/resources.json` with JavaScript `fetch`, open the site through a local server (opening `index.html` as a `file://` URL may block the resources list).

**Option A — VS Code / Cursor**

1. Install the “Live Server” extension (or similar).
2. Open the `website` folder.
3. Right-click `index.html` → Open with Live Server.

**Option B — Python**

```bash
cd website
python -m http.server 8080
```

Then visit: http://localhost:8080

**Option C — Node**

```bash
cd website
npx serve .
```

## Project structure

```
website/
├── index.html          Home
├── resources.html      Resource library (loads JSON)
├── exams.html          Exam categories
├── features.html       Feature details
├── pricing.html        Access plans
├── faq.html            FAQ
├── contact.html        Contact channels
├── privacy.html        Privacy placeholder
├── terms.html          Terms placeholder
├── refund.html         Refund placeholder
├── css/style.css       Design system & layout
├── js/main.js          Config + interactivity
├── data/resources.json Resource catalog
├── images/logo.png     Brand logo
└── README.md
```

## Where to change key settings

### Brand name

Edit `BRAND_NAME` in `js/main.js`:

```js
BRAND_NAME: "MedAccess",
```

Elements with `data-brand` update automatically. You can also search/replace “MedAccess” in HTML if you want the static markup to match.

### WhatsApp / Telegram / Email

Edit the top of `js/main.js`:

```js
WHATSAPP_NUMBER: "YOUR_NUMBER",       // e.g. "1234567890" (country code, no +)
TELEGRAM_USERNAME: "YOUR_USERNAME",   // without @
CONTACT_EMAIL: "YOUR_EMAIL",
```

### Prices

Edit `PRICES` in `js/main.js`:

```js
PRICES: {
  sixMonths: "$XX",
  oneYear: "$XX",
  twoYears: "$XX"
}
```

Pricing page elements with `data-price="sixMonths"`, `oneYear`, or `twoYears` update automatically.

### “Most Popular” badge

On `pricing.html`, the 1 Year card uses classes `pricing-card--popular` and an element `.pricing-card__badge`. Remove those to un-highlight that plan.

### Resources (add / edit / remove)

Edit `data/resources.json`. Each item looks like:

```json
{
  "id": "unique-id",
  "title": "Resource title",
  "category": "USMLE",
  "type": "Question Banks",
  "description": "Short description.",
  "tags": ["USMLE", "Question Banks"]
}
```

### Colors

Edit CSS variables at the top of `css/style.css` (`:root` for day view, `[data-theme="dark"]` for night view).

### Day / Night view

Use the sun/moon button in the navigation. Preference is saved in the browser (`localStorage` key: `medaccess-theme`).

### Logo

Replace `images/logo.png` with your own square logo (keep the same filename, or update `src` paths in HTML).

## Get Access flow

Clicking **Get Access** opens a modal with WhatsApp, Telegram, and Email.

- If a pricing plan was selected, WhatsApp/email messages include that plan name.
- No payment is processed on the website.

## Deploy as a static website

Upload the contents of the `website` folder to any static host:

- Netlify, Vercel, Cloudflare Pages, GitHub Pages
- Shared hosting / cPanel public_html
- Any CDN or object storage with static hosting (S3 + CloudFront, etc.)

Point the host’s publish directory at the folder that contains `index.html`.

## Notes

- Placeholder brand name is **MedAccess** — change it before launch.
- Legal pages are stubs — replace with real policies.
- Resource data is sample content for development.
- This site is an independent project and is not affiliated with any third-party brand.
