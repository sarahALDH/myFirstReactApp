# Instagram Feed Setup Instructions

This guide will help you set up the Instagram feed to automatically display your Instagram posts (excluding reels) on your website.

## Prerequisites

1. A Facebook Business Account
2. An Instagram Business or Creator Account
3. Access to Facebook Developers (https://developers.facebook.com/)

## Step 1: Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Business" as the app type
4. Fill in your app details and create the app

## Step 2: Add Instagram Basic Display Product

1. In your Facebook App dashboard, go to "Add Products"
2. Find "Instagram Basic Display" and click "Set Up"
3. Follow the setup wizard

## Step 3: Configure Instagram Basic Display

1. Go to "Basic Display" in your app settings
2. Add your website URL to "Valid OAuth Redirect URIs"
   - Example: `http://localhost:3000` (for development)
   - Example: `https://yourdomain.com` (for production)
3. Note down your **App ID** and **App Secret**

## Step 4: Get Access Token

### Option A: Using Instagram Basic Display API (User Token)

1. Go to "Basic Display" → "User Token Generator"
2. Click "Add or Remove Instagram Testers"
3. Add your Instagram account as a tester
4. Generate a token using the token generator
5. Copy the **Access Token**

### Option B: Using Instagram Graph API (Long-lived Token)

For production, you'll want a long-lived token:

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app
3. Generate a short-lived token
4. Exchange it for a long-lived token using:
   ```
   GET https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret={app-secret}&access_token={short-lived-token}
   ```

## Step 5: Add Environment Variable

1. Create or edit your `.env.local` file in the project root
2. Add your Instagram access token (use `INSTAGRAM_ACCESS_TOKEN` for server-side API route):

```env
INSTAGRAM_ACCESS_TOKEN=your_access_token_here
```

**Important**: Use `INSTAGRAM_ACCESS_TOKEN` (without `NEXT_PUBLIC_`) since we're using a server-side API route. This keeps your token secure and not exposed to the client.

3. Restart your development server

## Step 6: Test the Integration

1. Start your development server: `npm run dev`
2. Navigate to the page with the Instagram feed
3. You should see your latest 3 Instagram posts (excluding reels)

## Important Notes

- **Reels are automatically filtered out** - Only IMAGE and CAROUSEL_ALBUM posts are displayed
- **Token Expiration**: Access tokens expire. You may need to refresh them periodically
- **Rate Limits**: Instagram API has rate limits. The component fetches posts on page load
- **Privacy**: Make sure your Instagram account is set to public or the token has proper permissions

## Troubleshooting

### No posts showing

- Check that your access token is valid
- Verify your Instagram account has posts
- Check browser console for errors
- Ensure your token has `instagram_graph_user_media` permission

### Token expired

- Generate a new access token
- For production, implement token refresh logic

### CORS errors

- Instagram API should work from your domain
- If using localhost, make sure it's added to your app's redirect URIs

## Alternative: Using Third-Party Services

If setting up the Instagram API is too complex, you can use third-party services like:

- [Elfsight Instagram Feed](https://elfsight.com/instagram-feed-instashow/)
- [POWR Instagram Feed](https://www.powr.io/plugins/instagram-feed)
- [SnapWidget](https://snapwidget.com/)

These services handle the API integration for you and provide embed codes.
