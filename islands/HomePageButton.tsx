export default function HomePageButton() {

  const handleClick = () => {
    window.location.href = "/";  
  };

  return (
    <button
      onClick={handleClick}
      class="px-6 py-3 text-white font-bold rounded-lg transition-colors duration-300 bg-blue-400 hover:bg-blue-700 shadow-xl"
    >
      Return to Homepage
    </button>
  );
}
