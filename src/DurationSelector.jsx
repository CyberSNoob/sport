
const durations = [5, 10, 15, 20, 25, 30];

function DurationSelector({ onSelect }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="grid grid-cols-3 gap-4">
        {durations.map((min) => (
          <button
            key={min}
            onClick={() => onSelect(min)}
            className="bg-blue-600 text-white font-bold py-6 rounded-2xl shadow-lg hover:bg-blue-700 transition duration-200 text-xl w-28"
          >
            {min} min
          </button>
        ))}
      </div>
    </div>
  );
}

export default DurationSelector;
