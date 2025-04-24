export default function ClothingItem({ imageUrl, isSelected, onClick }) {
    return (
      <button
        className={`w-20 h-20 rounded-md border-2 ${isSelected ? 'border-[#96A8FD]' : 'border-transparent'}`}
        onClick={onClick}
      >
        <img src={imageUrl} alt="clothing" className="w-full h-full object-cover rounded-md" />
      </button>
    );
  }
  