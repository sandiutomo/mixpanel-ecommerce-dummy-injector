![Node.js](https://img.shields.io/badge/Runtime-Node.js%20v16+-339933?style=flat-square&logo=node.js&logoColor=white)
![Mixpanel](https://img.shields.io/badge/SDK-Mixpanel%20API-7856FF?style=flat-square)
![CSV](https://img.shields.io/badge/Output-CSV-52BD95?style=flat-square)
![Prototype](https://img.shields.io/badge/Status-Prototype-FF9500?style=flat-square)
![MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

# Indonesian Ecommerce Data Generator — Technical Reference

A Node.js data generation tool that creates realistic Indonesian e-commerce user profiles, products, and shopping events in Mixpanel-compatible CSV format.

---

## Table of Contents

1. [Architecture](#architecture)
2. [Tech Stack](#tech-stack)
3. [Data Model](#data-model)
4. [Installation & Setup](#installation--setup)
5. [Code Structure](#code-structure)
6. [Function Reference](#function-reference)
7. [Event Types & Schema](#event-types--schema)
8. [CSV Format Specification](#csv-format-specification)
9. [Customization Guide](#customization-guide)
10. [Performance & Scaling](#performance--scaling)
11. [Mixpanel Integration](#mixpanel-integration)
12. [Troubleshooting](#troubleshooting)
13. [License](#license)

---

## Architecture

### High-Level Flow

```
Configuration (USERS_COUNT=250, PRODUCTS_COUNT=30, EVENTS_TARGET=20000, HISTORY_DAYS=90)
    ↓
User Generation Engine (250 users with profiles)
    ├─ Indonesian name generator (male/female first + last names)
    ├─ Email & phone formatter (+62 format)
    ├─ Device assignment (Android, iOS, Web — with brand/model/version)
    ├─ City & address localization (11 Indonesian cities)
    ├─ UTM attribution (source, medium, campaign)
    └─ Engagement score (drives session frequency)
    ↓
Product Generation Engine (30 products)
    ├─ 8 product categories with realistic IDR price ranges
    └─ Brand, rating, stock status
    ↓
User Journey Simulator (events until EVENTS_TARGET reached)
    ├─ Journey Type 1: Screen Browsing (20%) — navigate app screens
    ├─ Journey Type 2: Feature Exploration (20%) — use features, update profile
    └─ Journey Type 3: Shopping (60%) — search → view → cart → purchase
        ├─ Session-based event sequencing with Unix timestamps ($time)
        ├─ Engagement-score-driven session counts
        ├─ Event dependency logic (checkout requires cart, purchase requires checkout)
        └─ Post-purchase review (40% chance, 1-2 days later)
    ↓
Guarantee Pass: Ensure every user has ≥1 event
    ↓
LTV Update: Compute total_spend_idr, total_orders, average_order_value per user
    ↓
CSV Writers (dynamic headers from object keys)
    ├─ output/users.csv (Mixpanel user profiles)
    └─ output/events.csv (Mixpanel event data, capped at EVENTS_TARGET)
    ↓
Upload via mixpanel-import CLI
    ├─ Events imported as tracking data
    └─ Users imported as people profiles (--profile flag)
    ↓
Mixpanel Dashboard (ready for reporting)
```

### Module Organization

| Module | File | Purpose |
|--------|------|---------|
| **Main** | `index.js` | Orchestrator: config, user/product generation, journey simulation, CSV export |
| **Utilities** | `utils.js` | Generators: users, products, events, names, cities, devices, UTM, IDs |

---

## Tech Stack

### Dependencies

| Package | Purpose | Version |
|---------|---------|---------|
| **faker** | Realistic data generation (names, products, random values) | ^5.5.3 |
| **uuid** | Unique IDs for users, events, sessions, device IDs | ^9.x |
| **node-fetch** | HTTP client (optional, for direct API uploads) | ^2.x |
| **dotenv** | Environment variable management (.env files) | ^16.x |

### Runtime Requirements

- **Node.js:** v16+ (tested on v16, v18, v20)
- **OS:** macOS, Windows, Linux
- **Memory:** ~80MB for 250 users + 20,000 events
- **Disk:** ~12MB for CSV output files

### External Services

- **Mixpanel:** For data import via `mixpanel-import` CLI tool

---

## Data Model

### User Object

```javascript
{
  distinct_id: "550e8400-e29b-41d4-a716-446655440000", // UUID v4
  $device_id: "a3f2b1c4d5e6f7a8",                       // OS-specific format
  $name: "Budi Wijaya",
  $avatar: "https://i.pravatar.cc/12345",
  $email: "budi.wijaya@gmail.com",
  phone: "+628123456789",
  first_name: "Budi",
  last_name: "Wijaya",
  gender: "Male",                                        // "Male" | "Female"

  // Location
  city: "Jakarta",
  $region: "DKI Jakarta",
  province: "DKI Jakarta",
  country: "Indonesia",
  country_code: "ID",

  // Device
  $device: "android",                                    // "android" | "ios" | "web"
  $os: "Android",                                        // "Android" | "iOS" | "Windows" | "macOS" | "Linux"
  $android_brand: "Samsung",                             // Android only
  $android_os_version: "13",                             // Android only
  $android_os: "Android 13",                             // Android only
  $ios_version: "17.1",                                  // iOS only
  $ios_device_model: "iPhone 14 Pro",                    // iOS only
  $browser: "Chrome",                                    // Web only

  // Operator & App
  carrier: "Telkomsel",                                  // Indonesian carrier
  app_version: "3.2.1",

  // Account
  registration_method: "Google",                         // "Google" | "Email" | "Facebook" | "Apple"
  payment_methods_added: true,
  $created: "2025-01-15T10:30:00Z",

  // Marketing Attribution
  initial_utm_source: "google",
  initial_utm_medium: "cpc",
  initial_utm_campaign: "ramadan_sale",

  // Behavior
  engagement_score: 0.87,                                // 0.0–1.0, drives session frequency

  // LTV (computed after event simulation)
  total_spend_idr: 245000,
  total_orders: 3,
  average_order_value: 81666
}
```

### Product Object

```javascript
{
  product_id: "550e8400-e29b-41d4-a716-446655440001",
  product_name: "Refined Cotton Shirt",
  category: "Fashion",                                   // 8 categories
  brand: "PT. Maju Bersama",
  price: 75000,                                          // IDR, realistic per category
  stock_status: "In Stock",                              // "In Stock" | "Low Stock" | "Pre-Order"
  rating: 4.3
}
```

### Event Object

```javascript
{
  // Mixpanel required
  event: "Product Viewed",                               // Event name
  $time: 1704067200,                                     // Unix timestamp (seconds)
  $insert_id: "550e8400-e29b-41d4-a716-446655440002",   // Dedup key
  distinct_id: "550e8400-e29b-41d4-a716-446655440000",  // Links to user

  // Device context (copied from user)
  $device_id: "a3f2b1c4d5e6f7a8",
  $device: "android",
  $os: "Android",
  $city: "Jakarta",
  $region: "DKI Jakarta",
  country: "ID",
  country_code: "ID",

  // Product context (if product event)
  product_id: "550e8400-e29b-41d4-a716-446655440001",
  product_name: "Refined Cotton Shirt",
  category: "Fashion",
  brand: "PT. Maju Bersama",
  price: 75000,
  stock_status: "In Stock",
  rating: 4.3,

  // Event-specific extras (varies by event type)
  session_id: "a3f2b1c4",
  duration_s: 45,
  source: "search_results",
  position: 2
}
```

### Event Journey Example

**User journey across 3 session types:**

```
Session 1 (Screen Browsing):
  $time: 1704067200 - App Opened { source: "organic" }
  $time: 1704067205 - Session Start { session_number: 12 }
  $time: 1704067215 - Screen Viewed { screen_name: "Explore", duration_s: 34 }
  $time: 1704067240 - Screen Viewed { screen_name: "Wishlist", duration_s: 18 }
  $time: 1704067860 - Session End { session_duration_s: 660 }

Session 2 (Shopping — with purchase):
  $time: 1704153600 - App Opened { source: "push_notification" }
  $time: 1704153607 - Session Start { session_number: 13 }
  $time: 1704153627 - Search Performed { search_query: "Electronics", result_count: 23 }
  $time: 1704153680 - Product Viewed { product: "Ergonomic Chair", duration_s: 87 }
  $time: 1704153720 - Product Added to Wishlist { wishlist_size: 4 }
  $time: 1704153850 - Added to Cart { quantity: 1, cart_total: 85000 }
  $time: 1704153980 - Checkout Started { payment_method: "Gopay" }
  $time: 1704154160 - Order Completed { transaction_id: "TRX-A3F2B1C4", order_total: 85000 }
  $time: 1704154380 - Session End { session_duration_s: 780 }

2 days later:
  $time: 1704326400 - Review Submitted { rating: 5, has_photo: true, review_length: 145 }
```

---

## Installation & Setup

### Prerequisites

```bash
# Check Node.js version (must be v16+)
node --version   # Should show v16.0.0 or higher

# Check npm version
npm --version    # Should show 8.0.0 or higher
```

### Step-by-Step Installation

#### 1. Clone or Download Repository

```bash
git clone https://github.com/sandiutomo/mixpanel-ecommercedata-generator.git
cd mixpanel-ecommercedata-generator
```

#### 2. Install Dependencies

```bash
npm install
```

Installs:
- `faker` v5.5.3 — For generating realistic data (names, products, random values)
- `uuid` — For generating unique IDs
- `node-fetch` — For HTTP requests (optional, for direct API uploads)
- `dotenv` — For environment variables

#### 3. Verify Installation

```bash
node index.js
# or
npm run generate
```

Should generate `output/users.csv` and `output/events.csv`.

#### 4. Install Mixpanel Import Tool

```bash
npm install -g mixpanel-import
# or use npx (no install):
npx mixpanel-import --help
```

---

## Code Structure

### File Organization

```
mixpanel-ecommercedata-generator/
├── index.js                 # Main generator (entry point)
├── utils.js                 # Utility functions (user, product, event generators)
├── package.json             # Dependencies & npm scripts
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore file
├── output/
│   ├── users.csv            # Generated user profiles
│   └── events.csv           # Generated events
├── README.md                # User-facing documentation
└── TECHNICAL_README.md      # This file
```

### index.js — Main Generator

```javascript
// Configuration
const USERS_COUNT = 250;
const PRODUCTS_COUNT = 30;
const EVENTS_TARGET = 20000;
const HISTORY_DAYS = 90;

// 1. Generate users and products
const users = [];
for (let i = 0; i < USERS_COUNT; i++) {
  users.push(generateUser());
}
const products = [];
for (let i = 0; i < PRODUCTS_COUNT; i++) {
  products.push(generateProduct());
}

// 2. Simulate journeys until event target reached
while (events.length < EVENTS_TARGET) {
  const user = faker.random.arrayElement(users);
  // Session count driven by engagement_score
  const sessionsCount = user.engagement_score > 0.8 ? 3-7 : user.engagement_score > 0.5 ? 1-3 : 1;
  for (let s = 0; s < sessionsCount; s++) {
    events.push(...simulateUserJourney(user, products));
  }
}

// 3. Guarantee every user has ≥1 event
users.forEach(user => {
  if (!userEventTracker[user.distinct_id]) {
    events.push(generateEvent(user, null, "App Opened", ...));
  }
});

// 4. Update LTV stats on user profiles
userProfiles.forEach(profile => {
  profile.total_spend_idr = userStatsMap[profile.distinct_id].total_spend;
  profile.total_orders = userStatsMap[profile.distinct_id].total_orders;
  profile.average_order_value = ...;
});

// 5. Write CSVs
writeCSV("output/users.csv", userProfiles);
writeCSV("output/events.csv", events.slice(0, EVENTS_TARGET));
```

### utils.js — Utility Generators

```javascript
// User generation
generateUser()
  → full user object with device, location, UTM, engagement_score

// Product generation
generateProduct()
  → { product_id, product_name, category, brand, price, stock_status, rating }

// Event generation
generateEvent(user, product, eventName, timestamp, extraProps)
  → event object with Mixpanel fields ($time, $insert_id, distinct_id, $device, $os, ...)

// ID helpers
generateSessionId()       → short UUID fragment
generateTransactionId()   → "TRX-XXXXXXXX"
generateDeviceId(type)    → OS-specific device ID format

// Data helpers
randomPastTimestamp(days) → Unix timestamp within last N days
randomUTM()               → { initial_utm_source, initial_utm_medium, initial_utm_campaign }
randomCityData()          → { city, region, province }
randomIndonesianName()    → { first_name, last_name, gender, full_name }
```

---

## Function Reference

### User Generation

#### `generateUser()`

Generates a complete Indonesian user profile. Key behavior:
- Randomly assigns device type (`android` | `ios` | `web`)
- Generates OS-specific fields (android brand/version OR ios model/version OR browser)
- Device ID format differs per OS: hex string (Android), uppercase UUID (iOS), `web_` prefix (Web)
- UTM from realistic channel/campaign combinations (Google, Facebook, Instagram, TikTok, Email, Referral)
- `engagement_score` (0–1) is used by the simulator to determine session frequency

#### `generateProduct()`

Generates a product with category-appropriate IDR pricing:

| Category | Price Range (IDR) |
|----------|-------------------|
| Electronics | 15,000 – 85,000 |
| Fashion | 25,000 – 95,000 |
| Beauty | 10,000 – 70,000 |
| Home & Living | 20,000 – 90,000 |
| Sports | 30,000 – 95,000 |
| Books | 15,000 – 60,000 |
| Toys | 20,000 – 80,000 |
| Food & Beverage | 5,000 – 40,000 |

### Event Simulation

#### `simulateUserJourney(user, products)`

Simulates one complete app session. Randomly selects a journey type:

| Journey | Probability | Events Generated |
|---------|-------------|------------------|
| Screen Browsing | 20% | App Opened, Session Start, Screen Viewed (2-5x), Session End |
| Feature Exploration | 20% | App Opened, Session Start, Feature Used, Profile Updated (30%), Notification Settings Changed (40%), Session End |
| Shopping | 60% | App Opened, Session Start, Search Performed, Product Viewed (2-5x), optional Wishlist/Share, Added to Cart (60%), Checkout Started (70%), Order Completed OR Payment Failed, Review Submitted (40%), Session End |

**Returns:** Array of events for one session (6–20+ events)

#### `generateEvent(user, product, eventName, timestamp, extraProps)`

Builds a Mixpanel-compatible event object. All events include:
- `$time` — Unix timestamp in seconds (Mixpanel's expected format)
- `$insert_id` — UUID for deduplication
- `distinct_id` — links event to user profile
- Device context copied from user (`$device`, `$os`, `$device_id`, `$city`, `$region`)

If `product` is provided, also includes: `product_id`, `product_name`, `category`, `brand`, `price`, `stock_status`, `rating`.

### CSV Writing

#### `writeCSV(file, rows)`

Dynamic CSV writer — derives headers from all keys across all row objects. All values are quoted and internal quotes are escaped. Writes UTF-8.

**Output columns vary** based on event type (product events have more columns than session events).

---

## Event Types & Schema

### Complete Event List (16 Types)

| Event | Journey | Key Properties |
|-------|---------|----------------|
| **App Opened** | All | `session_id`, `source` (organic/push/deep_link/direct) |
| **Session Start** | All | `session_id`, `session_number` |
| **Screen Viewed** | Browse | `session_id`, `screen_name`, `duration_s` |
| **Feature Used** | Explore | `session_id`, `feature_name`, `feature_category` |
| **Profile Updated** | Explore | `session_id`, `fields_updated` |
| **Notification Settings Changed** | Explore | `session_id`, `notification_type`, `enabled` |
| **Search Performed** | Shopping | `session_id`, `search_query`, `result_count` |
| **Product Viewed** | Shopping | product fields, `session_id`, `duration_s`, `source`, `position` |
| **Product Added to Wishlist** | Shopping | product fields, `session_id`, `wishlist_size` |
| **Product Shared** | Shopping | product fields, `session_id`, `share_method` |
| **Added to Cart** | Shopping | product fields, `session_id`, `quantity`, `cart_total` |
| **Checkout Started** | Shopping | product fields, `session_id`, `quantity`, `cart_total`, `payment_method` |
| **Payment Failed** | Shopping | product fields, `session_id`, `error_message`, `payment_method` |
| **Order Completed** | Shopping | product fields, `session_id`, `transaction_id`, `payment_method`, `shipping_method`, `order_total`, `quantity` |
| **Review Submitted** | Shopping | product fields, `transaction_id`, `rating`, `has_photo`, `review_length` |
| **Session End** | All | `session_id`, `session_duration_s` |

### Event Dependencies (Funnel Logic)

```
Shopping Funnel:
  App Opened
    ↓
  Session Start
    ↓
  Search Performed
    ↓
  Product Viewed (2-5 products)
    ├─ Product Added to Wishlist (30% chance, first 2 products)
    └─ Product Shared (15% chance)
    ↓ (primary product only)
  Added to Cart (60% of journeys)
    ↓
  Checkout Started (70% of cart adds)
    ├─ Payment Failed (15%) → Session End
    └─ Order Completed (85%)
        └─ Review Submitted (40%, 1-2 days later, separate timestamp)
    ↓
  Session End
```

---

## CSV Format Specification

### users.csv

Headers are derived dynamically from all user object keys. Core columns include:

```
distinct_id, $device_id, $name, $avatar, $email, phone, first_name, last_name,
gender, city, $region, province, country, country_code, $device, $os,
$android_brand, $android_os_version, $android_os, $ios_version, $ios_device_model,
$browser, carrier, app_version, registration_method, payment_methods_added,
$created, engagement_score, initial_utm_source, initial_utm_medium,
initial_utm_campaign, total_spend_idr, total_orders, average_order_value
```

**Special Mixpanel Fields:**
- `$email` — Mixpanel reserved property for email
- `$name` — Mixpanel reserved property for display name
- `$os` — Mixpanel reserved property for operating system
- `$device_id` — Mixpanel reserved property for device ID
- `$created` — Mixpanel reserved property for signup date
- `$region` — Mixpanel reserved property for region/state
- `$avatar` — Mixpanel reserved property for profile photo URL

### events.csv

Headers are derived dynamically from all event object keys. Core columns include:

```
event, $time, $insert_id, distinct_id, $device_id, $device, $os,
$city, $region, country, country_code,
[product fields: product_id, product_name, category, brand, price, stock_status, rating],
[event-specific fields: session_id, source, quantity, cart_total, payment_method, ...]
```

**Special Mixpanel Fields:**
- `event` — Event name (Mixpanel's required field for CSV import)
- `$time` — Unix timestamp in seconds (Mixpanel uses this for event ordering)
- `$insert_id` — Deduplication key (Mixpanel ignores duplicate insert IDs within 24h)
- `distinct_id` — Maps event to user profile
- `$device_id` — Mixpanel reserved device property
- `$os` — Mixpanel reserved OS property

---

## Customization Guide

### Adjust User Count

**File:** `index.js`

```javascript
const USERS_COUNT = 250;   // Default
const USERS_COUNT = 100;   // Smaller dataset
const USERS_COUNT = 1000;  // Larger dataset
```

### Adjust Product Count

**File:** `index.js`

```javascript
const PRODUCTS_COUNT = 30;  // Default
const PRODUCTS_COUNT = 10;  // Fewer product variety
const PRODUCTS_COUNT = 100; // More product variety
```

### Adjust Event Count

**File:** `index.js`

```javascript
const EVENTS_TARGET = 20000;  // Default
const EVENTS_TARGET = 5000;   // Fewer events
const EVENTS_TARGET = 50000;  // More events
```

### Adjust History Window

**File:** `index.js`

```javascript
const HISTORY_DAYS = 90;   // Default (last 3 months)
const HISTORY_DAYS = 30;   // Last month only
const HISTORY_DAYS = 365;  // Full year
```

### Add Custom Event Types

**File:** `index.js`, inside `simulateUserJourney()`

```javascript
events.push(generateEvent(user, product, "Custom Event Name", currentTime, {
  custom_property_1: "value",
  custom_property_2: 12345,
  session_id: sessionId
}));
```

### Add Indonesian Cities

**File:** `utils.js`

```javascript
const indonesianCities = [
  // Existing...
  { city: "Jakarta", region: "DKI Jakarta", province: "DKI Jakarta" },
  // Add new:
  { city: "Balikpapan", region: "East Kalimantan", province: "Kalimantan Timur" },
  { city: "Batam", region: "Riau Islands", province: "Kepulauan Riau" }
];
```

### Add Indonesian Names

**File:** `utils.js`

```javascript
const indonesianFirstNames = {
  male: ["Budi", "Agus", "Rudi", "Bambang", /* add more */],
  female: ["Siti", "Dewi", "Sinta", "Ratna", /* add more */]
};
const indonesianLastNames = ["Santoso", "Wijaya", /* add more */];
```

### Add UTM Campaigns

**File:** `utils.js`, inside `randomUTM()`

```javascript
const utmCombinations = [
  // Existing channels...
  // Add new:
  { source: "youtube", medium: "cpc", campaigns: ["product_review", "brand_awareness"] },
  { source: "line", medium: "social", campaigns: ["flash_sale", "community"] }
];
```

---

## Performance & Scaling

### Benchmarks

| Config | Users | Products | Events | Runtime | Memory | Disk |
|--------|-------|----------|--------|---------|--------|------|
| Small | 50 | 10 | 5,000 | 2-3 sec | 20 MB | 2 MB |
| Default | 250 | 30 | 20,000 | 8-12 sec | 80 MB | 12 MB |
| Large | 500 | 50 | 50,000 | 25-30 sec | 150 MB | 30 MB |
| XL | 1,000 | 100 | 100,000 | 60-90 sec | 300 MB | 60 MB |

### Optimization Tips

**For faster generation:**
```javascript
const EVENTS_TARGET = 5000;
const HISTORY_DAYS = 30;
const USERS_COUNT = 100;
```

**For larger datasets:**
```javascript
const USERS_COUNT = 1000;
const PRODUCTS_COUNT = 100;
const EVENTS_TARGET = 100000;
const HISTORY_DAYS = 365;
// May take 3-5 minutes, 2-4 GB memory
```

---

## Mixpanel Integration

### Upload Process

```bash
# 1. Generate data
node index.js
# or: npm run generate

# 2. Install import tool (one time)
npm install -g mixpanel-import

# 3. Upload events
mixpanel-import \
  --file output/events.csv \
  --token YOUR_MIXPANEL_TOKEN

# 4. Upload user profiles (--profile flag required)
mixpanel-import \
  --file output/users.csv \
  --token YOUR_MIXPANEL_TOKEN \
  --profile

# 5. Verify in Mixpanel UI
# - People: 250 users with Indonesian names and UTM attribution
# - Reports → Insights: 16 event types
# - Click any user → Activity Feed
```

### Why `$time` as Unix Timestamp

The generator uses Unix timestamps (seconds since epoch) for `$time`. This is Mixpanel's expected format when importing historical data via CSV. Using ISO 8601 strings can cause events to be imported with the current time instead of the historical time.

### Real-Time API Upload (Alternative)

```javascript
// Optional: Direct API upload instead of CSV import
async function uploadToMixpanel(event) {
  const payload = {
    event: event.event,
    properties: {
      distinct_id: event.distinct_id,
      token: process.env.MIXPANEL_TOKEN,
      $time: event.$time,
      $insert_id: event.$insert_id,
      ...event
    }
  };

  const response = await fetch('https://api.mixpanel.com/track', {
    method: 'POST',
    body: JSON.stringify([payload])
  });

  return response.json();
}
```

---

## Troubleshooting

### "Cannot find module 'faker'"

```bash
# Dependencies not installed
npm install

# Verify installation
npm list faker
# Should show: faker@5.5.3
```

### "ENOENT: no such file or directory, open 'output/...'"

```bash
# Output directory created automatically by index.js
# If it fails, create manually:
mkdir -p output
node index.js
```

### "File already exists" / stale data

```bash
# Remove old files before regenerating
rm -rf output/
node index.js
```

### CSV has encoding issues

The writer in `writeCSV()` uses Node's default encoding. To force UTF-8 explicitly, modify `index.js`:

```javascript
function writeCSV(file, rows) {
  // ...
  fs.writeFileSync(file, [headers.join(","), ...data].join("\n"), { encoding: 'utf8' });
}
```

### Mixpanel upload is very slow

```bash
# Reduce batch size
mixpanel-import \
  --file output/events.csv \
  --token YOUR_TOKEN \
  --batch-size 500

# Or generate less data
# Edit index.js: const EVENTS_TARGET = 5000;
```

### Events not linking to users in Mixpanel

**Common causes:**
1. Missing `--profile` flag on user upload
2. Different tokens used for events and users
3. `distinct_id` values don't match between files

**Solution:**
```bash
# Use same token for both uploads
mixpanel-import --file output/events.csv --token TOKEN
mixpanel-import --file output/users.csv --token TOKEN --profile

# Wait 5-10 minutes for Mixpanel to process
```

### Some users show no events in Mixpanel

The generator guarantees every user has at least one event (the "ensure all users" pass in `index.js`). If users appear eventless after import, check that both files were uploaded with the same token.

---

## License

Free to use for personal learning, testing, and demo purposes. Attribution appreciated. See LICENSE file for details.

**Prototype & Reference:** This is a learning project demonstrating data generation patterns and Mixpanel integration. It is not production-ready code. Use as an architectural reference and educational tool only.

---

## Author

**Sandi Utomo**
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sandiutomo/)
[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sandiutomo)
