import { useSession, signIn, signOut } from "next-auth/react";
import Category from "../components/Category/Category";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Category />
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
