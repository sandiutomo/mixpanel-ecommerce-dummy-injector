![Node](https://img.shields.io/badge/Node.js-v16+-green.svg)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
[![Mixpanel](https://img.shields.io/badge/Mixpanel-7856FF?style=flat&logo=mixpanel&logoColor=white)](https://mixpanel.com/)

# 🇮🇩 Indonesian Ecommerce Data Generator

Generate realistic Indonesian e-commerce data for Mixpanel analytics: users, events, complete OS tracking, and guaranteed user-event connections.

---

## 📑 Table of Contents
1. [Features](#-features)
2. [Quick Start](#-quick-start)
3. [Installation](#-installation)
4. [Upload to Mixpanel](#-upload-to-mixpanel)
5. [Customization](#️-customization)
6. [Troubleshooting](#-troubleshooting)
7. [License](#-license)
8. [Author](#-author)

---

## ✨ Features

![hippo](https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmpodjk5NjNqdTc1Y2FjcWpmbjB3ZHRscW1uMW44MGlzNzIwbGw1NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1pGxZCrUkibwKAX1KO/giphy.gif)


- **Indonesian Users** - Realistic names (Budi, Dewi), emails, 11 cities
- **Events** - 14 event types across shopping funnel
- **Complete OS Tracking** - Android (brand, version), iOS (version, model), Web (browser)
- **Mixpanel-Ready** - Special properties ($name, $email, $os, $device_id)
- **Guaranteed Connections** - Every user has at least 1 event

---

## Get Started

### Step 1: Do You Have Node.js?

Node.js is a tool developers use. Check if it's on your machine:

```bash
# 1. Install Node.js v16+ from nodejs.org

# 2. Install dependencies
npm install

# 3. Generate CSV files
node index.js

# 4. Install upload tool
npm install -g mixpanel-import

# 5. Upload to Mixpanel (replace YOUR_TOKEN)
mixpanel-import --file output/events.csv --token YOUR_TOKEN
mixpanel-import --file output/users.csv --token YOUR_TOKEN --profile
```

**Done!** Check Mixpanel → Users (250 users) and Reports → Insights (20,000 events)

---

## 📦 Installation

### Prerequisites

**Node.js v16+** - Check: `node -v`  
**Mixpanel Account** - Get token from Settings → Project Settings

### Install Dependencies

```bash
cd Desktop
git clone https://github.com/sandiutomo/mixpanel-ecommercedata-generator.git
cd mixpanel-ecommercedata-generator
npm install
```

Installs: faker, uuid, node-fetch, dotenv

---

## 🚀 Upload to Mixpanel

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

# Upload user profiles (note: --profile flag)
mixpanel-import --file output/users.csv --token YOUR_TOKEN --profile
```

### Common Options

```bash
# Verbose output (helpful for debugging)
--verbose

# Smaller batch size (default: 2000)
--batch-size 1000

# Dry run (validate without uploading)
--dry-run
```

### Verify Upload

Go to Mixpanel:
- **Users** → Should see 250 users
- **Reports → Insights** → Should see 14+ event types
- Click any user → Should see their events in Activity Feed

✅ **If you see data, upload successful!**

---

## ⚙️ Customization

### Adjust Data Volume

Edit `index.js`:
```javascript
const USERS_COUNT = 500;        // Change user count
const EVENTS_TARGET = 50000;    // Change event count
const HISTORY_DAYS = 180;       // Change date range
```

### Add Indonesian Names

Edit `utils.js`:
```javascript
const indonesianFirstNames = {
  male: ["Budi", "Agus", "Your", "Names"],
  female: ["Siti", "Dewi", "Your", "Names"]
};
```

### Add Cities

Edit `utils.js`:
```javascript
const indonesianCities = [
  {city: "Bali", region: "Bali", province: "Bali"},
  {city: "Malang", region: "East Java", province: "Jawa Timur"}
];
```

### Add Custom Names

Open `utils.js` and customize the Indonesian names:

Edit `index.js` in `simulateUserJourney()`:
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

# Option 2: Use npx (no install)
npx mixpanel-import --file output/events.csv --token YOUR_TOKEN
```

---

### No users appear in Mixpanel

**Must use `--profile` flag:**
```bash
# ✅ Correct
mixpanel-import --file output/users.csv --token YOUR_TOKEN --profile

# Wrong ❌
mixpanel-import --file output/users.csv --token YOUR_TOKEN
```

Wait 5-10 minutes for Mixpanel to process profiles.

### Events not linking to users

**Use same token for both uploads:**
```bash
# Both need YOUR_TOKEN
mixpanel-import --file output/events.csv --token YOUR_TOKEN
mixpanel-import --file output/users.csv --token YOUR_TOKEN --profile
```

**If still broken, regenerate data:**
```bash
rm -rf output
node index.js
# Re-upload both files with same token
```

---

### Upload is really slow

The upload can take 2-10 minutes depending on your internet. Try these:

```bash
# Use smaller batch size
mixpanel-import --file output/events.csv --token YOUR_TOKEN --batch-size 500

# Or generate fewer events
# Edit index.js: const EVENTS_TARGET = 5000;
```

---

### Node.js version too old

Download latest from [nodejs.org](https://nodejs.org/) (LTS version)

---

## 📝 License

This project is built as a learning reference. You are free to use, modify, and distribute this software for personal learning, testing and demo purposes.

---

## 👤 Author

**Sandi Utomo**  
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sandiutomo/) 
[![Github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sandiutomo)