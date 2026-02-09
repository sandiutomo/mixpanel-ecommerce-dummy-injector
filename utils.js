const faker = require("faker");
const { v4: uuidv4 } = require("uuid");

/* ================= GEOGRAPHIC DATA ================= */
const indonesianCities=[
  {city:"Jakarta",region:"DKI Jakarta",province:"DKI Jakarta"},
  {city:"Bandung",region:"West Java",province:"Jawa Barat"},
  {city:"Bogor",region:"West Java",province:"Jawa Barat"},
  {city:"BSD",region:"Banten",province:"Banten"},
  {city:"Semarang",region:"Central Java",province:"Jawa Tengah"},
  {city:"Surabaya",region:"East Java",province:"Jawa Timur"},
  {city:"Yogyakarta",region:"Yogyakarta",province:"DIY Yogyakarta"},
  {city:"Medan",region:"North Sumatra",province:"Sumatera Utara"},
  {city:"Denpasar",region:"Bali",province:"Bali"},
  {city:"Makassar",region:"South Sulawesi",province:"Sulawesi Selatan"},
  {city:"Palembang",region:"South Sumatra",province:"Sumatera Selatan"}
];
function randomCityData(){return faker.random.arrayElement(indonesianCities);}

/* ================= ID GENERATORS ================= */
function generateSessionId(){return uuidv4().split('-')[0];}
function generateTransactionId(){return `TRX-${uuidv4().split('-')[0].toUpperCase()}`;}
// Generate realistic device IDs
function generateDeviceId(deviceType){
  if(deviceType==="android"){
    return Array.from({length:16},()=>Math.floor(Math.random()*16).toString(16)).join('');
  }else if(deviceType==="ios"){
    return uuidv4().toUpperCase();
  }else{
    return `web_${uuidv4().split('-').join('').substring(0,24)}`;
  }
}

/* ================= TIME HELPERS ================= */
function randomPastTimestamp(days){
  const now=Math.floor(Date.now()/1000);
  const secondsInHistory=days*24*60*60;
  return now-Math.floor(Math.random()*secondsInHistory)-600;
}

/* ================= MARKETING DATA ================= */
function randomUTM(){
  // Realistic UTM combinations by source
  const utmCombinations=[
    // Google Ads (Paid)
    {source:"google",medium:"cpc",campaigns:["flash_sale","black_friday","ramadan_sale","new_year_promo","product_launch","spring_sale"]},
    // Google Organic (SEO)
    {source:"google",medium:"organic",campaigns:["seo","brand_search","product_search","general"]},
    // Facebook Ads (Paid)
    {source:"facebook",medium:"cpc",campaigns:["flash_sale","black_friday","ramadan_sale","retargeting","lookalike","conversion"]},
    // Facebook Organic (Social)
    {source:"facebook",medium:"social",campaigns:["brand_awareness","engagement","content_marketing","community"]},
    // Instagram Ads (Paid)
    {source:"instagram",medium:"cpc",campaigns:["flash_sale","influencer_collab","story_ads","new_collection","ramadan_sale"]},
    // Instagram Organic (Social)
    {source:"instagram",medium:"social",campaigns:["brand_awareness","ugc_campaign","reels","stories"]},
    // Email Marketing
    {source:"email",medium:"newsletter",campaigns:["weekly_digest","flash_sale_email","abandoned_cart","product_update","re_engagement"]},
    // TikTok Ads (Paid)
    {source:"tiktok",medium:"cpc",campaigns:["viral_challenge","product_showcase","flash_sale","brand_awareness"]},
    // TikTok Organic (Social)
    {source:"tiktok",medium:"social",campaigns:["trending_content","brand_challenge","ugc","engagement"]},
    // Twitter Ads (Paid)
    {source:"twitter",medium:"cpc",campaigns:["promoted_tweets","flash_sale","event_promo","app_install"]},
    // Twitter Organic (Social)
    {source:"twitter",medium:"social",campaigns:["brand_awareness","customer_service","engagement","updates"]},
    // Referral Program
    {source:"referral",medium:"referral",campaigns:["friend_referral","loyalty_program","affiliate","influencer"]}
  ];
  
  const combo=faker.random.arrayElement(utmCombinations);
  return {
    initial_utm_source:combo.source,
    initial_utm_medium:combo.medium,
    initial_utm_campaign:faker.random.arrayElement(combo.campaigns)
  };
}

/* ================= INDONESIAN NAMES ================= */
const indonesianFirstNames={
  male:["Budi","Agus","Andi","Rudi","Doni","Ahmad","Muhammad","Abdul","Rizki","Fajar","Eko","Bambang","Hadi","Wahyu","Yudi","Bayu","Dedi","Irwan","Joko","Kurniawan"],
  female:["Siti","Dewi","Ani","Rina","Sri","Fitri","Nur","Wulan","Indah","Maya","Ratna","Lestari","Ayu","Putri","Diah","Nia","Evi","Tuti","Rini","Yanti"]
};
const indonesianLastNames=["Santoso","Wijaya","Saputra","Pratama","Kusuma","Utomo","Hidayat","Nugroho","Wibowo","Setiawan","Rahman","Kurniawan","Purnomo","Permana","Susanto","Suryanto","Gunawan","Firmansyah","Hakim","Sugiarto"];

function randomIndonesianName(){
  const gender=faker.random.arrayElement(["Male","Female"]);
  const firstNames=gender==="Male"?indonesianFirstNames.male:indonesianFirstNames.female;
  const first_name=faker.random.arrayElement(firstNames);
  const last_name=faker.random.arrayElement(indonesianLastNames);
  return {first_name,last_name,gender,full_name:`${first_name} ${last_name}`};
}

