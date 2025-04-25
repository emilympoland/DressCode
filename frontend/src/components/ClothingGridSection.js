import ClothingItem from './ClothingItem';
import PillButton from './PillButton';

export default function ClothingGridSection({ title, items, selectedItemId, onSelect, onRefresh }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2 ml-2 mr-2">
        <h3 className="text-white font-extralight font-bricolage">{title}</h3>
        <PillButton text="refresh" onClick={onRefresh} fontSize={10} padding={6} width={80} />
      </div>
      <div className="flex justify-evenly flex-wrap gap-4">
        {items.map(item => (
          <ClothingItem
            key={item.id}
            imageUrl={item.imageUrl}
            isSelected={item.id === selectedItemId}
            onClick={() => onSelect(item.id)}
            size={20}
          />
        ))}
      </div>
    </div>
  );
}