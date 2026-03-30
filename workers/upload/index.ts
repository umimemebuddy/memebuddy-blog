// Cloudflare Worker for R2 Image Upload
// Save as: workers/upload/index.ts

export default {
  async fetch(request, env) {
    // Handle CORS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // Handle POST - Upload image
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

        // Generate unique filename
        const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        
        // Convert file to ArrayBuffer
        const arrayBuffer = await file.arrayBuffer();
        
        // Upload to R2
        await env.MEMEBUDDY_IMAGES.put(filename, arrayBuffer, {
          httpMetadata: {
            contentType: file.type,
          },
        });

        // Return the public URL
        const publicUrl = `https://pub-${env.ACCOUNT_ID}.r2.dev/${filename}`;
        
        return new Response(JSON.stringify({ 
          success: true, 
          url: publicUrl,
          filename: filename 
        }), {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        });
      }
    }

    // Handle GET - List images
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

// Worker configuration (wrangler.toml):
/*
name = "memebuddy-upload"
main = "index.ts"
compatibility_date = "2024-01-01"

[[r2_buckets]]
binding = "MEMEBUDDY_IMAGES"
bucket_name = "memebuddy-images"

[vars]
ACCOUNT_ID = "3fef9be780b2a26cf9ef659ac1d39246"
*/
