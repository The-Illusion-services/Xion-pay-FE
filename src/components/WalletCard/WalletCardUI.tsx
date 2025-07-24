import { Copy, Eye, EyeOff } from "lucide-react";
import React, { useContext, useState } from "react";
import { CreateContext } from "../../Context/context";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import cardbg from "@/src/assets/card-bg.png";
import { toast } from "sonner";
interface WalletCard {
  balance: number;
  cardNumber: string;
  tokenType: "USDC" | "XION";
}

const WalletCardUI: React.FC = () => {
  const { setIsWalletSetupModalVisible, setIsPinChange } =
    useContext(CreateContext).cards;
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);
  const [hasCard, setHasCard] = useState(false);
  const { data: session } = useSession();
  // const [walletCard, setWalletCard] = useState<WalletCard>({
  //   balance: 1234.56,
  //   cardNumber: "1234 5678 9012 3456",
  //   tokenType: "USDC",
  // });

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const formatBalance = (balance: number) => {
    return isBalanceVisible ? balance?.toFixed(2) : "••••••";
  };
  const getWalletCard = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}payments/cards/manage/`,
        {
          headers: {
            authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error ?? "An error occured");
      }

      return responseData;
    } catch (err) {
      // toast.error("An error occured")
      return null;
      // console.log(err);
    }
  };
  const { data: walletCard } = useQuery({
    queryKey: ["wallet-card"],
    queryFn: getWalletCard,
  });

  const handleChangePin = () => {
    setIsPinChange(true);
    setIsWalletSetupModalVisible(true);
  };
  
  if (!walletCard) {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="bg-gray_primary border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
          <div className="text-gray-500 mb-4"></div>
          <h3 className="text-lg font-medium text-white mb-2">
            No Wallet Card Created
          </h3>
          <p className="text-gray-400 mb-6">
            Create your first wallet card to get started
          </p>
          <button
            onClick={() => setIsWalletSetupModalVisible(true)}
            className="bg-white text-black px-6 py-2 rounded-lg  transition-colors"
          >
            Create Card +
          </button>
        </div>
      </div>
    );
  }

  const copyText = async (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      toast.success("Token copied to clipboard!");
    } catch (execErr) {
      console.error("Fallback copy failed: ", execErr);
      toast.error("Failed to copy text.");
    }

    document.body.removeChild(textArea);
  };

  return (
    <div className="max-w-md  mx-auto p-6">
      <div
        style={{
          backgroundImage: `url(${cardbg.src})`,
          backgroundSize: "cover", // Makes the image fit while covering the entire div
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat", // Prevents repetition
        }}
        className="border rounded-xl p-6 text-white shadow-lg w-[380px] h-[208px]"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm opacity-80">Wallet Balance</div>
          <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
            {walletCard.tokenType}
          </div>
        </div>

        {/* Balance */}
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">
              ${formatBalance(Number(walletCard.balance))}
            </div>
            <button
              onClick={toggleBalanceVisibility}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {isBalanceVisible ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <div className="text-sm opacity-80 mt-1">{walletCard.tokenType}</div>
        </div>

        {/* Card Number */}
        <div className="mb-5">
          <div className="text-xs opacity-60 mb-1">Card Number</div>
          <div className="font-mono tracking-wider text-[10px] flex flex-row items-center gap-x-2">
            <span>{walletCard?.novypay_token}</span>
            <Copy
              size={16}
              className="text-white_primary cursor-pointer"
              onClick={() => copyText(walletCard?.novypay_token)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs ">
          <button
            onClick={handleChangePin}
            className="w-fit py-2 px-4 bg-white rounded-md text-black"
          >
            Change Pin
          </button>
        </div>
      </div>

      {/* Demo Controls */}
      {/* <div className="mt-6 space-y-2">
        <button 
          onClick={() => setHasCard(false)}
          className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Reset (Hide Card)
        </button>
        <button 
          onClick={() => setWalletCard(prev => ({ 
            ...prev, 
            tokenType: prev.tokenType === 'USDC' ? 'XION' : 'USDC' 
          }))}
          className="w-full bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Switch Token Type
        </button>
      </div> */}
    </div>
  );
};

export default WalletCardUI;
