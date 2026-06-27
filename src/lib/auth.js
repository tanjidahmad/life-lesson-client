// import dns from "node:dns";
// dns.setServers(["8.8.8.8", "8.8.4.4"])

// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// const client = new MongoClient(process.env.MONGO_DB_URI);
// const db = client.db(process.env.AUTH_DB_NAME);

// export const auth = betterAuth({
//   emailAndPassword: {
//     enabled: true,
//   },
//   socialProviders:{
//   google:{

//     clientId: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   },
// },

//   database: mongodbAdapter(db, {
//     client,
//   }),

//  user: {
//   additionalFields: {
//     role: {
//       type: "string",
//       defaultValue: "user",
//     },
//     plan: {
//       type: "string",
//       defaultValue: "free",
//     },
//   },
// },
// });


import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.4.4"])

import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
await client.connect();

const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
      },
      plan: {
        type: "string",
        defaultValue: "free",
      },
    },
  },

  session: {
    cookieCache: {
      strategy:'jwt',
      enabled: true,
      maxAge: 7 * 24 * 60 * 60,
    },
  },

  plugins: [jwt()],
});

