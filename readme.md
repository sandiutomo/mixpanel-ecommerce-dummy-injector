# 🇮🇩 Indonesian Mixpanel Data Generator

Generate realistic Indonesian e-commerce user data with complete OS tracking, device information, and user journeys for Mixpanel analytics.

---

## 📋 Table of Contents

1. [Features](#-features)
2. [Quick Start](#-quick-start)
3. [Installation](#-installation)
4. [Configuration](#️-configuration)
5. [Generate Data](#-generate-data)
6. [Upload to Mixpanel](#-upload-to-mixpanel)
7. [Verify in Mixpanel](#-verify-in-mixpanel)
8. [Customization](#️-customization)
9. [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### ✅ Indonesian Market Data
- **40 Indonesian names** (20 male, 20 female first names + 20 last names)
- **Indonesian emails** (budi.santoso@gmail.com format)
- **11 Indonesian cities** with proper regions (Jakarta, Bandung, Surabaya, etc.)
- **Realistic pricing** (5k-95k IDR per item)

### ✅ Complete OS & Device Tracking
- **$os** property on all users and events
- **Android-specific**: $android_brand, $android_os_version, $android_os
- **iOS-specific**: $ios_version, $ios_device_model
- **Web-specific**: $browser
- **Device IDs**: Realistic format per platform (Android hex, iOS UUID, Web fingerprint)

### ✅ E-commerce User Journeys
- **14 event types** across app lifecycle, features, and shopping
- **Realistic conversion rates** (60% shopping, 20% browsing, 20% features)
- **Complete funnel tracking** (Search → View → Cart → Checkout → Order → Review)
- **Guaranteed connection** - Every user has at least 1 event

### ✅ Mixpanel-Ready
- **All special properties** use $ prefix ($name, $email, $device_id, $created, etc.)
- **OS & country aligned** between users and events
- **CSV format** compatible with mixpanel-import tool
- **250 users**, **20,000 events**, **20 products**

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Generate CSV files
node index.js

# 3. Install mixpanel-import
npm install -g mixpanel-import

# 4. Upload to Mixpanel
mixpanel-import --file output/events.csv --token YOUR_TOKEN
mixpanel-import --file output/users.csv --token YOUR_TOKEN --profile
```

---

## 📦 Installation

### Prerequisites

- **Node.js** v16+ or v18+ (LTS recommended)
- **npm** v7+ or higher
- **Mixpanel account** with project token

### Step 1: Install Node.js (if needed)

**Check if Node.js is installed:**
```bash
node -v
# Should show: v18.x.x or v20.x.x
```

**If not installed:**
- **macOS**: `brew install node` or download from [nodejs.org](https://nodejs.org/)
- **Windows**: Download installer from [nodejs.org](https://nodejs.org/)
- **Linux**: `sudo apt install nodejs npm` or use [nvm](https://github.com/nvm-sh/nvm)

### Step 2: Install Project Dependencies

```bash
# Navigate to project folder
cd path/to/your/project

# Install required packages
npm install
```

**This installs:**
- `faker@5.5.3` - Generate fake data
- `uuid@9.0.0` - Generate unique IDs
- `node-fetch@2.6.12` - HTTP requests
- `dotenv@16.3.1` - Environment variables

---

## ⚙️ Configuration

### Step 1: Get Your Mixpanel Token

1. Log in to [Mixpanel](https://mixpanel.com/)
2. Select your project
3. Click **Settings** (gear icon) → **Project Settings**
4. Copy the **"Token"** field (NOT "API Secret")

**Example token:**
```
3d146e34c4b2b643e03b9b5ebf848b07
```

### Step 2: Adjust Configuration (Optional)

Edit `index.js` to customize:

```javascript
const USERS_COUNT = 250;        // Number of users (default: 250)
const PRODUCTS_COUNT = 20;      // Number of products (default: 20)
const EVENTS_TARGET = 20000;    // Number of events (default: 20,000)
const HISTORY_DAYS = 90;        // Historical data range in days (default: 90)
```

---

## 📊 Generate Data

### Generate CSV Files

```bash
node index.js
```

**Expected Output:**
```
🛠️  Generating data...

✅ Generated 250 users and 20 products
🚀 Simulating realistic user journeys...
✅ Ensuring all users have at least one event...
✅ Generated 20412 events (target: 20000)
✅ All 250 users have events

✅ CSV files saved to output/
   - users.csv: 250 users
   - events.csv: 20000 events

📊 Event Distribution:
   - Product Viewed: 5124 (25.6%)
   - App Opened: 3421 (17.1%)
   - Session Start: 3421 (17.1%)
   - Session End: 3421 (17.1%)
   - Search Performed: 3012 (15.1%)
   - Screen Viewed: 1456 (7.3%)
   - Added to Cart: 1023 (5.1%)
   ... (14 event types total)
```

### Check Generated Files

```bash
# List output files
ls -lh output/

# Preview users.csv
head output/users.csv

# Preview events.csv
head output/events.csv

# Count records
wc -l output/users.csv    # Should show 251 (250 users + 1 header)
wc -l output/events.csv   # Should show 20001 (20000 events + 1 header)
```

---

## 🚀 Upload to Mixpanel

### Using mixpanel-import (Recommended)

**Why use mixpanel-import?**
- ✅ Official Mixpanel community tool
- ✅ Handles large datasets efficiently
- ✅ Better error handling and retries
- ✅ Progress indicators
- ✅ Works with CSV, JSON, and other formats

#### Step 1: Install mixpanel-import

```bash
# Install globally (recommended)
npm install -g mixpanel-import

# Verify installation
mixpanel-import --version
```

**If you get permission errors:**

**Mac/Linux:**
```bash
sudo npm install -g mixpanel-import
```

**Windows:**
- Run Command Prompt or PowerShell as Administrator
- Then run: `npm install -g mixpanel-import`

**Alternative (without global install):**
```bash
# Use npx to run without installing
npx mixpanel-import --file output/events.csv --token YOUR_TOKEN
```

#### Step 2: Upload Events

```bash
mixpanel-import \
  --file output/events.csv \
  --token YOUR_MIXPANEL_TOKEN \
  --type event
```

**⚠️ Replace `YOUR_MIXPANEL_TOKEN`** with your actual token from Mixpanel.

**Example with real token:**
```bash
mixpanel-import \
  --file output/events.csv \
  --token 3d146e34c4b2b643e03b9b5ebf848b07 \
  --type event
```

**Expected Output:**
```
reading file: output/events.csv
parsing CSV...
found 20000 events
validating data...
uploading to Mixpanel...
████████████████████████████████████████ 100% | 20000/20000 events
✅ SUCCESS! 20000 events imported
time elapsed: 45s
```

**Common Options:**
```bash
# Show verbose output (helpful for debugging)
mixpanel-import --file output/events.csv --token YOUR_TOKEN --verbose

# Custom batch size (default: 2000, smaller = slower but safer)
mixpanel-import --file output/events.csv --token YOUR_TOKEN --batch-size 1000

# Dry run (validate data without uploading)
mixpanel-import --file output/events.csv --token YOUR_TOKEN --dry-run

# Strict mode (fail on any error)
mixpanel-import --file output/events.csv --token YOUR_TOKEN --strict
```

#### Step 3: Upload User Profiles

```bash
mixpanel-import \
  --file output/users.csv \
  --token YOUR_MIXPANEL_TOKEN \
  --type profile
```

**Or use the shorthand `--profile` flag:**
```bash
mixpanel-import \
  --file output/users.csv \
  --token YOUR_MIXPANEL_TOKEN \
  --profile
```

**Expected Output:**
```
reading file: output/users.csv
parsing CSV...
found 250 profiles
validating data...
uploading to Mixpanel...
████████████████████████████████████████ 100% | 250/250 profiles
✅ SUCCESS! 250 profiles imported
time elapsed: 8s
```

#### Step 4: Verify Upload Success

```bash
# Check for errors (if any errors occurred, they'll be in this file)
cat mixpanel-import-errors.json

# If file doesn't exist or is empty, upload was successful!
```

---

### Complete Upload Example (Copy & Paste)

**Replace `YOUR_TOKEN_HERE` with your actual Mixpanel token:**

```bash
# Step 1: Generate data
node index.js

# Step 2: Upload events
mixpanel-import --file output/events.csv --token YOUR_TOKEN_HERE --type event

# Step 3: Upload user profiles
mixpanel-import --file output/users.csv --token YOUR_TOKEN_HERE --profile

# Step 4: Done! Check Mixpanel.
echo "✅ Upload complete! Check your Mixpanel project."
```

---

## 🔍 Verify in Mixpanel

### Step 1: Check User Profiles

1. Go to [Mixpanel](https://mixpanel.com/)
2. Select your project
3. Navigate to: **Users** (left sidebar)
4. You should see **"250 Users"**

### Step 2: View a User Profile

1. Click on any user in the list
2. Verify all properties are visible:

**Expected Properties:**
```
✅ $name: "Budi Santoso"
✅ $email: "budi.santoso@gmail.com"
✅ $avatar: https://i.pravatar.cc/...
✅ $device_id: "a1b2c3d4e5f67890"
✅ $device: "android"
✅ $os: "Android"
✅ $android_brand: "Samsung"
✅ $android_os_version: "14"
✅ $created: "2024-05-15T10:30:00.000Z"
✅ $city: "Jakarta"
✅ $region: "DKI Jakarta"
✅ country: "Indonesia"
✅ total_spend_IDR: 150000
✅ total_orders: 3
```

**If you see these properties, user profiles are working correctly! ✅**

### Step 3: Check Events

1. Navigate to: **Reports** → **Insights** (or **Segmentation**)
2. Click on the event dropdown
3. You should see 14+ event types:
   - App Opened
   - Session Start
   - Session End
   - Screen Viewed
   - Feature Used
   - Search Performed
   - Product Viewed
   - Product Added to Wishlist
   - Product Shared
   - Added to Cart
   - Checkout Started
   - Payment Failed
   - Order Completed
   - Review Submitted

### Step 4: Verify Event Properties

1. Select event: **"Product Viewed"**
2. Click **Breakdown** → **Add Breakdown**
3. Search for and verify these properties exist:

**Expected Properties:**
```
✅ distinct_id
✅ $device_id
✅ $device: "android", "ios", "web"
✅ $os: "Android", "iOS", "Windows", "macOS"
✅ $city: "Jakarta", "Bandung", "Surabaya"...
✅ $region: "DKI Jakarta", "West Java"...
✅ country: "Indonesia"
✅ product_name
✅ price (should be 5000-95000)
```

### Step 5: Verify User-Event Connection

1. Go to **Users**
2. Click on a user (example: "Budi Santoso")
3. Scroll down to **"Activity Feed"** or **"Events"** section
4. You should see all events for that user ✅

**If events show up for the user, connection is working! ✅**

### Step 6: Create a Sample Funnel

1. Go to **Reports** → **Funnels**
2. Click **"Create Funnel"**
3. Add these steps:
   - **Step 1:** Search Performed
   - **Step 2:** Product Viewed
   - **Step 3:** Added to Cart
   - **Step 4:** Checkout Started
   - **Step 5:** Order Completed
4. Click **Apply**

**Expected Results:**
- **Overall conversion rate:** ~10-15%
- **Step 1 → 2:** ~95% (most searches lead to views)
- **Step 2 → 3:** ~60% (60% of viewers add to cart)
- **Step 3 → 4:** ~70% (70% of carts proceed to checkout)
- **Step 4 → 5:** ~85% (85% of checkouts complete)

**If you see similar numbers, your funnel is working! ✅**

---

## ⚙️ Customization

### Change Number of Users/Events

Edit `index.js` (lines 12-15):

```javascript
const USERS_COUNT = 500;        // Change to 500 users
const EVENTS_TARGET = 50000;    // Change to 50,000 events
const PRODUCTS_COUNT = 50;      // Change to 50 products
const HISTORY_DAYS = 180;       // Change to 180 days history
```

Then regenerate:
```bash
node index.js
```

### Add Custom Indonesian Names

Edit `utils.js` (lines 8-16):

```javascript
const indonesianFirstNames = {
  male: ["Budi", "Agus", "Andi", "Your", "Custom", "Names"],
  female: ["Siti", "Dewi", "Ani", "Your", "Custom", "Names"]
};

const indonesianLastNames = [
  "Santoso", "Wijaya", "Saputra", "Your", "Custom", "Names"
];
```

### Adjust Product Pricing

Edit `utils.js` (lines 90-100):

```javascript
const categories = [
  {name: "Electronics", priceRange: [20000, 100000]},  // Change min/max
  {name: "Fashion", priceRange: [30000, 120000]},
  {name: "Beauty", priceRange: [15000, 80000]},
  // Add more categories...
];
```

### Add More Cities

Edit `utils.js` (lines 6-17):

```javascript
const indonesianCities = [
  {city: "Jakarta", region: "DKI Jakarta", province: "DKI Jakarta"},
  {city: "Bandung", region: "West Java", province: "Jawa Barat"},
  // Add your cities:
  {city: "Bali", region: "Bali", province: "Bali"},
  {city: "Malang", region: "East Java", province: "Jawa Timur"},
];
```

### Add Custom Events

Edit `index.js` in the `simulateUserJourney()` function (around line 70):

```javascript
// Add your custom event
currentTime += faker.datatype.number({min: 10, max: 30});
events.push(generateEvent(user, null, "Custom Event Name", currentTime, {
  session_id: sessionId,
  custom_property_1: "value1",
  custom_property_2: faker.datatype.number({min: 1, max: 100})
}));
```

---

## 🐛 Troubleshooting

### Issue: "mixpanel-import: command not found"

**Cause:** mixpanel-import not installed globally

**Solutions:**

**Option 1: Install globally**
```bash
npm install -g mixpanel-import

# Mac/Linux: If permission denied, use sudo
sudo npm install -g mixpanel-import

# Windows: Run as Administrator
```

**Option 2: Use npx (no install needed)**
```bash
npx mixpanel-import --file output/events.csv --token YOUR_TOKEN
```

**Option 3: Install locally in project**
```bash
npm install mixpanel-import
./node_modules/.bin/mixpanel-import --file output/events.csv --token YOUR_TOKEN
```

---

### Issue: "0 Users with Profiles" in Mixpanel

**Cause:** Profiles not uploaded or uploaded incorrectly

**Check:**

1. **Did you use the `--profile` flag?**
   ```bash
   # Correct ✅
   mixpanel-import --file output/users.csv --token YOUR_TOKEN --profile
   
   # Wrong ❌ (this uploads as events, not profiles)
   mixpanel-import --file output/users.csv --token YOUR_TOKEN
   ```

2. **Wait 5-10 minutes** - Mixpanel takes time to process profiles

3. **Check upload success:**
   ```bash
   # Re-run with verbose flag
   mixpanel-import --file output/users.csv --token YOUR_TOKEN --profile --verbose
   ```

4. **Verify CSV format:**
   ```bash
   head output/users.csv
   # Should have: distinct_id, $name, $email, etc.
   ```

---

### Issue: Events not linking to users

**Cause:** Mismatched distinct_id between events and users

**Check:**

1. **Verify same token used:**
   ```bash
   # Both should use same token
   mixpanel-import --file output/events.csv --token SAME_TOKEN
   mixpanel-import --file output/users.csv --token SAME_TOKEN --profile
   ```

2. **Check distinct_id matches:**
   ```bash
   # Get a distinct_id from users
   head -2 output/users.csv | tail -1 | cut -d',' -f1
   
   # Check if it exists in events (replace DISTINCT_ID with actual value)
   grep "DISTINCT_ID" output/events.csv | head -3
   ```

3. **Regenerate fresh data:**
   ```bash
   node index.js
   # Then re-upload both files
   ```

---

### Issue: "Timestamps in the future" error

**Cause:** System clock incorrect or code issue

**Fix:**

1. **Check system time:**
   ```bash
   date
   # Should show current date/time
   ```

2. **Regenerate data** (code has 600s safety buffer):
   ```bash
   node index.js
   ```

3. **If still happening**, check `utils.js` line 30-35:
   ```javascript
   function randomPastTimestamp(days) {
     const now = Math.floor(Date.now() / 1000);
     const secondsInHistory = days * 24 * 60 * 60;
     return now - Math.floor(Math.random() * secondsInHistory) - 600; // ← Should have -600
   }
   ```

---

### Issue: Upload is very slow

**Causes:** Large files, slow network, API rate limiting

**Solutions:**

```bash
# 1. Use smaller batch size (default: 2000)
mixpanel-import --file output/events.csv --token YOUR_TOKEN --batch-size 500

# 2. Generate fewer events
# Edit index.js: const EVENTS_TARGET = 5000;

# 3. Check network connection
ping api.mixpanel.com

# 4. Use verbose mode to see what's happening
mixpanel-import --file output/events.csv --token YOUR_TOKEN --verbose
```

---

### Issue: Node.js version too old

**Error:** `npm does not support Node.js v15.14.0`

**Fix - Update Node.js:**

**macOS (Homebrew):**
```bash
brew update
brew upgrade node
node -v  # Should show v20.x.x or v18.x.x
```

**macOS (Installer):**
1. Download from [nodejs.org](https://nodejs.org/)
2. Install LTS version
3. Restart terminal
4. Verify: `node -v`

**Windows:**
1. Download from [nodejs.org](https://nodejs.org/)
2. Run installer (choose LTS version)
3. Restart Command Prompt
4. Verify: `node -v`

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

---

### Issue: Permission errors during npm install

**Error:** `EACCES: permission denied`

**Fix:**

**Option 1: Use sudo (Mac/Linux)**
```bash
sudo npm install -g mixpanel-import
```

**Option 2: Fix npm permissions (Recommended)**
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g mixpanel-import
```

**Option 3: Use npx (No install needed)**
```bash
npx mixpanel-import --file output/events.csv --token YOUR_TOKEN
```

---

### Issue: CSV encoding errors

**Error:** Invalid characters or encoding issues

**Fix:**

1. **Check CSV encoding:**
   ```bash
   file output/users.csv
   # Should show: ASCII or UTF-8
   ```

2. **Regenerate data:**
   ```bash
   rm -rf output/
   node index.js
   ```

3. **If still having issues**, specify encoding:
   ```bash
   mixpanel-import --file output/events.csv --token YOUR_TOKEN --encoding utf8
   ```

---

## 📖 Additional Documentation

- **README.md** (this file) - Complete guide
- **COMPLETE_CHANGES.md** - Overview of all features
- **INDONESIAN_NAMES_UPDATE.md** - Indonesian names details
- **COUNTRY_OS_UPDATE.md** - Country & OS tracking details
- **QUICK_START.md** - Quick reference guide

---

## 📊 Data Structure Reference

### User Profile Structure

```csv
distinct_id,$device_id,$name,$email,$os,$android_brand,$device,country,...
"uuid-123","a1b2c3d4","Budi Santoso","budi.santoso@gmail.com","Android","Samsung","android","Indonesia",...
```

**Key Properties:**
- `distinct_id` - Unique user identifier (UUID)
- `$name` - Full name (Mixpanel special property)
- `$email` - Email address (Mixpanel special property)
- `$device_id` - Unique device identifier
- `$device` - Device type (android/ios/web)
- `$os` - Operating system
- `$created` - Account creation date
- `country` - "Indonesia"

### Event Structure

```csv
event,distinct_id,$device_id,$device,$os,country,$time,...
"Product Viewed","uuid-123","a1b2c3d4","android","Android","Indonesia",1704067200,...
```

**Key Properties:**
- `event` - Event name
- `distinct_id` - Links to user (same as user's distinct_id)
- `$time` - Unix timestamp (seconds since epoch)
- `$device_id` - Device identifier (matches user's)
- `$os` - Operating system (matches user's)
- `country` - "Indonesia"

---

## 🎯 Event Types Generated (14 Total)

**App Lifecycle (3):**
1. App Opened
2. Session Start
3. Session End

**Browsing & Features (4):**
4. Screen Viewed
5. Feature Used
6. Profile Updated
7. Notification Settings Changed

**Shopping Funnel (7):**
8. Search Performed
9. Product Viewed
10. Product Added to Wishlist
11. Product Shared
12. Added to Cart
13. Checkout Started
14. Payment Failed

**Plus (in shopping journeys):**
15. Order Completed
16. Review Submitted

---

## ✅ Complete Verification Checklist

After upload, verify in Mixpanel:

**Users:**
- [ ] 250 users visible in Users tab
- [ ] User profiles show $name, $email, $avatar
- [ ] User profiles show $os, $device, $device_id
- [ ] Android users have $android_brand, $android_os_version
- [ ] iOS users have $ios_version, $ios_device_model
- [ ] Web users have $browser
- [ ] User profiles show country: "Indonesia"
- [ ] User profiles show total_spend_IDR, total_orders

**Events:**
- [ ] ~20,000 events visible
- [ ] All 14+ event types present
- [ ] Events have $os property
- [ ] Events have country property
- [ ] Events have $device_id and $device
- [ ] Product prices are 5k-95k IDR
- [ ] All timestamps in past 90 days (no future dates)

**Connections:**
- [ ] Events link to correct users (same distinct_id)
- [ ] User activity feed shows their events
- [ ] Funnel shows reasonable conversion (~10-15%)

**Names & Emails:**
- [ ] Indonesian names visible (Budi, Dewi, Ahmad, Siti, etc.)
- [ ] Indonesian emails (firstname.lastname@domain format)

---

## 🚀 Next Steps After Upload

### 1. Create User Cohorts

**High Value Customers:**
- Filter: `total_spend_IDR > 500000`
- Name: "High Value Customers"

**Android Users:**
- Filter: `$os = "Android"`
- Name: "Android Users"

**Jakarta Users:**
- Filter: `$city = "Jakarta"`
- Name: "Jakarta Users"

### 2. Build Key Funnels

**Purchase Funnel:**
1. Search Performed
2. Product Viewed
3. Added to Cart
4. Checkout Started
5. Order Completed

**Engagement Funnel:**
1. App Opened
2. Screen Viewed
3. Feature Used

### 3. Create Dashboards

**Revenue Dashboard:**
- Total revenue (sum of order_total)
- Revenue by city
- Revenue by device type ($os)
- Top products by revenue

**User Engagement:**
- Daily active users
- Session duration (use Session Start → Session End)
- Events per user
- Retention curves

### 4. Analyze by Segments

**Compare Android vs iOS:**
- Conversion rates
- Average order value
- Session duration
- Popular products

**Analyze by City:**
- Jakarta vs Bandung vs Surabaya
- Regional preferences
- Price sensitivity

---

## 🤝 Support & Resources

**Mixpanel Import Tool:**
- GitHub: https://github.com/ak--47/mixpanel-import
- Documentation: https://github.com/ak--47/mixpanel-import#readme
- Issues: https://github.com/ak--47/mixpanel-import/issues

**Mixpanel Documentation:**
- Getting Started: https://docs.mixpanel.com/docs/getting-started/overview
- Import Data: https://docs.mixpanel.com/docs/tracking/how-tos/import-data
- API Reference: https://developer.mixpanel.com/reference/overview

**Mixpanel Support:**
- Help Center: https://help.mixpanel.com/
- Contact: https://mixpanel.com/contact-us
- Community: https://community.mixpanel.com/

---

## 📝 License

MIT License - Free to use for testing and demos

---

## 🎉 Summary

**What You Get:**
- ✅ 250 Indonesian users with complete profiles
- ✅ 20,000 realistic e-commerce events
- ✅ Complete OS and device tracking
- ✅ Proper Mixpanel special properties
- ✅ User-event connection guaranteed
- ✅ CSV files ready for mixpanel-import

**Setup Time:** ~5 minutes
**Upload Time:** ~2 minutes
**Total Time:** ~7 minutes

**Start analyzing Indonesian e-commerce data in Mixpanel!** 🇮🇩 📊 🚀