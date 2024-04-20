import { encoded, translations } from "./data.js";

function decodeFields(data) {
  let decoded = [];
  let uniqueIds = new Set();

  data.forEach((obj) => {
    let decodedObj = {};

    for (let key in obj) {
      if (
        key.endsWith("Id") &&
        !["groupId", "service", "formatSize", "ca"].includes(key)
      ) {
        let decodedValue = translations[obj[key]];
        if (decodedValue !== undefined) {
          decodedObj[key] = decodedValue;
        } else {
          decodedObj[key] = obj[key];
        }
        uniqueIds.add(obj[key]);
      } else {
        decodedObj[key] = obj[key];
      }
    }

    decoded.push(decodedObj);
  });

  return { decoded, uniqueIds: Array.from(uniqueIds) };
}

const { decoded, uniqueIds } = decodeFields(encoded);

console.log("Decoded Data:", decoded);
console.log("Unique Ids:", uniqueIds);
