export default function OutfitPreview({ items }) {
    return (
      <div className="flex flex-col gap-3">
        {items.map((item, idx) => (
          <img key={idx} src={item.imageUrl} alt="outfit piece" className="w-full rounded-md" />
        ))}
      </div>
    );
  }
  