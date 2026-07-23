# Mukadma Website

Static website for Mukadma business/service information, plus a separate password reset page for app links.

## Homepage

The root `index.html` is a descriptive static website. It does not load `config.js`, `app.js`, or call any backend service.

The homepage describes:

- Legal Consultancy
- Case Status Check
- Hire a Lawyer
- Legal Assistance
- Criminal, civil, family, and other case categories
- Lawyer verification, dashboards, and consultation support

SEO basics included:

- Search-friendly title and meta description
- Open Graph and Twitter metadata
- `LegalService` structured data
- `robots.txt`
- `sitemap.xml`
- Semantic headings and landmark navigation

## Password reset

The reset page reads the token from the URL and sends the same payload used by the React Native app:

```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-url",
  "newPassword": "new-password"
}
```

Example local URL:

```text
http://localhost:8081/reset-password/?token=l_tAlOveeHFSFSbrvh8tfzTiqO31FYgpJ_x2GZNpaJM
```

## Backend URL

Update `config.js` if the backend base URL changes:

```js
window.MUKADMA_CONFIG = {
  apiBaseUrl: "https://mukadma-backend-production-dade.up.railway.app",
};
```

## Run locally

From this folder:

```sh
python3 -m http.server 8081
```

Then open the example reset URL above.

## Deploy on GitHub Pages

Push this repository to GitHub, then enable Pages for the branch that contains these files. The included `reset-password/index.html` supports reset links like `/reset-password/?token=...`.

The sitemap and canonical URL currently target:

```text
https://mokoddoma.com/
```

Update `index.html`, `robots.txt`, and `sitemap.xml` if the production domain changes.
