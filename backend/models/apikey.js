import mongoose from "mongoose";

const apikeySchema = new mongoose.Schema({
  applicationName: {
    type: String,
    required: true,
  },
  apikey: {
    type: String,
    required: true,
  },
});

const APIKEY = mongoose.model("APIKEY", apikeySchema);

export default APIKEY;
