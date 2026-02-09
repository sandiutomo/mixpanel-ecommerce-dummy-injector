const fs=require("fs");
const path=require("path");
const faker=require("faker");
const { v4: uuidv4 }=require("uuid");
const {
  generateUser,
  generateProduct,
  generateEvent,
  randomPastTimestamp,
  generateSessionId,
  generateTransactionId
} = require("./utils");

/* ================= CONFIG ================= */
const USERS_COUNT=150;  // TODO: Adjust to your preference
const PRODUCTS_COUNT=20; // TODO: Adjust to your preference
const EVENTS_TARGET=15000; // TODO: Adjust to your preference
const HISTORY_DAYS=90; // TODO: Adjust to your preference
const outputDir=path.join(__dirname,"output");
if(!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

console.log("🛠️  Generating data...\n");

/* ================= USER & PRODUCT CREATION ================= */
const users=[];
const userProfiles=[];
const userStatsMap={};
const userEventTracker={}; // Track which users have events

for(let i=0;i<USERS_COUNT;i++){
  const user=generateUser();
  users.push(user);
  userProfiles.push(user);
  userStatsMap[user.distinct_id]={total_spend:0,total_orders:0};
}

const products=[];
for(let i=0;i<PRODUCTS_COUNT;i++){
  products.push(generateProduct());
}

console.log(`✅ Generated ${USERS_COUNT} users and ${PRODUCTS_COUNT} products`);

/* ================= CONTENT DATA ================= */
const appScreens=[
  "Home","Explore","Cart","Wishlist","Profile",
  "Settings","Notifications","Search Results","Product Details",
  "Order History","Payments","Help Center"
];

/* ================= SIMULATE USER JOURNEYS ================= */
function simulateUserJourney(user,products){
  const events=[];
  const sessionId=generateSessionId();
  let currentTime=randomPastTimestamp(HISTORY_DAYS);

  // GUARANTEED: Every journey starts with App Opened
  events.push(generateEvent(user,null,"App Opened",currentTime,{
    session_id:sessionId,
    source:faker.random.arrayElement(["organic","push_notification","deep_link","direct"])
  }));

  currentTime+=faker.datatype.number({min:2,max:10});

  events.push(generateEvent(user,null,"Session Start",currentTime,{
    session_id:sessionId,
    session_number:faker.datatype.number({min:1,max:50})
  }));

  // Random journey type
  const journeyType=Math.random();

  // ========== JOURNEY 1: SCREEN BROWSING (20%) ==========
  if(journeyType<0.2){
    currentTime+=faker.datatype.number({min:5,max:15});
    
    // Browse multiple screens
    const screenCount=faker.datatype.number({min:2,max:5});
    for(let i=0;i<screenCount;i++){
      const screen=faker.random.arrayElement(appScreens);
      events.push(generateEvent(user,null,"Screen Viewed",currentTime,{
        session_id:sessionId,
        screen_name:screen,
        duration_s:faker.datatype.number({min:5,max:60})
      }));
      currentTime+=faker.datatype.number({min:10,max:30});
    }
  }
  
  // ========== JOURNEY 2: FEATURE EXPLORATION (20%) ==========
  else if(journeyType<0.4){
    currentTime+=faker.datatype.number({min:5,max:20});
    const features=["Wishlist","Price Tracker","Recommendations","Deals"];
    const feature=faker.random.arrayElement(features);
    events.push(generateEvent(user,null,"Feature Used",currentTime,{
      session_id:sessionId,
      feature_name:feature,
      feature_category:"Discovery"
    }));

    if(Math.random()<0.3){
      currentTime+=faker.datatype.number({min:15,max:45});
      events.push(generateEvent(user,null,"Profile Updated",currentTime,{
        session_id:sessionId,
        fields_updated:faker.random.arrayElement(["phone_number","address","preferences","notifications"])
      }));
    }

    if(Math.random()<0.4){
      currentTime+=faker.datatype.number({min:10,max:30});
      events.push(generateEvent(user,null,"Notification Settings Changed",currentTime,{
        session_id:sessionId,
        notification_type:faker.random.arrayElement(["promotions","orders","all"]),
        enabled:faker.datatype.boolean()
      }));
    }
  }
  
  // ========== JOURNEY 3: SHOPPING (60%) ==========
  else{
    currentTime+=faker.datatype.number({min:5,max:30});
    const searchQuery=faker.commerce.department();
    events.push(generateEvent(user,null,"Search Performed",currentTime,{
      session_id:sessionId,
      search_query:searchQuery,
      result_count:faker.datatype.number({min:5,max:50})
    }));

    const browseCount=faker.datatype.number({min:2,max:5});
    const browsedProducts=faker.random.arrayElements(products,browseCount);
    browsedProducts.forEach((prod,i)=>{
      currentTime+=faker.datatype.number({min:15,max:60});
      events.push(generateEvent(user,prod,"Product Viewed",currentTime,{
        session_id:sessionId,
        duration_s:faker.datatype.number({min:10,max:120}),
        source:"search_results",
        position:i+1
      }));

      if(Math.random()<0.3 && i<2){
        currentTime+=faker.datatype.number({min:10,max:30});
        events.push(generateEvent(user,prod,"Product Added to Wishlist",currentTime,{
          session_id:sessionId,
          wishlist_size:faker.datatype.number({min:1,max:10})
        }));
      }

      if(Math.random()<0.15){
        currentTime+=faker.datatype.number({min:5,max:20});
        events.push(generateEvent(user,prod,"Product Shared",currentTime,{
          session_id:sessionId,
          share_method:faker.random.arrayElement(["whatsapp","instagram","twitter","copy_link"])
        }));
      }
    });

    const primaryProduct=browsedProducts[0];
    if(Math.random()<0.6){
      currentTime+=faker.datatype.number({min:30,max:120});
      const quantity=faker.datatype.number({min:1,max:3});
      const cartTotal=primaryProduct.price*quantity;

      events.push(generateEvent(user,primaryProduct,"Added to Cart",currentTime,{
        session_id:sessionId,
        quantity,
        cart_total:cartTotal
      }));

      if(Math.random()<0.7){
        currentTime+=faker.datatype.number({min:30,max:180});
        events.push(generateEvent(user,primaryProduct,"Checkout Started",currentTime,{
          session_id:sessionId,
          quantity,
          cart_total:cartTotal,
          payment_method:faker.random.arrayElement(["Gopay","OVO","Credit Card","Bank Transfer"])
        }));

        if(Math.random()<0.15){
          currentTime+=faker.datatype.number({min:10,max:60});
          events.push(generateEvent(user,primaryProduct,"Payment Failed",currentTime,{
            session_id:sessionId,
            error_message:faker.random.arrayElement(["Insufficient Balance","Card Declined","Timeout","Authentication Failed"]),
            payment_method:faker.random.arrayElement(["Gopay","Credit Card"]),
            quantity,
            cart_total:cartTotal
          }));
          return events;
        }

        currentTime+=faker.datatype.number({min:60,max:180});
        const transactionId=generateTransactionId();
        events.push(generateEvent(user,primaryProduct,"Order Completed",currentTime,{
          session_id:sessionId,
          transaction_id:transactionId,
          payment_method:faker.random.arrayElement(["Gopay","OVO","Credit Card"]),
          shipping_method:faker.random.arrayElement(["Standard","Express","Same Day"]),
          order_total:cartTotal,
          quantity
        }));
        userStatsMap[user.distinct_id].total_spend+=cartTotal;
        userStatsMap[user.distinct_id].total_orders+=1;

        if(Math.random()<0.4){
          const reviewTime=currentTime+faker.datatype.number({min:86400,max:172800});
          events.push(generateEvent(user,primaryProduct,"Review Submitted",reviewTime,{
            transaction_id:transactionId,
            rating:faker.datatype.number({min:3,max:5}),
            has_photo:faker.datatype.boolean(),
            review_length:faker.datatype.number({min:20,max:200})
          }));
        }
      }
    }
  }

  const sessionDuration=faker.datatype.number({min:60,max:600});
  currentTime+=sessionDuration;
  events.push(generateEvent(user,null,"Session End",currentTime,{
    session_id:sessionId,
    session_duration_s:sessionDuration
  }));

  return events;
}

/* ================= GENERATE EVENTS ================= */
const events=[];

console.log("🚀 Simulating realistic user journeys...");

while(events.length<EVENTS_TARGET){
  const user=faker.random.arrayElement(users);
  let sessionsCount=user.engagement_score>0.8?faker.datatype.number({min:3,max:7}):
                    user.engagement_score>0.5?faker.datatype.number({min:1,max:3}):1;
  for(let s=0;s<sessionsCount;s++){
    const journey=simulateUserJourney(user,products);
    events.push(...journey);
    userEventTracker[user.distinct_id]=true; // Mark user as having events
    if(events.length>=EVENTS_TARGET*1.2) break;
  }
}

// ENSURE EVERY USER HAS AT LEAST ONE EVENT
console.log("✅ Ensuring all users have at least one event...");
users.forEach(user=>{
  if(!userEventTracker[user.distinct_id]){
    const simpleSession=[
      generateEvent(user,null,"App Opened",randomPastTimestamp(HISTORY_DAYS),{
        session_id:generateSessionId(),
        source:"organic"
      })
    ];
    events.push(...simpleSession);
    userEventTracker[user.distinct_id]=true;
  }
});

console.log(`✅ Generated ${events.length} events (target: ${EVENTS_TARGET})`);
console.log(`✅ All ${users.length} users have events`);

/* ================= UPDATE USER LTV ================= */
userProfiles.forEach(profile=>{
  const stats=userStatsMap[profile.distinct_id];
  profile.total_spend_idr=stats.total_spend;
  profile.total_orders=stats.total_orders;
  profile.average_order_value=stats.total_orders>0?Math.round(stats.total_spend/stats.total_orders):0;
});

/* ================= CSV EXPORT ================= */
function writeCSV(file,rows){
  if(rows.length===0) return;
  const allKeys=new Set();
  rows.forEach(r=>Object.keys(r).forEach(k=>allKeys.add(k)));
  const headers=Array.from(allKeys);
  const data=rows.map(r=>headers.map(h=>`"${String(r[h]!==undefined?r[h]:"").replace(/"/g,'""')}"`).join(","));
  fs.writeFileSync(file,[headers.join(","),...data].join("\n"));
}

/* ================= WRITE FILES ================= */
writeCSV(path.join(outputDir,"users.csv"),userProfiles);
writeCSV(path.join(outputDir,"events.csv"),events.slice(0,EVENTS_TARGET));

console.log(`\n✅ CSV files saved to ${outputDir}/`);
console.log(`   - users.csv: ${userProfiles.length} users`);
console.log(`   - events.csv: ${events.slice(0,EVENTS_TARGET).length} events`);

/* ================= EVENT DISTRIBUTION ================= */
console.log("\n📊 Event Distribution:");
const eventCounts={};
events.slice(0,EVENTS_TARGET).forEach(e=>{
  eventCounts[e.event]=(eventCounts[e.event]||0)+1;
});
Object.entries(eventCounts)
  .sort((a,b)=>b[1]-a[1])
  .forEach(([event,count])=>{
    const pct=((count/EVENTS_TARGET)*100).toFixed(1);
    console.log(`   - ${event}: ${count} (${pct}%)`);
  });