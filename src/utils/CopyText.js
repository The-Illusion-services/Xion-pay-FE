export const copyText = async (text) => {
    
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();

  try {
    document.execCommand("copy");
    toast.success("Text copied to clipboard!");
  } catch (execErr) {
    console.error("Fallback copy failed: ", execErr);
    toast.error("Failed to copy text.");
  }

  document.body.removeChild(textArea);
};
