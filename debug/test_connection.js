require("dotenv").config();
const fetch = require("node-fetch");

const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN;

/**
 * DEBUG SCRIPT: Test Mixpanel Connection
 * 
 * This script tests both event and profile uploads to verify your setup.
 * Run this before uploading full dataset.
 * 
 * Usage: node test_connection.js
 */

async function testProfileUpload() {
  if (!MIXPANEL_TOKEN) {
    console.error("❌ ERROR: MIXPANEL_TOKEN not found in .env file");
    console.log("\nCreate a .env file with:");
    console.log("MIXPANEL_TOKEN=your_actual_token_here");
    return false;
  }

  console.log("🧪 Testing User Profile Upload...\n");

  const testDistinctId = `test_user_${Date.now()}`;
  
  const testProfile = {
    $token: MIXPANEL_TOKEN,
    $distinct_id: testDistinctId,
    $set: {
      $name: "Test User",
      $email: "test@example.com",
      $avatar: `https://i.pravatar.cc/150?u=${testDistinctId}`,
      $city: "Jakarta",
      $region: "DKI Jakarta",
      first_name: "Test",
      last_name: "User",
      gender: "Male",
      country: "Indonesia",
      Total_Spend_IDR: 150000,
      Total_Orders: 3
    }
  };

  console.log("📤 Sending profile:");
  console.log(`   distinct_id: ${testDistinctId}`);
  console.log(`   name: Test User`);
  console.log(`   email: test@example.com`);

  try {
    const dataParam = Buffer.from(JSON.stringify([testProfile])).toString('base64');
    const url = `https://api.mixpanel.com/engage?data=${dataParam}&verbose=1`;

    const response = await fetch(url, { 
      method: "POST",
      headers: { "Accept": "text/plain" }
    });

    const responseText = await response.text();
    
    try {
      const result = JSON.parse(responseText);
      
      if (result.status === 1) {
        console.log("✅ SUCCESS! Profile uploaded to Mixpanel\n");
        console.log("🔍 Verify in Mixpanel:");
        console.log(`   1. Go to: Users → View Users`);
        console.log(`   2. Search for: ${testDistinctId}`);
        console.log(`   3. Click user to see ALL properties\n`);
        return true;
      } else {
        console.log("❌ FAILED!");
        console.log(`   Error: ${result.error || 'Unknown error'}\n`);
        return false;
      }
    } catch {
      const success = responseText.trim() === "1";
      if (success) {
        console.log("✅ SUCCESS! Profile uploaded\n");
        return true;
      } else {
        console.log(`❌ FAILED! Response: ${responseText}\n`);
        return false;
      }
    }
  } catch (error) {
    console.error(`❌ Network Error: ${error.message}\n`);
    return false;
  }
}

async function testEventUpload() {
  console.log("🧪 Testing Event Upload...\n");

  const testDistinctId = `test_user_${Date.now()}`;
  
  const testEvent = {
    event: "Product Viewed",
    properties: {
      distinct_id: testDistinctId,  // ✅ Same ID as profile
      token: MIXPANEL_TOKEN,
      time: Math.floor(Date.now() / 1000) - 600,
      $insert_id: `test_${Date.now()}`,
      device: "web",
      $city: "Jakarta",
      mp_country_code: "ID",
      product_name: "Test Product",
      category: "Electronics",
      price: 100000
    }
  };

  console.log("📤 Sending event:");
  console.log(`   event: Product Viewed`);
  console.log(`   distinct_id: ${testDistinctId}`);

  try {
    const dataParam = Buffer.from(JSON.stringify([testEvent])).toString('base64');
    const url = `https://api.mixpanel.com/track?data=${dataParam}&verbose=1`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Accept": "text/plain" }
    });

    const responseText = await response.text();
    
    try {
      const result = JSON.parse(responseText);
      
      if (result.status === 1) {
        console.log("✅ SUCCESS! Event uploaded to Mixpanel\n");
        return true;
      } else {
        console.log("❌ FAILED!");
        console.log(`   Error: ${result.error || 'Unknown error'}\n`);
        return false;
      }
    } catch {
      const success = responseText.trim() === "1";
      if (success) {
        console.log("✅ SUCCESS! Event uploaded\n");
        return true;
      } else {
        console.log(`❌ FAILED! Response: ${responseText}\n`);
        return false;
      }
    }
  } catch (error) {
    console.error(`❌ Network Error: ${error.message}\n`);
    return false;
  }
}

// Run both tests
(async () => {
  console.log("=" . repeat(60));
  console.log("  MIXPANEL CONNECTION TEST");
  console.log("=".repeat(60) + "\n");
  
  const profileSuccess = await testProfileUpload();
  const eventSuccess = await testEventUpload();
  
  console.log("=".repeat(60));
  console.log("  RESULTS");
  console.log("=".repeat(60));
  console.log(`Profile Upload: ${profileSuccess ? "✅ PASS" : "❌ FAIL"}`);
  console.log(`Event Upload:   ${eventSuccess ? "✅ PASS" : "❌ FAIL"}`);
  console.log("=".repeat(60) + "\n");
  
  if (profileSuccess && eventSuccess) {
    console.log("🎉 All tests passed! You're ready to upload full dataset.");
    console.log("   Run: node index.js --send\n");
  } else {
    console.log("⚠️  Some tests failed. Please check:");
    console.log("   1. MIXPANEL_TOKEN is correct in .env file");
    console.log("   2. Token is from: Mixpanel → Settings → Project Settings → Token");
    console.log("   3. Not using API Secret (different from Token)\n");
  }
})();