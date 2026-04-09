const apiKey = "AIzaSyBsLrSDE3pzTAZWwutaqk2diXm0ROIGp-Y";

async function list() {
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await res.json();
    if(data.error) {
      console.log("Error:", data.error.message);
    } else {
      console.log(JSON.stringify(data.models?.map(m => m.name), null, 2));
    }
  } catch(e) {
    console.error(e);
  }
}
list();
