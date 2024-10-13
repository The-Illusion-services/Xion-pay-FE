import { usePathname } from "next/navigation";

const Container = ({ children, className }: any) => {
  const path = usePathname();
  console.log(path);

  return (
    <div
      className={`nav-item ${
        path === "/auth/sign-up" ||
        path === "/auth/sign-in" ||
        path === "/auth/start" ||
        path === "/create-order" ||
        path === "/"
          ? "w-full"
          : "lg:w-[95%] md:w-[93%] w-full justify-end"
      } authcard1 ${className}`}
    >
      <div className="authcard2 h-full">{children}</div>
    </div>
  );
};

export default Container;
