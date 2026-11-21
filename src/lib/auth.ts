import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";


const client = new MongoClient(process.env.DB_URI as string);
const db = client.db("wedplan");

export const auth = betterAuth({
   database: mongodbAdapter(db, {
    client,
  }),
  plugins: [jwt()],

  user: {
  additionalFields: {
    role: {
      type: ["customer", "vendor"],
      required: false,
      defaultValue: "customer",
      input: true,
    },
  },
},

  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
   
  }, 
});