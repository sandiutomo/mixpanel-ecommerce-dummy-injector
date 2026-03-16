![Node](https://img.shields.io/badge/Node.js-v16+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Status](https://img.shields.io/badge/Status-Production%20Patterns-5A6AE8?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

![Mixpanel](https://img.shields.io/badge/Mixpanel-8.3-7856FF?style=flat-square)

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

## Features

- **Indonesian Users** — Realistic names (Budi, Dewi), emails, 11 cities
- **Events** — 14 event types across the full shopping funnel
- **Complete OS Tracking** — Android (brand, version), iOS (version, model), Web (browser)
- **Mixpanel-Ready** — Special properties (`$name`, `$email`, `$os`, `$device_id`)
- **Guaranteed Connections** — Every user has at least 1 event

---

## 🚀 Quick Start

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

## Installation

### Prerequisites

**Node.js v16+** — Check: `node -v`
**Mixpanel Account** — Get token from Settings → Project Settings

### Install Dependencies

```bash
cd your-project-folder
npm install
```

Installs: `faker`, `uuid`, `node-fetch`, `dotenv`

---

## Upload to Mixpanel

### Upload Events & Users

```bash
# Upload events
mixpanel-import --file output/events.csv --token YOUR_TOKEN

# Upload user profiles (note: --profile flag required)
mixpanel-import --file output/users.csv --token YOUR_TOKEN --profile
```

### Common Options

```bash
--verbose              # Verbose output — helpful for debugging
--batch-size 1000      # Smaller batch size (default: 2000)
--dry-run              # Validate without uploading
```

### Verify Upload

Go to Mixpanel:
- **Users** → Should see 250 users
- **Reports → Insights** → Should see 14+ event types
- Click any user → Should see their events in Activity Feed

✅ **If you see data, upload was successful!**

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
  { city: "Bali",   region: "Bali",       province: "Bali"        },
  { city: "Malang", region: "East Java",   province: "Jawa Timur"  }
];
```

### Add Custom Events

Edit `index.js` inside `simulateUserJourney()`:

```javascript
events.push(generateEvent(user, null, "Custom Event", currentTime, {
  session_id: sessionId,
  custom_property: "value"
}));
```

---

## Troubleshooting

### "mixpanel-import: command not found"

```bash
# Option 1: Install globally
npm install -g mixpanel-import

# Option 2: Use npx (no install needed)
npx mixpanel-import --file output/events.csv --token YOUR_TOKEN
```

### No users visible in Mixpanel

The `--profile` flag is required for user profile uploads:

```bash
# ✅ Correct
mixpanel-import --file output/users.csv --token YOUR_TOKEN --profile

# ❌ Wrong — missing --profile
mixpanel-import --file output/users.csv --token YOUR_TOKEN
```

Wait 5–10 minutes for Mixpanel to process profiles after upload.

### Events not linking to users

Use the **same token** for both uploads:

```bash
mixpanel-import --file output/events.csv --token SAME_TOKEN
mixpanel-import --file output/users.csv --token SAME_TOKEN --profile
```

If events still aren't linking, regenerate and re-upload:

```bash
rm -rf output/
node index.js
# Re-upload both files
```

### Upload is very slow

```bash
# Reduce batch size
mixpanel-import --file output/events.csv --token YOUR_TOKEN --batch-size 500

# Or generate fewer events — edit index.js:
# const EVENTS_TARGET = 5000;
```

### Node.js version too old

Download the latest LTS version from [nodejs.org](https://nodejs.org/).

---

## 📝 License

This project is built as a learning reference for Mixpanel analytics and Indonesian e-commerce data patterns.

You are free to use, modify, and distribute this code for **personal learning, testing, and demo purposes**. If you build on this work, attribution is appreciated but not required.

> API keys and Mixpanel tokens must never be committed to version control. Use environment variables or a `.env` file (see `dotenv` in dependencies).

---

## 👤 Author

Built and maintained by **Sandi Utomo** — Solutions Architect specializing in mobile analytics, martech infrastructure, and data-driven product development.

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sandiutomo/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sandiutomo)

---

*If this reference saved you time, consider leaving a ⭐ on the repo.*
