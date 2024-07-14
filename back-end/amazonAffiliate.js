const axios = require("axios");
const crypto = require("crypto");

const accessKey = "AKIAIYT7WJVUSXK5EC4A";
const secretKey = "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";
const associateTag = "3330b5-21";
const endpoint = "webservices.amazon.com";
const region = "us-east-1";

function generateSignature(params, secretKey) {
  const canonicalQueryString = Object.keys(params)
    .sort()
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");

  const stringToSign = `GET\n${endpoint}\n/paapi5/getitems\n${canonicalQueryString}`;

  return crypto
    .createHmac("sha256", secretKey)
    .update(stringToSign)
    .digest("base64");
}

async function getAmazonProduct(asin) {
  const timestamp = new Date().toISOString();

  const params = {
    Service: "ProductAdvertisingAPI",
    PartnerTag: associateTag,
    PartnerType: "Associates",
    Marketplace: "www.amazon.com",
    ItemIds: asin,
    Resources: [
      "ItemInfo.Title",
      "ItemInfo.Features",
      "Images.Primary.Medium",
      "Offers.Listings.Price",
    ],
    Timestamp: timestamp,
  };

  params["Signature"] = generateSignature(params, secretKey);

  const url = `https://${endpoint}/paapi5/getitems?${Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&")}`;

  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Host: endpoint,
        "X-Amz-Date": timestamp,
        "X-Amz-Security-Token": accessKey,
        Authorization: `AWS4-HMAC-SHA256 Credential=${accessKey}/${
          timestamp.split("T")[0]
        }/${region}/paapi5/aws4_request, SignedHeaders=host;x-amz-date, Signature=${
          params["Signature"]
        }`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching data from Amazon:", error);
  }
}

// Example usage
getAmazonProduct("B0CR4CM7JG");
