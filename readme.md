![Node.js](https://img.shields.io/badge/Built%20With-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Mixpanel](https://img.shields.io/badge/For-Mixpanel-7856FF?style=flat-square&logo=mixpanel&logoColor=white)
![Indonesia](https://img.shields.io/badge/Data-Indonesian%20Ecommerce-FF6B35?style=flat-square)
![Prototype](https://img.shields.io/badge/Status-Prototype-FF9500?style=flat-square)
![Free](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

# Indonesian Ecommerce Data Generator

A tool that generates realistic Indonesian e-commerce customer data in seconds — perfect for testing your Mixpanel analytics setup before connecting real users.

**Why use this?** Instead of waiting weeks to collect real user data, you can instantly populate your Mixpanel account with 250 realistic Indonesian customers and 20,000 shopping events. Test your dashboard, set up alerts, and validate your tracking — all with fake but realistic data.

**This is a prototype and learning reference tool** — built to show how analytics teams can prepare test data. Perfect for understanding data structure and testing your setup, not for production use.

---

## What This Generates

| What | Details |
|---|---|
| **250+ Indonesian Users** | Realistic names (Budi, Siti, Dewi), emails, phone numbers, addresses in 11 Indonesian cities |
| **20,000+ Events** | Real shopping funnel: browse → add to cart → checkout → purchase, plus app crashes and filter uses |
| **Mobile & Web Data** | Android devices (Samsung, Xiaomi, OPPO with real versions), iOS devices (iPhone models), Web browsers |
| **Complete User Info** | City, province, signup date, last login, device OS, browser — everything you'd see from real users |
| **Shopping Journeys** | Each user has 5-50 realistic shopping events spanning weeks (not all in one day) |
| **Ready for Mixpanel** | Automatically formatted with Mixpanel's special tracking fields ($name, $email, $os, $device_id) |

---

## Why You'd Want This

**Before:**
- ❌ Empty Mixpanel dashboard — no way to test
- ❌ Can't set up alerts without real data
- ❌ Don't know if your tracking is working
- ❌ Waiting weeks for real users to trickle in

**After:**
- ✅ Instant 250 realistic users in Mixpanel
- ✅ Test all your dashboards and reports
- ✅ Set up funnels, alerts, and cohorts
- ✅ Verify your tracking setup works
- ✅ Train team on Mixpanel with real-ish data

---

## Get Started

### Step 1: Do You Have Node.js?

Node.js is a tool developers use. Check if it's on your machine:

```bash
node --version
```

**Don't see a version number?**
- Download from [nodejs.org](https://nodejs.org/)
- Pick the "LTS" (Long Term Support) version
- Follow the installer

---

### Step 2: Open Your Command Line

**On Mac:**
1. Hold `Cmd + Space` (opens search)
2. Type `terminal` and press Enter
3. A black window opens

**On Windows:**
1. Press `Win + R` (opens a run box)
2. Type `powershell` and press Enter
   - Or search for "PowerShell" in the Start menu
3. A blue window opens

You're now in the command line. ✓

---

### Step 3: Download and Setup

Copy and paste this into your command line:

```bash
cd Desktop
git clone https://github.com/sandiutomo/indonesian-ecommerce-data-generator.git
cd indonesian-ecommerce-data-generator
npm install
```

**What's happening?**
- `cd Desktop` — Go to your Desktop
- `git clone` — Download the project
- `npm install` — Install the tools it needs

Wait for it to finish (takes 30-60 seconds).

---

### Step 4: Generate Fake Data

```bash
node index.js
```

**You should see:**
```
✓ Generated 250 users
✓ Generated 20,000 events
✓ Files saved: output/users.csv and output/events.csv
```

The tool creates two files in an `output` folder:
- `users.csv` — All 250 customers with their info
- `events.csv` — All 20,000 shopping events

---

### Step 5: Upload to Mixpanel

First, get your Mixpanel token:
1. Log into [Mixpanel](https://mixpanel.com/)
2. Go to **Settings** → **Project Settings**
3. Copy the **Token** (looks like: `abc123def456`)

Then upload the data. In your command line:

```bash
# Install the upload tool (one time only)
npm install -g mixpanel-import

# Upload events
mixpanel-import --file output/events.csv --token YOUR_TOKEN

# Upload users
mixpanel-import --file output/users.csv --token YOUR_TOKEN --profile
```

Replace `YOUR_TOKEN` with your actual Mixpanel token.

**Wait for the "✓ Done" message** (takes 2-5 minutes).

---

### Step 6: Check Your Mixpanel Account

Go back to Mixpanel and click around:

1. **People** → Should show 250 users with Indonesian names
2. **Reports → Insights** → Should show events like "product_view", "add_to_cart", "purchase"
3. **Click any user** → See their activity timeline with all their shopping events

If you see data, **upload successful!** ✅

---

## Understanding Your Generated Data

### The Users

All 250 users have:
- Indonesian names (Budi Wijaya, Siti Nurhaliza, etc.)
- Real email addresses (budi.wijaya@gmail.com)
- Phone numbers in Indonesian format (+62...)
- Address in one of 11 Indonesian cities (Jakarta, Surabaya, Bandung, etc.)
- Signup date ranging over the past 180 days
- Device info: Android, iOS, or Web

### The Events

**14 different event types** across a realistic shopping funnel:

| Event | Means |
|-------|-------|
| **product_view** | User looked at a product |
| **search** | User searched for something |
| **add_to_cart** | User added item to cart |
| **remove_from_cart** | User changed their mind, removed item |
| **view_cart** | User reviewed their cart |
| **start_checkout** | User began checkout process |
| **payment_info** | User entered payment details |
| **complete_purchase** | ✅ User successfully bought something |
| **apply_coupon** | User used a discount code |
| **filter_view** | User filtered products (by price, brand, etc.) |
| **rating_view** | User looked at product reviews |
| **app_crash** | App crashed (realistic problem!) |
| **app_open** | User opened the app |
| **app_close** | User closed the app |

### Device Data

Realistic devices:
- **Android:** Samsung Galaxy, Xiaomi Redmi, OPPO A-series with real Android versions
- **iOS:** iPhone 12, iPhone 13, iPhone 14 with real iOS versions
- **Web:** Chrome, Firefox, Safari, Edge browsers

---

## Customize Your Data (Optional)

Don't like the defaults? Edit the tool:

### Change the Number of Users or Events

Open `index.js` in any text editor and find these lines:

```javascript
const USERS_COUNT = 250;        // Change to 100, 500, 1000, etc.
const EVENTS_TARGET = 20000;    // Change to 5000, 50000, etc.
const HISTORY_DAYS = 180;       // Change to 30, 365, etc.
```

Save and run `node index.js` again.

### Change the Cities

Open `utils.js` and find the city list. Add or remove Indonesian cities:

```javascript
const indonesianCities = [
  { city: "Jakarta", region: "DKI Jakarta", province: "Jakarta" },
  { city: "Surabaya", region: "East Java", province: "Jawa Timur" },
  // Add your own:
  { city: "Yogyakarta", region: "Special Region", province: "DI Yogyakarta" }
];
```

### Add Custom Names

Open `utils.js` and customize the Indonesian names:

```javascript
const indonesianFirstNames = {
  male: ["Budi", "Agus", "Rudi", "Your Name"],
  female: ["Siti", "Dewi", "Sinta", "Your Name"]
};
```

Save and regenerate with `node index.js`.

---

## Troubleshooting

### "command not found: mixpanel-import"

The upload tool isn't installed. Run:

```bash
npm install -g mixpanel-import
```

Or use `npx` instead (no installation needed):

```bash
npx mixpanel-import --file output/events.csv --token YOUR_TOKEN
```

---

### No users appear in Mixpanel

**Important:** Make sure you use the `--profile` flag when uploading users:

```bash
# Correct ✅
mixpanel-import --file output/users.csv --token YOUR_TOKEN --profile

# Wrong (won't upload profiles) ❌
mixpanel-import --file output/users.csv --token YOUR_TOKEN
```

After upload, wait **5-10 minutes** for Mixpanel to process.

---

### Events aren't connected to users

Both uploads must use the **same token**:

```bash
# Both need YOUR_TOKEN
mixpanel-import --file output/events.csv --token YOUR_TOKEN
mixpanel-import --file output/users.csv --token YOUR_TOKEN --profile
```

If it's still not working, regenerate fresh data:

```bash
rm -rf output
node index.js
# Re-upload both files with same token
```

---

### Upload is really slow

The upload can take 2-10 minutes depending on your internet. Try these:

```bash
# Use a smaller batch size
mixpanel-import --file output/events.csv --token YOUR_TOKEN --batch-size 500

# Or generate fewer events
# Edit index.js: const EVENTS_TARGET = 5000;
node index.js
```

---

### "node: command not found"

Node.js isn't installed. Download from [nodejs.org](https://nodejs.org/) and install.

---

## Next Steps

Want technical details? Read **[TECHNICAL_README.md](TECHNICAL_README.md)** for how the data generator works and advanced configurations.

---

## What This Is (And Isn't)

**This is a prototype and learning reference tool:**
- ✅ For testing your Mixpanel setup
- ✅ For understanding data structure
- ✅ For training your team
- ✅ For developing dashboards
- ❌ NOT for production analytics
- ❌ NOT for real customer data
- ❌ NOT for reporting to stakeholders

Use this to prepare and test—then replace with real user data.

---

## License

Free to use for personal learning, testing, and demo purposes. Attribution appreciated. See LICENSE file for details.

---

[![Made by Sandi Utomo](https://img.shields.io/badge/Made%20by-Sandi%20Utomo%20😎-5A6AE8?style=flat-square&logo=github&logoColor=white)](https://github.com/sandiutomo)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sandi%20Utomo-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sandiutomo/)