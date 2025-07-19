import React, { useContext } from "react";
import { CreateContext } from "@/src/Context/context";
import OtpInput from "react-otp-input";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const SetupModal = () => {
  const queryClient = useQueryClient();
  const {
    pin,
    setPin,
    isPinChange,
    isWalletSetupModalVisible,
    setIsWalletSetupModalVisible,
  } = useContext(CreateContext).cards;
  const { setIsLoading } = useContext(CreateContext).loader;
  const { data: session } = useSession();

  const createNewCard = async (pin: string) => {
    const body = isPinChange ? { new_pin: pin } : { pin };
    console.log(body);
    const fetchApi = isPinChange
      ? "payments/cards/manage/"
      : "payments/cards/create/";
    const method = isPinChange ? "PATCH" : "POST";
    const successMsg = isPinChange
      ? "Pin succesfully updated"
      : "Wallet Succesfully Created";
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${fetchApi}`,
        {
          method,
          body: JSON.stringify({
            ...body,
          }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("An error occured");
      }
      const responseData = await response.json();
      toast.success(successMsg);
      setIsWalletSetupModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ["wallet-card"] });
      return;
    } catch (err) {
      toast.error("An error occured");
    } finally {
      setIsLoading(false);
    }
  };
  if (isWalletSetupModalVisible) {
    return (
      <main className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center z-20 backdrop-blur-sm">
        <section className="w-[30%] h-[45%] bg-gray_primary rounded-md shadow-md drop-shadow-md text-white flex flex-col justify-between py-6 items-center p-4">
          <X
            onClick={() => {
              setIsWalletSetupModalVisible(false);
              setPin("");
            }}
            size={24}
            className="block ml-auto border rounded-md cursor-pointer"
          />
          <div className="flex flex-col items-center w-full h-[80%] justify-evenly gap-y-4">
            <span>Input your 4 digit pin</span>
            <OtpInput
              value={pin}
              onChange={setPin}
              inputType="tel"
              numInputs={4}
              renderSeparator={<span className="w-4"> </span>}
              renderInput={(props) => <input {...props} />}
              shouldAutoFocus={true}
              inputStyle={{
                border: "1px solid black",
                width: "30px",
                height: "40px",
                color: "#111827",
              }}
            />
            <button
              onClick={() => createNewCard(pin)}
              className="bg-white px-4 py-1 text-gray-900 rounded-sm text-sm"
            >
              {isPinChange ? "Change Pin" : "Create Wallet"}
            </button>
          </div>
        </section>
      </main>
    );
  }
};

export default SetupModal;
