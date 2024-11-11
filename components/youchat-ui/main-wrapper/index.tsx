import { PageAnimation } from "@/components/youchat-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthToken } from "@/hooks";
export default function MainWrapper({
  content,
}: {
  content: JSX.Element | React.ReactNode;
}) {
  const { userData } = useAuthToken();
  console.log(userData);
  // TODO: revisit the userData type and put other properties asieds just _id
  return (
    <main className="flex-1 h-screen min-h-screen">
      <header>
        <div className="fixed top-0 right-0 z-50 bg-background w-full py-1 px-3 h-14 items-center text-black flex justify-between border border-b border-b-black">
          <div className="">
            <p>You Chat</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <div className="leading-none">
              <h1>
                {userData?.fname} {userData?.lname}
              </h1>
              <span className="text-xs text-black/55">{userData?.username}</span>
            </div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <section className="h-full pt-14">
        <PageAnimation>{content}</PageAnimation>
      </section>
    </main>
  );
}
