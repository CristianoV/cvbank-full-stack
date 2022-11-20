export default function Loading({ size = 12 }) {
  return (
    <div
      className={`h-${size} w-${size} border-4
    border-gray-200 border-t-gray-500 rounded-full animate-spin
    `}
    ></div>
  );
}
