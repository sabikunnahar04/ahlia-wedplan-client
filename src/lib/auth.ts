
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.DB_URI as string);
const db = client.db("wedplan");

export const auth = betterAuth({
  baseURL:
    "https://ahlia-wedplan-client-ehpo39kc0-sabikunnahar0506-3680.vercel.app",

  trustedOrigins: [
    "https://ahlia-wedplan-client-ehpo39kc0-sabikunnahar0506-3680.vercel.app",
  ],

  database: mongodbAdapter(db, {
    client,
  }),

  plugins: [
    jwt({
      jwt: {
        definePayload: ({ user }) => ({
          id: user.id,
          email: user.email,
          role: user.role,
        }),
      },
    }),
  ],

  user: {
    additionalFields: {
      role: {
        type: ["customer", "vendor"],
        required: false,
        defaultValue: "customer",
        input: true,
      },
      businessName: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {},
});
