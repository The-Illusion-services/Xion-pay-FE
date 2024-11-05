import { AuthLayout } from "@layouts";
import Start from "./auth/start";

export default function Home() {
  return (
    <AuthLayout heading={"Home"} title={"Home"}>
      <Start/>
    </AuthLayout>
  );
}
