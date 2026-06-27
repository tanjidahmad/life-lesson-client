// import { auth } from "../auth";
// import { headers } from "next/headers";

// export const getUserSession = async () => {
//     const session = await auth.api.getSession({
//         headers: await headers() // some endpoints might require headers
//     })

//     console.log(session)

//     return session?.user || null;
// }

//  export const getUserToken=async()=>{
//  const session= await auth.api.getSession({

//      headers:await headers()
//  })

//  return session?.session?.token || null;

//  }
import { auth } from "../auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user || null;
};

export const getUserToken = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
   console.log(token);
  return token || null;
};
