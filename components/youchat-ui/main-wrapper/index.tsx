import { PageAnimation } from "@/components/youchat-ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function MainWrapper({
  content,
}: {
  content: JSX.Element | React.ReactNode;
}) {
  return (
    <main className="flex-1 h-screen min-h-screen fixed">
      <header>
        <div className="fixed top-0 right-0 z-50 bg-background w-full py-1 px-3 h-14 items-center text-black flex justify-between border border-b border-b-black">
          <div className="">
            <p>You Chat</p>
          </div>
          <div className="">
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
