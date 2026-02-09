require("dotenv").config();
const fetch=require("node-fetch");
const { v4: uuidv4 } = require("uuid");

const MIXPANEL_TOKEN=process.env.MIXPANEL_TOKEN;
if(!MIXPANEL_TOKEN){
  console.error("❌ ERROR: MIXPANEL_TOKEN not found in .env file");
  process.exit(1);
}

/* ================= SEND EVENTS ================= */
async function sendEventsBatch(events){
  const payload=events.map(evt=>{
    const eventName=evt.event||"Unnamed Event";
    const distinct_id=evt.distinct_id||evt.$distinct_id;
    const insert_id=evt.$insert_id||uuidv4();
    const time=Math.floor(Number(evt.$time||evt.time||Date.now()/1000));

    const props={};
    Object.entries(evt).forEach(([k,v])=>{
      if(!["event","$event_name","distinct_id","$distinct_id","$insert_id","$time","time"].includes(k) && v!=null){
        props[k]=v;
      }
    });

    return {
      event:eventName,
      properties:{
        distinct_id,
        token:MIXPANEL_TOKEN,
        $insert_id:insert_id,
        time,
        ...props
      }
    };
  });

  try{
    const dataParam=Buffer.from(JSON.stringify(payload)).toString('base64');
    const url=`https://api.mixpanel.com/track?data=${dataParam}&verbose=1`;
    const res=await fetch(url,{method:"POST",headers:{Accept:"text/plain"}});
    const text=await res.text();
    try{
      const result=JSON.parse(text);
      if(result.status!==1){
        console.error("❌ Event upload failed:",result);
        return false;
      }
      return true;
    }catch{return text.trim()==="1";}
  }catch(err){
    console.error(`❌ Event upload error: ${err.message}`);
    return false;
  }
}

/* ================= SEND USER PROFILES ================= */
async function sendProfilesBatch(profiles){
  const payload=profiles.map(user=>{
    const profileData={
      $token:MIXPANEL_TOKEN,
      $distinct_id:user.distinct_id,
      $set:{
        $name:user.$name||"",
        $email:user.$email||"",
        $avatar:user.$avatar||"",
        $phone:user.phone||"",
        $city:user.city||"",
        $region:user.$region||"",
        $device_id:user.$device_id||"",
        $device:user.$device||"",
        $os:user.$os||"",
        $created:user.$created||"",
        // Android-specific
        $android_brand:user.$android_brand||undefined,
        $android_os_version:user.$android_os_version||undefined,
        $android_os:user.$android_os||undefined,
        // iOS-specific
        $ios_version:user.$ios_version||undefined,
        $ios_device_model:user.$ios_device_model||undefined,
        // Web-specific
        $browser:user.$browser||undefined,
        // Custom properties
        country:user.country||"",
        country_code:user.country_code||"",
        province:user.province||"",
        gender:user.gender||"",
        carrier:user.carrier||"",
        app_version:user.app_version||"",
        registration_method:user.registration_method||"",
        payment_methods_added:!!user.payment_methods_added,
        initial_utm_source:user.initial_utm_source||"",
        initial_utm_medium:user.initial_utm_medium||"",
        initial_utm_campaign:user.initial_utm_campaign||"",
        total_spend_IDR:Number(user.total_spend_idr)||0,
        total_orders:Number(user.total_orders)||0,
        average_order_value:Number(user.average_order_value)||0
      }
    };
    
    // Remove undefined values
    Object.keys(profileData.$set).forEach(key=>{
      if(profileData.$set[key]===undefined) delete profileData.$set[key];
    });
    
    return profileData;
  });

  try{
    const dataParam=Buffer.from(JSON.stringify(payload)).toString('base64');
    const url=`https://api.mixpanel.com/engage?data=${dataParam}&verbose=1`;
    const res=await fetch(url,{method:"POST",headers:{Accept:"text/plain"}});
    const text=await res.text();
    try{
      const result=JSON.parse(text);
      if(result.status!==1){
        console.error("❌ Profile upload failed:",result);
        return false;
      }
      return true;
    }catch{return text.trim()==="1";}
  }catch(err){
    console.error(`❌ Profile upload error: ${err.message}`);
    return false;
  }
}

module.exports={sendEventsBatch,sendProfilesBatch};