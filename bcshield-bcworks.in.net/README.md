## BC SHIELD @LATEST VERSION 1.0

**BC Shield** is an all-in-one, lightweight JavaScript security script designed to protect your web pages from common threats and unwanted interactions. It provides runtime protections such as:

- Blocking your site from being embedded inside iframes (preventing clickjacking),
- Detecting and blocking access when Developer Tools are open (to prevent code tampering or inspection),
- Bot traps to detect automated form submissions,
- Disabling right-click and common copy/paste keyboard shortcuts to prevent content theft,
- A sanitizer utility to clean input strings from malicious characters.

BC Shield runs entirely on the client side without dependencies, injecting necessary CSS and safeguards dynamically, giving you a simple, configurable layer of protection — all packed inside a single self-contained JavaScript file.

![GitHub Repo stars](https://img.shields.io/github/stars/guider23/bcshield?style=social)
![GitHub Issues](https://img.shields.io/github/issues/guider23/bcshield?style=social)




<br>


# BC Shield - Online Installation Guide

Add the following script tag to your HTML file, ideally before the closing `</body>` tag or inside the `<head>` section:

```html
<script src="https://cdn.jsdelivr.net/gh/guider23/bcshield@yourdomain/bc-shield.js" defer></script>
```

- The `defer` attribute ensures the script loads **after** your HTML content is parsed.
- No additional setup needed — just include the script and you’re protected!



<br>




# BC Shield - Local Installation Guide

*Boost your project security and performance by hosting `bc-shield.js` locally!*


---

## Why Install BC Shield Locally?

- **Faster Load Times**: No CDN network delay—scripts load instantly from your server.
- **Version Control**: Lock to a specific version and avoid unexpected external updates.
- **Offline Support**: Perfect for restricted environments or development without internet.
- **Easier Debugging**: Customize and troubleshoot without CDN caching issues.

---

## Step 1: Download `bc-shield.js`

Grab the script and place it in your project folder using one of these methods:

### Using `curl` (Windows, macOS, Linux)

```bash
curl -o bc-shield.js https://cdn.jsdelivr.net/gh/guider23/bcshield@yourdomain/bc-shield.js
```

### Using `wget` (macOS, Linux)

```bash
wget -O bc-shield.js https://cdn.jsdelivr.net/gh/guider23/bcshield@yourdomain/bc-shield.js
```

### Using PowerShell (Windows)

```powershell
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/gh/guider23/bcshield@yourdomain/bc-shield.js" -OutFile "bc-shield.js"
```

---

## Step 2: Include `bc-shield.js` in Your HTML

Add this line to your **`index.html`** (or any HTML file), ideally **before the closing `</body>` tag** or inside the `<head>` section:

```html
<script src="bc-shield.js" defer></script>
```

> **Note:**  
> - The `defer` attribute ensures the script loads *after* your HTML is parsed, preventing render-blocking.  
> - Make sure `bc-shield.js` is in the **same directory** as your HTML file.  
> - If you put it in a subfolder, adjust the path accordingly, e.g.:  
> `<script src="scripts/bc-shield.js" defer></script>`

---

## Step 3: Verify Your Setup

1. Open your webpage in any modern browser.
2. Open Developer Tools:  
   - Windows/Linux: `F12` or `Ctrl + Shift + I`  
   - macOS: `Cmd + Option + I`
3. Check the **Console** tab for errors.
4. If there are **no errors**, your BC Shield script loaded successfully! 🎉

---

##  Optional: Keep `bc-shield.js` Updated

To stay on the cutting edge:

- Periodically rerun your download command from **Step 1**.
- Automate updates in your build pipeline or CI/CD process for hassle-free maintenance.

---

> **Need automation scripts or integration tips for your build process?**  
> Just ask — I got you covered! 😎

---
> Version History <br>
> Main - Only JavaScript <br>
> 1.0  - JavaScript + CSS (Stlying added) <br>
> 2.0  - Advanced Javascript Update (Upcoming)

*Crafted by Siddarth, powered by BC Shield — your ultimate script protector.*
