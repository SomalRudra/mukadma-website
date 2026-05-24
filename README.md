# Mukadma Website

Minimal static website for Mukadma password reset links.

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
