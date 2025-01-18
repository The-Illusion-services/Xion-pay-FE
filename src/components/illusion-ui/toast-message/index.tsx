const ToastMessage = ({
    error = true,
    message,
  }: {
    error?: boolean;
    message: string;
  }) => {
    return (
      <div
        className={`flex w-full m-auto mb-4 px-4 text-sm ${error?"bg-red-200":"bg-green-50"} rounded-md border border-1 ${
          error ? "border-red-500" : "border-green-500"
        }`}
      >
        <p className={`py-3 m-0 ${error?"text-red-800":"text-teal-800"} font-book`}>{message}</p>
      </div>
    );
  };
  
  export default ToastMessage;