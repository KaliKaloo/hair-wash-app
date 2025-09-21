import { useEffect, useState } from "react";
import "./App.css";

const LAST_WASHED_TIMESTAMP_KEY = "lastWashedTimestamp";
const INTERVAL_MS = 500;

const checkIfWashedHairToday = () => {
  const lastWashedTimestamp =
    localStorage.getItem(LAST_WASHED_TIMESTAMP_KEY) ?? "0";
  const lastWashedDate = new Date(Number(lastWashedTimestamp));
  const currentDate = new Date();
  lastWashedDate.setHours(0, 0, 0);
  currentDate.setHours(0, 0, 0);

  return lastWashedDate.toString() === currentDate.toString();
};

const checkIfNeedsToWashHair = () => {
  const lastWashedTimestamp =
    localStorage.getItem(LAST_WASHED_TIMESTAMP_KEY) ?? "0";
  const lastWashedDate = new Date(Number(lastWashedTimestamp));
  const nextWashDate = new Date(lastWashedDate);
  nextWashDate.setDate(nextWashDate.getDate() + 3);
  nextWashDate.setHours(0, 0, 0);
  const currentDate = new Date();

  return currentDate >= nextWashDate;
};

function App() {
  const [washedHairToday, setWashedHairToday] = useState(
    checkIfWashedHairToday
  );
  const [needsToWashHair, setNeedsToWashHair] = useState(
    checkIfNeedsToWashHair
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      console.log("interval set");
      setWashedHairToday(checkIfWashedHairToday());
      setNeedsToWashHair(checkIfNeedsToWashHair());
    }, INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  });

  if (washedHairToday) {
    return <h2>You've already washed your hair today</h2>;
  }

  return (
    <div>
      <h2>Do I need to wash my hair today?</h2>
      <div>
        {needsToWashHair ? (
          <div>
            YES
            <div className="grid h-30 grid-cols-1 content start gap-4">
              <div className="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-sm outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
                <div>
                  <button
                    className="text-xl font-medium text-black dark:text-white"
                    onClick={() => {
                      if (confirm("Are you sure?")) {
                        localStorage.setItem(
                          LAST_WASHED_TIMESTAMP_KEY,
                          Date.now().toString()
                        );
                      }
                    }}
                  >
                    Ok, I will wash my hair today
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>NO</div>
        )}
      </div>
    </div>
  );
}

export default App;
