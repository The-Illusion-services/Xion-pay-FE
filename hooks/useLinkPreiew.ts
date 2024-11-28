
import { MessageService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const extractUrl = (text: string | null) => {
  if (!text) return;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex);
  return urls ? urls[0] : null;
};

const useLinkPreview = (text: string | null) => {
  const fetchLinkPreview = async () => {
    
    try {
      const url = extractUrl(text);

      if (!url) return;
      
      const response = await MessageService.getLinkPreview(encodeURIComponent(url));
      
      return response?.data?.data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error?.response?.data?.message || "An error occurred");
    }
  };

  return useQuery<any, Error>({
    queryKey: ["get-link-preview", text],
    queryFn: fetchLinkPreview,
  });
  
};

export default useLinkPreview;