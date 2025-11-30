export interface RedirectButtonProps {
    href: string;
    displayText: string;
}

export default function RedirectButton(props: RedirectButtonProps) {

  const handleClick = () => {
    window.location.href = props.href;  
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 text-white font-bold rounded-lg transition-colors duration-300 bg-blue-400 hover:bg-blue-700 shadow-xl"
    >
      {props.displayText}
    </button>
  );
}
