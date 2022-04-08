import { useSession } from "next-auth/react";
import Category from "../components/Category/Category";
import { Login } from "../components/Login/Login";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Category />
      </>
    );
  }
  return <Login />;
}
