# Share Localhost Without Password

## Method 1: Using Serveo (Easiest - No Installation)

Serveo is a free SSH-based tunnel that requires no installation or signup.

### Steps:

1. **Make sure your dev server is running:**

   ```bash
   npm run dev
   ```

2. **Open a new terminal and run:**

   ```bash
   ssh -R 80:localhost:3000 serveo.net
   ```

3. **You'll get a URL like:** `https://random-name.serveo.net`
   - **Share this URL** - no password needed!

**Note:** If you don't have SSH on Windows, use Method 2 or 3 below.

---

## Method 2: Using Local Network (Same WiFi)

If both you and the other person are on the same WiFi network:

1. **Your dev server is already configured** to accept network connections (listening on 0.0.0.0)

2. **Find your local IP address:**

   - Open Command Prompt
   - Run: `ipconfig`
   - Look for "IPv4 Address" (e.g., `192.168.1.100`)

3. **Share this URL:** `http://YOUR_IP:3000`
   - Example: `http://192.168.1.100:3000`

**Note:** This only works if both devices are on the same network.

---

## Method 3: Quick Setup with ngrok (Free Account)

1. **Sign up for free:** https://dashboard.ngrok.com/signup

2. **Get your authtoken** from: https://dashboard.ngrok.com/get-started/your-authtoken

3. **Configure ngrok:**

   ```bash
   ngrok config add-authtoken YOUR_TOKEN_HERE
   ```

4. **Start tunnel:**

   ```bash
   ngrok http 3000
   ```

5. **Share the URL** (no password needed with free account)

---

## Method 4: Using Cloudflare Tunnel (No Signup Required)

1. **Download cloudflared:**

   - Visit: https://github.com/cloudflare/cloudflared/releases
   - Download `cloudflared-windows-amd64.exe`
   - Rename to `cloudflared.exe` and place in your project folder

2. **Run:**

   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```

3. **Share the URL** it provides (no password needed)

---

## Recommended: Method 1 (Serveo) or Method 4 (Cloudflare)

Both are free and don't require passwords or signups!