/* ================= OS DATA ================= */
const androidBrands=["Samsung","Xiaomi","Oppo","Vivo","Realme","Asus","OnePlus","Huawei"];
const androidOSVersions=["14","13","12","11","10"];
const iosVersions=["17.2","17.1","17.0","16.6","16.5","16.4"];
const iosModels=["iPhone 15 Pro","iPhone 15","iPhone 14 Pro","iPhone 14","iPhone 13","iPhone 12","iPhone SE"];
const browsers=["Chrome","Safari","Firefox","Edge"];

/* ================= USER GENERATOR ================= */
function generateUser(){
  const distinct_id=uuidv4();
  const cityData=randomCityData();
  const $device=faker.random.arrayElement(["ios","android","web"]);
  const $device_id=generateDeviceId($device);
  const {first_name,last_name,gender,full_name}=randomIndonesianName();
  
  // Create Indonesian email
  const emailPrefix=`${first_name.toLowerCase()}.${last_name.toLowerCase()}`;
  const emailDomain=faker.random.arrayElement(["gmail.com","yahoo.com","outlook.com","email.com"]);
  const $email=`${emailPrefix}@${emailDomain}`;
  
  const phone=`+62${faker.datatype.number({min:8000000000,max:8999999999})}`;
  const avatarNumber=faker.datatype.number({min:1,max:50000});
  const avatarUrl=`https://i.pravatar.cc/${avatarNumber}`;

  // OS-specific properties
  let $os,$android_brand,$android_os_version,$android_os,$ios_version,$ios_device_model,$browser;
  
  if($device==="android"){
    $os="Android";
    $android_brand=faker.random.arrayElement(androidBrands);
    $android_os_version=faker.random.arrayElement(androidOSVersions);
    $android_os=`Android ${$android_os_version}`;
  }else if($device==="ios"){
    $os="iOS";
    $ios_version=faker.random.arrayElement(iosVersions);
    $ios_device_model=faker.random.arrayElement(iosModels);
  }else{
    $os=faker.random.arrayElement(["Windows","macOS","Linux"]);
    $browser=faker.random.arrayElement(browsers);
  }

  return {
    distinct_id,
    $device_id,
    $name:full_name,
    $avatar:avatarUrl,
    $email,
    phone,
    first_name,
    last_name,
    gender,
    city:cityData.city,
    $region:cityData.region,
    province:cityData.province,
    country:"Indonesia",
    country_code:"ID",
    $device,
    $os,
    $android_brand,
    $android_os_version,
    $android_os,
    $ios_version,
    $ios_device_model,
    $browser,
    carrier:faker.random.arrayElement(["Telkomsel","XL Axiata","Indosat","Tri","Smartfren"]),
    app_version:faker.random.arrayElement(["3.2.1","3.2.0","3.1.5","3.1.0"]),
    registration_method:faker.random.arrayElement(["Google","Email","Facebook","Apple"]),
    payment_methods_added:faker.datatype.boolean(),
    $created:new Date(Date.now()-faker.datatype.number({min:0,max:365*24*60*60*1000})).toISOString(),
    engagement_score:Math.random(),
    ...randomUTM()
  };
}

/* ================= PRODUCT GENERATOR ================= */
// Realistic Indonesian pricing (max 100k for single item)
function generateProduct(){
  const categories=[
    {name:"Electronics",priceRange:[15000,85000]},      // Chargers, accessories
    {name:"Fashion",priceRange:[25000,95000]},          // Clothing
    {name:"Beauty",priceRange:[10000,70000]},           // Cosmetics
    {name:"Home & Living",priceRange:[20000,90000]},    // Kitchen items
    {name:"Sports",priceRange:[30000,95000]},           // Gear
    {name:"Books",priceRange:[15000,60000]},            // Books
    {name:"Toys",priceRange:[20000,80000]},             // Toys
    {name:"Food & Beverage",priceRange:[5000,40000]}    // Snacks
  ];
  const category=faker.random.arrayElement(categories);
  const [minPrice,maxPrice]=category.priceRange;
  return {
    product_id:uuidv4(),
    product_name:faker.commerce.productName(),
    category:category.name,
    brand:faker.company.companyName(),
    price:faker.datatype.number({min:minPrice,max:maxPrice,precision:1000}),
    stock_status:faker.random.arrayElement(["In Stock","Low Stock","Pre-Order"]),
    rating:faker.datatype.number({min:30,max:50})/10
  };
}

/* ================= EVENT GENERATOR ================= */
function generateEvent(user,product,eventName,timestamp,extraProps={}){
  const event={
    event:eventName,
    $time:Number(timestamp),
    $insert_id:uuidv4(),
    distinct_id:user.distinct_id,
    $device_id:user.$device_id,
    $device:user.$device,
    $os:user.$os,
    $city:user.city,
    $region:user.$region,
    country:user.country_code,
    country_code:user.country_code
  };

  if(product){
    event.product_id=product.product_id;
    event.product_name=product.product_name;
    event.category=product.category;
    event.brand=product.brand;
    event.price=product.price;
    event.stock_status=product.stock_status;
    event.rating=product.rating;
  }

  // Add all extra properties
  Object.entries(extraProps).forEach(([k,v])=>{
    if(v!==null && v!==undefined) event[k]=v;
  });

  return event;
}

module.exports={
  generateUser,
  generateProduct,
  generateEvent,
  randomPastTimestamp,
  generateSessionId,
  generateTransactionId,
  generateDeviceId
};