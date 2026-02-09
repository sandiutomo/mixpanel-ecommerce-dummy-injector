require("dotenv").config();
const fetch = require("node-fetch");

const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN;

/**
 * DEBUG SCRIPT: Test Mixpanel Profile Upload
 * 
 * This script tests if user profiles are being sent correctly to Mixpanel.
 * Run this to verify your Mixpanel token and profile format are working.
 * 
 * Usage: node debug_mixpanel.js
 */

async function testProfileUpload() {
  if (!MIXPANEL_TOKEN) {
    console.error("❌ ERROR: MIXPANEL_TOKEN not found in .env file");
    console.log("\nCreate a .env file with:");
    console.log("MIXPANEL_TOKEN=your_actual_token_here");
    return;
  }

  console.log("🔍 Testing Mixpanel Profile Upload...\n");
  console.log("Token:", MIXPANEL_TOKEN.substring(0, 8) + "..." + "(hidden)");

  // Create a test user profile
  const testProfile = {
    $token: MIXPANEL_TOKEN,
    $distinct_id: "test_user_" + Date.now(),
    $set: {
      // Mixpanel special properties (must have $ prefix)
      $name: "Test User",
      $email: "test@example.com",
      $avatar: "https://i.pravatar.cc/300",
      $city: "Jakarta",
      $region: "DKI Jakarta",
      // Custom properties
      first_name: "Test",
      last_name: "User",
      gender: "Male",
      country: "Indonesia",
      carrier: "Telkomsel",
      Total_Spend_IDR: 150000,
      Total_Orders: 3,
      // Account info (in $set so it can update if needed)
      account_created: new Date().toISOString(),
      initial_utm_source: "google",
      initial_utm_medium: "cpc"
    }
    // NOTE: Removed $set_once - HTTP API only accepts ONE operation per request
  };

  console.log("\n📤 Sending test profile:");
  console.log(JSON.stringify(testProfile, null, 2));

  try {
    // Mixpanel HTTP API requires data to be base64-encoded in a 'data' parameter
    const requestBody = [testProfile];
    const dataParam = Buffer.from(JSON.stringify(requestBody)).toString('base64');
    
    // Add verbose=1 to get detailed error messages from Mixpanel
    const url = `https://api.mixpanel.com/engage?data=${dataParam}&verbose=1`;
    
    console.log("\n🔗 API Call:");
    console.log("URL:", url.substring(0, 80) + "...");
    console.log("Method: POST");
    console.log("\n📋 Decoded payload preview:");
    console.log(JSON.stringify(requestBody, null, 2).substring(0, 500) + "...");

    const response = await fetch(url, {
      method: "POST",
      headers: { 
        "Accept": "text/plain"
      }
    });

    const responseText = await response.text();
    
    console.log("\n📥 Response status:", response.status);
    console.log("📥 Response body:", responseText);

    if (response.ok) {
      // With verbose=1, Mixpanel returns JSON with detailed info
      try {
        const result = JSON.parse(responseText);
        
        if (result.status === 1) {
          console.log("\n✅ SUCCESS! Profile uploaded to Mixpanel");
          console.log("\nNext steps:");
          console.log("1. Go to your Mixpanel project");
          console.log("2. Navigate to: Users > View Users");
          console.log("3. Search for:", testProfile.$distinct_id);
          console.log("4. Click on the user to see their properties");
          console.log("\nExpected properties:");
          console.log("- Name: Test User");
          console.log("- Email: test@example.com");
          console.log("- City: Jakarta");
          console.log("- Total Spend IDR: 150000");
          console.log("- Total Orders: 3");
        } else {
          console.log("\n❌ FAILED: Mixpanel rejected the data");
          console.log("\n🔍 Detailed error from Mixpanel:");
          console.log(JSON.stringify(result, null, 2));
          
          if (result.error) {
            console.log("\n💡 Error message:", result.error);
          }
          
          console.log("\nCommon issues:");
          console.log("1. Token mismatch - verify your project token");
          console.log("2. Invalid property names or values");
          console.log("3. Missing required fields");
        }
      } catch (e) {
        // Response is plain text "0" or "1"
        const success = responseText.trim() === "1";
        
        if (success) {
          console.log("\n✅ SUCCESS! Profile uploaded to Mixpanel");
        } else {
          console.log("\n❌ FAILED: Mixpanel rejected the data (returned 0)");
          console.log("\nPossible causes:");
          console.log("1. Token is incorrect or doesn't have permissions");
          console.log("2. Data format doesn't match Mixpanel's expectations");
          console.log("3. distinct_id format is invalid");
          console.log("\n💡 Verify your token at: Mixpanel → Settings → Project Settings → Token");
        }
      }
    } else {
      console.log("\n❌ HTTP ERROR:", response.status);
      console.log("Response:", responseText);
      
      if (response.status === 401) {
        console.log("\n💡 This usually means your MIXPANEL_TOKEN is incorrect");
        console.log("Check your .env file and verify the token from Mixpanel project settings");
      }
    }

  } catch (error) {
    console.error("\n❌ Network Error:", error.message);
  }
}

// Run the test
testProfileUpload();