import { AuthLayout } from "@layouts";
import SignIn from "./auth/sign-in";

export default function Home() {
  return (
    <AuthLayout heading={"Home"} title={"Home"}>
      <SignIn/>
    </AuthLayout>
  );
}
