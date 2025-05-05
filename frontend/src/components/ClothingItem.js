export default function ClothingItem({
  imageUrl,
  isSelected,
  onClick,
  size = 30,
}) {
  return (
    <button
      className={`w-${size} h-${size} rounded-md border-2 ${
        isSelected ? "border-[#96A8FD]" : "border-transparent"
      }`}
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt="clothing"
        className="w-full h-full object-cover rounded-md"
      />
    </button>
  );
}
