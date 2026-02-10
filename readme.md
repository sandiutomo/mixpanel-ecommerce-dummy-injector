![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Node](https://img.shields.io/badge/Node.js-v16+-green.svg)
[![Mixpanel](https://img.shields.io/badge/Mixpanel-7856FF?style=flat&logo=mixpanel&logoColor=white)](https://mixpanel.com/)

# 🇮🇩 Indonesian Mixpanel Data Generator

Generate realistic Indonesian e-commerce user data with complete OS tracking, device information, and user journeys for Mixpanel analytics testing and demos.

---

## 📑 Table of Contents
1. [Features](#-features)
2. [Data Generated](#-data-generated)
3. [Prerequisites](#-prerequisites)
4. [Installation](#-installation)
5. [Quick Start](#-quick-start)
6. [Configuration](#️-configuration)
7. [Generate Data](#-generate-data)
8. [Upload to Mixpanel](#-upload-to-mixpanel)
9. [Verify in Mixpanel](#-verify-in-mixpanel)
10. [Customization](#️-customization)
11. [Troubleshooting](#-troubleshooting)
12. [License](#-license)
13. [Author](#-author)

---

## ✨ Features

### Indonesian Market Authenticity
- **40 Indonesian Names** - 20 male, 20 female first names + 20 last names
- **Realistic Emails** - Indonesian format (budi.santoso@gmail.com)
- **11 Indonesian Cities** - Jakarta, Bandung, Surabaya, Semarang, Yogyakarta, etc.
- **Proper Regions** - DKI Jakarta, West Java, East Java with province mapping
- **IDR Pricing** - Realistic pricing (5,000 - 95,000 IDR per item)

### Complete OS & Device Tracking
- **Universal `$os` Property** - On all users and events
- **Android-Specific Tracking**
  - `$android_brand` (Samsung, Xiaomi, Oppo, Vivo, Realme)
  - `$android_os_version` (11, 12, 13, 14)
  - `$android_os` (true)
- **iOS-Specific Tracking**
  - `$ios_version` (15.0 - 17.2)
  - `$ios_device_model` (iPhone 12, 13, 14, 15 Pro)
- **Web-Specific Tracking**
  - `$browser` (Chrome, Safari, Firefox, Edge)
- **Realistic Device IDs**
  - Android: 16-char hex (e.g., `a1b2c3d4e5f67890`)
  - iOS: UUID format (e.g., `12345678-1234-5678-1234-567812345678`)
  - Web: Browser fingerprint (e.g., `fp_a1b2c3d4e5f67890`)

### E-commerce User Journeys
- **14 Core Event Types** - App lifecycle, features, shopping funnel
- **Realistic Conversion Rates**
  - 60% shopping journeys (purchase-focused)
  - 20% browsing journeys (research-focused)
  - 20% feature exploration (engagement-focused)
- **Complete Shopping Funnel**
  - Search → View → Cart → Checkout → Order → Review
- **Guaranteed Connection** - Every user has at least 1 event

### Mixpanel-Ready Output
- **Special Properties** - All use `$` prefix ($name, $email, $device_id, $created)
- **OS & Country Alignment** - Consistent between users and events
- **CSV Format** - Compatible with mixpanel-import tool
- **Scalable** - Default: 250 users, 20,000 events, 20 products

---

## 📊 Data Generated

### Output Files

After running the generator, you'll get two CSV files in the `output/` directory:

**1. users.csv** (250 users)
```csv
distinct_id,$device_id,$name,$email,$os,$android_brand,$device,country,$city,$region,...
"uuid-abc123","a1b2c3d4e5f67890","Budi Santoso","budi.santoso@gmail.com","Android","Samsung","android","Indonesia","Jakarta","DKI Jakarta",...
```

**2. events.csv** (20,000 events)
```csv
event,distinct_id,$device_id,$device,$os,country,$time,$city,$region,product_name,price,...
"Product Viewed","uuid-abc123","a1b2c3d4e5f67890","android","Android","Indonesia",1704067200,"Jakarta","DKI Jakarta","Wireless Mouse",45000,...
```

### User Profile Properties

Each user has the following properties:

**Identity Properties:**
- `distinct_id` - Unique user identifier (UUID v4)
- `$name` - Full Indonesian name (e.g., "Budi Santoso")
- `$email` - Indonesian email (firstname.lastname@domain.com)
- `$avatar` - Random avatar URL from pravatar.cc

**Device Properties:**
- `$device_id` - Unique device identifier (format varies by OS)
- `$device` - Device type (android, ios, web)
- `$os` - Operating system name

**Android Users Only:**
- `$android_brand` - Device manufacturer
- `$android_os_version` - OS version (11-14)
- `$android_os` - true

**iOS Users Only:**
- `$ios_version` - iOS version (15.0-17.2)
- `$ios_device_model` - Device model (iPhone 12/13/14/15 Pro)

**Web Users Only:**
- `$browser` - Browser name (Chrome, Safari, Firefox, Edge)

**Geographic Properties:**
- `country` - Always "Indonesia"
- `$city` - Indonesian city (Jakarta, Bandung, Surabaya, etc.)
- `$region` - Province/region (DKI Jakarta, West Java, etc.)

**E-commerce Properties:**
- `$created` - Account creation timestamp (ISO 8601)
- `total_spend_IDR` - Total lifetime spend in IDR
- `total_orders` - Total number of orders

### Event Types (14 Total)

**App Lifecycle Events:**
1. **App Opened** - User launches the app
2. **Session Start** - Session begins
3. **Session End** - Session ends with duration

**Browsing & Features:**
4. **Screen Viewed** - User views a screen (Home, Profile, Settings, etc.)
5. **Feature Used** - User engages with a feature (Chat, Share, Filter, etc.)
6. **Profile Updated** - User edits their profile
7. **Notification Settings Changed** - User modifies notification preferences

**Shopping Funnel:**
8. **Search Performed** - User searches for products
9. **Product Viewed** - User views a product
10. **Product Added to Wishlist** - User saves product for later
11. **Product Shared** - User shares a product
12. **Added to Cart** - User adds product to shopping cart
13. **Checkout Started** - User begins checkout process
14. **Payment Failed** - Payment attempt fails

**Conversion Events (in shopping journeys):**
15. **Order Completed** - Successful purchase
16. **Review Submitted** - Post-purchase review

### Event Properties

All events include:
- `distinct_id` - Links to user
- `$time` - Unix timestamp (seconds since epoch)
- `$device_id` - Device identifier
- `$device` - Device type
- `$os` - Operating system
- `country` - "Indonesia"
- `$city` - User's city
- `$region` - User's region

**Shopping events additionally include:**
- `product_name` - Product name
- `product_category` - Product category (Electronics, Fashion, Beauty, etc.)
- `price` - Product price in IDR (5,000 - 95,000)
- `session_id` - Session identifier

**Order Completed events include:**
- `order_total` - Total order value
- `order_id` - Unique order identifier
- `payment_method` - Payment method used

---

## 📋 Prerequisites

### Required Software

**Node.js v16+ or v18+ (LTS recommended)**

**Check if installed:**
```bash
node -v
# Should show: v18.x.x or v20.x.x

npm -v
# Should show: 9.x.x or 10.x.x
```

**If not installed:**

**macOS:**
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

**Windows:**
- Download installer from [nodejs.org](https://nodejs.org/)
- Run installer (choose LTS version)
- Restart terminal

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Required Accounts

**Mixpanel Account**
- Sign up at: https://mixpanel.com
- Free tier available (up to 20M events/month)
- You'll need your **Project Token** (found in Settings → Project Settings)

---

## 📦 Installation

### Step 1: Clone or Download Project

```bash
# Navigate to your projects folder
cd ~/projects

# Clone the repository (or download and extract ZIP)
git clone <repository-url>
cd indonesian-mixpanel-data-generator
```

### Step 2: Install Dependencies

```bash
# Install all required npm packages
npm install
```

**This installs:**
- `faker@5.5.3` - Generate realistic fake data
- `uuid@9.0.0` - Generate unique identifiers
- `node-fetch@2.6.12` - HTTP requests (if needed)
- `dotenv@16.3.1` - Environment variable management

**Expected output:**
```
added 8 packages, and audited 9 packages in 2s
found 0 vulnerabilities
```

### Step 3: Verify Installation

```bash
# Check if dependencies installed correctly
ls node_modules/
# Should show: faker, uuid, node-fetch, dotenv, etc.

# Test Node.js
node -v
# Should show: v18.x.x or higher
```

---

## 🚀 Quick Start

Complete workflow from generation to verification:

### Step 1: Generate Data

```bash
node index.js
```

**Expected output:**
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
   ...
```

### Step 2: Install Mixpanel Import Tool

```bash
# Install globally (recommended)
npm install -g mixpanel-import

# Verify installation
mixpanel-import --version
```

**If you get permission errors:**

**macOS/Linux:**
```bash
sudo npm install -g mixpanel-import
```

**Windows:**
- Run Command Prompt as Administrator
- Then: `npm install -g mixpanel-import`

**Alternative (no global install):**
```bash
# Use npx to run without installing
npx mixpanel-import --version
```

### Step 3: Get Your Mixpanel Token

1. Log in to [Mixpanel](https://mixpanel.com/)
2. Select your project
3. Click **Settings** (gear icon) → **Project Settings**
4. Copy the **"Token"** field (NOT "API Secret")

**Example token:**
```
3d146e34c4b2b643e03b9b5ebf848b07
```

### Step 4: Upload Events

```bash
mixpanel-import \
  --file output/events.csv \
  --token YOUR_MIXPANEL_TOKEN \
  --type event
```

**Replace `YOUR_MIXPANEL_TOKEN`** with your actual token.

**Expected output:**
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

### Step 5: Upload User Profiles

```bash
mixpanel-import \
  --file output/users.csv \
  --token YOUR_MIXPANEL_TOKEN \
  --profile
```

**Expected output:**
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

### Step 6: Verify in Mixpanel

1. Go to [Mixpanel](https://mixpanel.com/)
2. Navigate to **Users** → You should see **250 Users**
3. Click on any user to verify properties
4. Navigate to **Reports** → **Insights** to see events

✅ **Setup complete!** You can now analyze Indonesian e-commerce data in Mixpanel.

---

## ⚙️ Configuration

### Adjust Data Volume

Edit `index.js` (lines 12-15):

```javascript
const USERS_COUNT = 250;        // Number of users to generate
const PRODUCTS_COUNT = 20;      // Number of products to generate
const EVENTS_TARGET = 20000;    // Target number of events
const HISTORY_DAYS = 90;        // Historical data range in days
```

**Examples:**

**Small dataset (testing):**
```javascript
const USERS_COUNT = 50;
const EVENTS_TARGET = 1000;
```

**Large dataset (production demo):**
```javascript
const USERS_COUNT = 1000;
const EVENTS_TARGET = 100000;
```

**Extended history:**
```javascript
const HISTORY_DAYS = 180;  // 6 months of historical data
```

### Configure Mixpanel Token (Optional)

Create a `.env` file in the project root:

```bash
# .env file
MIXPANEL_TOKEN=your_actual_mixpanel_token_here
```

Then use in upload commands:

```bash
mixpanel-import --file output/events.csv --token $MIXPANEL_TOKEN
```

---

## 📊 Generate Data

### Run the Generator

```bash
node index.js
```

### Verify Output Files

```bash
# List generated files
ls -lh output/

# Preview users.csv (first 5 rows)
head -5 output/users.csv

# Preview events.csv (first 5 rows)
head -5 output/events.csv

# Count total records
wc -l output/users.csv
# Should show: 251 (250 users + 1 header)

wc -l output/events.csv
# Should show: 20001 (20000 events + 1 header)
```

### Inspect Data Quality

**Check for Indonesian names:**
```bash
# View first 10 user names
cut -d',' -f3 output/users.csv | head -11
```

**Check device OS distribution:**
```bash
# Count by OS type
cut -d',' -f5 output/users.csv | tail -n +2 | sort | uniq -c
```

**Check event types:**
```bash
# List all event types
cut -d',' -f1 output/events.csv | tail -n +2 | sort | uniq -c
```

---

## 🚀 Upload to Mixpanel

### Method 1: Using mixpanel-import (Recommended)

**Why use mixpanel-import?**
- ✅ Official Mixpanel community tool
- ✅ Handles large datasets efficiently
- ✅ Better error handling and retries
- ✅ Progress indicators
- ✅ Batch processing

#### Upload Events

**Basic upload:**
```bash
mixpanel-import \
  --file output/events.csv \
  --token YOUR_MIXPANEL_TOKEN \
  --type event
```

**With options:**
```bash
mixpanel-import \
  --file output/events.csv \
  --token YOUR_MIXPANEL_TOKEN \
  --type event \
  --verbose \
  --batch-size 1000
```

#### Upload User Profiles

```bash
mixpanel-import \
  --file output/users.csv \
  --token YOUR_MIXPANEL_TOKEN \
  --profile
```

#### Common Options

```bash
# Show verbose output (debugging)
--verbose

# Custom batch size (default: 2000)
--batch-size 1000

# Dry run (validate without uploading)
--dry-run

# Strict mode (fail on any error)
--strict

# Specify encoding (if needed)
--encoding utf8
```

### Complete Upload Script

Create a file `upload.sh`:

```bash
#!/bin/bash

# Configuration
TOKEN="your_mixpanel_token_here"

# Generate data
echo "🛠️  Generating data..."
node index.js

# Upload events
echo "📤 Uploading events..."
mixpanel-import \
  --file output/events.csv \
  --token $TOKEN \
  --type event \
  --verbose

# Upload user profiles
echo "👥 Uploading user profiles..."
mixpanel-import \
  --file output/users.csv \
  --token $TOKEN \
  --profile \
  --verbose

echo "✅ Upload complete! Check your Mixpanel project."
```

**Make executable and run:**
```bash
chmod +x upload.sh
./upload.sh
```

---

## 🔍 Verify in Mixpanel

### Step 1: Check User Profiles

**Navigate to Users:**
1. Open Mixpanel dashboard
2. Click **Users** in left sidebar
3. You should see **"250 Users"** in the header

**View a User Profile:**
1. Click on any user in the list
2. Verify all properties are visible:

```
✅ $name: "Budi Santoso"
✅ $email: "budi.santoso@gmail.com"
✅ $avatar: https://i.pravatar.cc/150?u=...
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

### Step 2: Check Events

**Navigate to Insights:**
1. Click **Reports** → **Insights**
2. Click the event dropdown
3. Verify you see all 14+ event types:
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

### Step 3: Verify Event Properties

**Check a Product Viewed event:**
1. Select event: **"Product Viewed"**
2. Click **Breakdown** → **Add Breakdown**
3. Search for properties and verify they exist:

```
✅ distinct_id
✅ $device_id
✅ $device: "android", "ios", "web"
✅ $os: "Android", "iOS", "Windows", "macOS"
✅ $city: "Jakarta", "Bandung", "Surabaya"...
✅ $region: "DKI Jakarta", "West Java"...
✅ country: "Indonesia"
✅ product_name
✅ product_category
✅ price (values between 5000-95000)
```

### Step 4: Verify User-Event Connection

**Check user activity:**
1. Go to **Users**
2. Click on a user (e.g., "Budi Santoso")
3. Scroll down to **"Activity Feed"** or **"Events"** section
4. You should see all events for that user with timestamps

✅ **If events show up, connection is working!**

### Step 5: Create a Sample Funnel

**Test the shopping funnel:**
1. Go to **Reports** → **Funnels**
2. Click **"Create Funnel"**
3. Add these steps:
   - Step 1: Search Performed
   - Step 2: Product Viewed
   - Step 3: Added to Cart
   - Step 4: Checkout Started
   - Step 5: Order Completed
4. Click **Apply**

**Expected conversion rates:**
- Overall: ~10-15%
- Step 1 → 2: ~95% (searches lead to views)
- Step 2 → 3: ~60% (viewers add to cart)
- Step 3 → 4: ~70% (carts proceed to checkout)
- Step 4 → 5: ~85% (checkouts complete)

✅ **If you see similar numbers, funnel tracking is working!**

---

## ⚙️ Customization

### Add Custom Indonesian Names

**File:** `utils.js` (lines 8-16)

```javascript
const indonesianFirstNames = {
  male: [
    "Budi", "Agus", "Andi", "Ahmad", "Rizky",
    // Add your custom male names here
    "Hendra", "Fajar", "Yoga"
  ],
  female: [
    "Siti", "Dewi", "Ani", "Rina", "Putri",
    // Add your custom female names here
    "Maya", "Indah", "Kartika"
  ]
};

const indonesianLastNames = [
  "Santoso", "Wijaya", "Saputra", "Pratama", "Kusuma",
  // Add your custom last names here
  "Hidayat", "Nugroho", "Firmansyah"
];
```

### Add More Cities

**File:** `utils.js` (lines 18-30)

```javascript
const indonesianCities = [
  {city: "Jakarta", region: "DKI Jakarta", province: "DKI Jakarta"},
  {city: "Bandung", region: "West Java", province: "Jawa Barat"},
  {city: "Surabaya", region: "East Java", province: "Jawa Timur"},
  // Add your custom cities here
  {city: "Bali", region: "Bali", province: "Bali"},
  {city: "Malang", region: "East Java", province: "Jawa Timur"},
  {city: "Makassar", region: "South Sulawesi", province: "Sulawesi Selatan"}
];
```

### Adjust Product Pricing

**File:** `utils.js` (product generation section)

```javascript
const categories = [
  {
    name: "Electronics",
    priceRange: [20000, 100000]  // Change min/max price
  },
  {
    name: "Fashion",
    priceRange: [30000, 120000]
  },
  {
    name: "Beauty",
    priceRange: [15000, 80000]
  }
];
```

### Add Custom Events

**File:** `index.js` (in `simulateUserJourney()` function)

```javascript
// Add your custom event
currentTime += faker.datatype.number({min: 10, max: 30});
events.push(generateEvent(user, null, "Custom Event Name", currentTime, {
  session_id: sessionId,
  custom_property_1: "value1",
  custom_property_2: faker.datatype.number({min: 1, max: 100}),
  $os: user.$os,
  $device: user.$device,
  country: user.country
}));
```

### Change Device Distribution

**File:** `utils.js` (device generation section)

```javascript
function getRandomDevice() {
  const devices = [
    {type: 'android', weight: 0.60},  // 60% Android (adjust here)
    {type: 'ios', weight: 0.25},      // 25% iOS (adjust here)
    {type: 'web', weight: 0.15}       // 15% Web (adjust here)
  ];
  // ...
}
```

---

## 🐛 Troubleshooting

### Issue: "mixpanel-import: command not found"

**Cause:** Tool not installed globally

**Solutions:**

**Option 1: Install globally**
```bash
npm install -g mixpanel-import

# macOS/Linux with permission issues:
sudo npm install -g mixpanel-import
```

**Option 2: Use npx (no install)**
```bash
npx mixpanel-import --file output/events.csv --token YOUR_TOKEN
```

**Option 3: Install locally**
```bash
npm install mixpanel-import
./node_modules/.bin/mixpanel-import --file output/events.csv --token YOUR_TOKEN
```

---

### Issue: "0 Users with Profiles" in Mixpanel

**Cause:** Profiles not uploaded or uploaded incorrectly

**Check:**

**1. Did you use the `--profile` flag?**
```bash
# Correct ✅
mixpanel-import --file output/users.csv --token YOUR_TOKEN --profile

# Wrong ❌ (uploads as events, not profiles)
mixpanel-import --file output/users.csv --token YOUR_TOKEN
```

**2. Wait 5-10 minutes** - Mixpanel processes profiles asynchronously

**3. Re-upload with verbose mode:**
```bash
mixpanel-import \
  --file output/users.csv \
  --token YOUR_TOKEN \
  --profile \
  --verbose
```

**4. Verify CSV format:**
```bash
head -2 output/users.csv
# First line should be headers with $name, $email, etc.
```

---

### Issue: Events Not Linking to Users

**Cause:** Mismatched `distinct_id` between events and users

**Check:**

**1. Same token used for both uploads:**
```bash
# Use same token for both
mixpanel-import --file output/events.csv --token SAME_TOKEN
mixpanel-import --file output/users.csv --token SAME_TOKEN --profile
```

**2. Verify distinct_id matches:**
```bash
# Get a distinct_id from users.csv
head -2 output/users.csv | tail -1 | cut -d',' -f1

# Check if it exists in events.csv (replace with actual ID)
grep "YOUR_DISTINCT_ID" output/events.csv | head -3
```

**3. Regenerate fresh data:**
```bash
rm -rf output/
node index.js
# Then re-upload both files
```

---

### Issue: "Timestamps in the future" Error

**Cause:** System clock incorrect or code issue

**Fix:**

**1. Check system time:**
```bash
date
# Should show current date/time
```

**2. Regenerate data** (has 600s safety buffer):
```bash
node index.js
```

**3. If still happening**, verify code in `utils.js`:
```javascript
function randomPastTimestamp(days) {
  const now = Math.floor(Date.now() / 1000);
  const secondsInHistory = days * 24 * 60 * 60;
  return now - Math.floor(Math.random() * secondsInHistory) - 600; // ← Must have -600
}
```

---

### Issue: Upload is Very Slow

**Causes:** Large files, slow network, API rate limiting

**Solutions:**

**1. Use smaller batch size:**
```bash
mixpanel-import \
  --file output/events.csv \
  --token YOUR_TOKEN \
  --batch-size 500
```

**2. Generate fewer events:**
```javascript
// Edit index.js
const EVENTS_TARGET = 5000;
```

**3. Check network:**
```bash
ping api.mixpanel.com
```

**4. Use verbose mode:**
```bash
mixpanel-import \
  --file output/events.csv \
  --token YOUR_TOKEN \
  --verbose
```

---

### Issue: Node.js Version Too Old

**Error:** `npm does not support Node.js v15.x.x`

**Fix - Update Node.js:**

**macOS (Homebrew):**
```bash
brew update
brew upgrade node
node -v  # Should show v18.x.x or v20.x.x
```

**macOS/Windows (Installer):**
1. Download from [nodejs.org](https://nodejs.org/)
2. Install LTS version
3. Restart terminal
4. Verify: `node -v`

**Linux (Ubuntu/Debian):**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

---

### Issue: Permission Errors During npm Install

**Error:** `EACCES: permission denied`

**Fix:**

**Option 1: Use sudo (macOS/Linux)**
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

## ✅ Complete Verification Checklist

After upload, verify in Mixpanel:

**Users (250 total):**
- [ ] 250 users visible in Users tab
- [ ] User profiles show $name, $email, $avatar
- [ ] User profiles show $os, $device, $device_id
- [ ] Android users have $android_brand, $android_os_version
- [ ] iOS users have $ios_version, $ios_device_model
- [ ] Web users have $browser
- [ ] All users have country: "Indonesia"
- [ ] User profiles show total_spend_IDR, total_orders

**Events (~20,000 total):**
- [ ] ~20,000 events visible in project
- [ ] All 14+ event types present
- [ ] Events have $os property
- [ ] Events have country: "Indonesia"
- [ ] Events have $device_id and $device
- [ ] Product prices are 5,000-95,000 IDR
- [ ] All timestamps in past 90 days (no future dates)

**Connections:**
- [ ] Events link to correct users (same distinct_id)
- [ ] User activity feed shows their events
- [ ] Shopping funnel shows ~10-15% conversion

**Indonesian Data:**
- [ ] Indonesian names visible (Budi, Dewi, Ahmad, Siti)
- [ ] Indonesian emails (firstname.lastname@domain format)
- [ ] Indonesian cities (Jakarta, Bandung, Surabaya)

---

## 📝 License

This project is built as a learning reference. You are free to use, modify, and distribute this software for personal learning, testing and demo purposes.

---

## 👤 Author

**Sandi Utomo**  
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sandiutomo/) 
[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sandiutomo)