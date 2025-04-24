'use client';
import PropTypes from 'prop-types';

export default function PillButton({
  text,
  onClick,
  width, // No default here, logic will handle it
  fontSize = 16, // Default font size in pixels
  textColor = 'text-[#EF6A3F]',
  bgColor = 'bg-[#F9F4E7]',
  padding = 10, // Default padding in pixels
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: width ? `${width}px` : '100%', // Full width if no width is provided
        height: `${fontSize + padding * 2}px`, // Height is font size + vertical padding
        fontSize: `${fontSize}px`, // Set font size dynamically
        padding: `0 ${padding}px`, // Horizontal padding
      }}
      className={`rounded-full font-semibold font-alexandria ${textColor} ${bgColor} hover:opacity-90 transition-all`}
    >
      {text}
    </button>
  );
}

PillButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  width: PropTypes.number, // Optional, can be undefined
  fontSize: PropTypes.number, // Font size in pixels
  textColor: PropTypes.string,
  bgColor: PropTypes.string,
  padding: PropTypes.number, // Padding in pixels
};