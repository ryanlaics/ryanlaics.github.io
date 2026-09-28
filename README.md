# Zhichen Lai — Personal Academic Homepage

Static website for https://www.zhichenlai.com/.

## Local preview

Run `python3 -m http.server 8765 --bind 127.0.0.1` in this folder, then open http://127.0.0.1:8765/.

## Files

- `index.html`: biography, publications, projects, experience, recruitment and contact.
- `assets/css/site.css`: custom styles.
- `assets/js/main.js`: navigation, typing animation and email copy.
- `assets/img/`: portraits, university logos and sharing image.
- `assets/vendor/`: required Bootstrap CSS, icons, AOS and Typed.js.
- `CNAME`: custom domain configuration.
- `Readme.txt`: original template attribution and license link; retain it.

No build step is required. After editing CSS or JavaScript, update its `?v=` version in `index.html` to avoid stale caches. Deploy the contents of this folder with `index.html` at the site root.
