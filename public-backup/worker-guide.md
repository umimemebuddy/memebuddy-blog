---
layout: ../../layouts/Layout.astro
title: Worker Setup Guide
---

# Cloudflare Worker Setup Guide

## Step 1: Create Worker
1. Go to https://dash.cloudflare.com/workers
2. Click **Create Application**
3. Click **Create Worker**
4. Name: `memebuddy-upload`
5. Click **Deploy**

## Step 2: Configure Worker
1. Click **Edit code**
2. Delete ALL existing code
3. Copy and paste this code:

```javascript
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method === "POST") {
      try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
          return new Response(JSON.stringify({ error: "No file provided" }), {
            status: 400,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
          });
        }

        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const arrayBuffer = await file.arrayBuffer();
        
        await env.MEMEBUDDY_IMAGES.put(filename, arrayBuffer, {
          httpMetadata: { contentType: file.type },
        });

        const publicUrl = `https://pub-${env.ACCOUNT_ID}.r2.dev/${filename}`;
        
        return new Response(JSON.stringify({ success: true, url: publicUrl }), {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }
    }

    if (request.method === "GET") {
      try {
        const objects = await env.MEMEBUDDY_IMAGES.list();
        const images = objects.objects.map(obj => ({
          name: obj.key,
          url: `https://pub-${env.ACCOUNT_ID}.r2.dev/${obj.key}`,
          uploaded: obj.uploaded,
          size: obj.size,
        }));
        
        return new Response(JSON.stringify({ images }), {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }
    }

    return new Response("Method not allowed", { status: 405 });
  },
};
```

## Step 3: Add R2 Binding
1. In Worker settings, find **Variables** or **Bindings**
2. Add:
   - **Variable name**: `MEMEBUDDY_IMAGES`
   - **R2 Bucket**: `memebuddy-images`
3. Add:
   - **Variable name**: `ACCOUNT_ID`
   - **Value**: `3fef9be780b2a26cf9ef659ac1d39246`

## Step 4: Make Bucket Public
1. Go to R2 bucket settings
2. Enable **Public Access**
3. Set domain: `pub-${your-account-id}.r2.dev`

Done! Let me know when you've completed these steps.
