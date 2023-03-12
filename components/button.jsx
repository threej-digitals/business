export default function Button({
  type = "button",
  text,
  className = "text-white py-2 flex w-full font-medium rounded-full justify-center group bg-gradient-to-br from-red-500 to-orange-500 group-hover:from-pink-500 hover:text-gray-200",
  onClick = () => {},
  style,
}) {
  return (
    <button type={type} className={className} onClick={onClick} style={style}>
      {text}
    </button>
  );
}
