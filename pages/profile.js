import { useUser } from "@auth0/nextjs-auth0";
import Link from 'next/link';

export default function Profile () {
 const { user, error, isLoading } = useUser();

//  if (isLoading) return <div>Loading...</div>;

//  if (error) return <div>{error.message}</div>;

 console.log(user);

 if (user) {
   return (
     <div>
       <h2>{user.name}</h2>
       <p>{user.email}</p>
       <Link href="/api/auth/logout">Logout</Link>
     </div>
   );
 }
 return <Link href="/api/auth/login">Login</Link>;
};


// export async function getStaticProps(context) {
//   return {
//     props: {
//       protected: true
//     }
//   };
// }