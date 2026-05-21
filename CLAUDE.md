# Innogen Research — WordPress Development

WordPress e-commerce site for peptide education and sales.

## Site Info

| Field | Value |
|---|---|
| **Site URL** | https://innogenresearch.ca |
| **WordPress User** | russelbalmocena |
| **Theme** | Hello Elementor + Elementor page builder |
| **Plugins** | WooCommerce, Elementor |

## Credentials

Stored in `C:\Users\MYPC\.env` — never hardcode in scripts.

```
WP_SITE_URL=https://innogenresearch.ca
WP_USERNAME=russelbalmocena
WP_APP_PASSWORD=<see .env>
```

Always load from `.env` before making API calls.

## WordPress REST API

- Base: `https://innogenresearch.ca/wp-json/wp/v2/`
- WooCommerce: `https://innogenresearch.ca/wp-json/wc/v3/`
- Auth: Basic auth using `WP_USERNAME:WP_APP_PASSWORD` (base64 encoded)
- REST API connection confirmed and working

## Rules

- **Never publish pages or products immediately** — always use `status: draft`
- Use `POST /wp-json/wp/v2/pages` to create pages
- Use `POST /wp-json/wc/v3/products` to create products
- Upload images via `POST /wp-json/wp/v2/media` first, then attach by media ID

## Stack

- WordPress + WooCommerce
- Hello Elementor theme (child theme: hello-elementor-child)
- Elementor page builder
- REST API for programmatic content creation via Claude Code

## Work Log

- REST API connection tested and confirmed
- Dummy page published as ID 21901 (test)
- Variable product "Claude New Product" created as draft (ID: 21943)
  - Variation 1: Sample 1 — $20 (ID: 21945)
  - Variation 2: Sample 2 — $30 (ID: 21946)
  - Product image uploaded to media library (ID: 21947)
