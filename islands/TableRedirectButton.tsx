import { useState } from "preact/hooks";

// This component is an "island" and will run on the client side.
export default function TableRedirectButton() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = () => {
    setIsRedirecting(true);
    window.location.href = "/table";  
  };

  return (
    <button
      onClick={handleClick}
      disabled={isRedirecting}
      class={`
        mt-8 px-6 py-3 text-white font-bold rounded-lg transition-colors duration-300
        ${isRedirecting 
          ? "bg-gray-500 cursor-not-allowed" 
          : "bg-green-600 hover:bg-green-900 shadow-xl"
        }
      `}
    >
      {isRedirecting ? "Loading Table..." : "View Players"}
    </button>
  );
}
