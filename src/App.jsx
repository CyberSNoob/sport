// import { useState } from "react";
import TimerView from "./TimerView";
import DurationSelector from "./DurationSelector";
import "./App.css";
import { useState } from "react";

function App() {
  const [selectedDuration, setSelectedDuration] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {!selectedDuration ? (
        <DurationSelector onSelect={setSelectedDuration} />
      ) : (
        <TimerView
          minutes={selectedDuration}
          onBack={() => setSelectedDuration(null)}
        />
      )}
    </div>
  );
}

export default App;
