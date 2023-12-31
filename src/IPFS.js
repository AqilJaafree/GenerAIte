const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
require('dotenv').config()
const JWT = `${process.env.PINATA_JWT}`;

const pinFileToIPFS = async () => {
  const formData = new FormData();
  const src = "path/to/file.png";

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: "File name",
  });
  formData.append("pinataMetadata", pinataMetadata);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

pinFileToIPFS();
