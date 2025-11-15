# How to Share Your Localhost

## Quick Start

### Step 1: Start Your Development Server

In your first terminal, run:

```bash
npm run dev
```

Your app will be available at `http://localhost:3000`

### Step 2: Create a Public Tunnel

In a **second terminal window**, run:

```bash
npm run dev:tunnel
```

Or directly:

```bash
lt --port 3000
```

### Step 3: Share the URL

Localtunnel will give you a public URL like:

```
https://random-name.loca.lt
```

**Share this URL with the other person** - they can access your localhost through this link!

## Important Notes

- Keep both terminals running (dev server + tunnel)
- The URL changes each time you restart the tunnel
- The tunnel works as long as both terminals are open
- Both you and the other person can access the site through the tunnel URL

## Alternative: Using ngrok (More Stable)

If you want a more stable solution:

1. Sign up at https://ngrok.com (free)
2. Download ngrok
3. Run: `ngrok http 3000`
4. Get a permanent URL (with free account)

## Troubleshooting

- **Can't connect?** Make sure both `npm run dev` and `npm run dev:tunnel` are running
- **URL not working?** Try restarting the tunnel command
- **Slow connection?** This is normal with free tunneling services
