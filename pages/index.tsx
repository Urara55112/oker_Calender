import { useState, useEffect } from "react";

const sampleTournaments = [
  {
    id: "01",
    date: "2025-07-17",
    startTime: "15:00",
    name: "NLH Warm-up",
    type: "NLH",
    entryFee: "¥12,000",
    chips: 30000
  },
  {
    id: "02",
    date: "2025-07-17",
    startTime: "19:00",
    name: "10 Game MIX Day1A",
    type: "MIX",
    entryFee: "¥50,000",
    chips: 50000
  }
];

export default function PokerCalendar() {
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("mySchedule");
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  const toggleCheck = (id: string) => {
    const newChecked = checked.includes(id)
      ? checked.filter((i) => i !== id)
      : [...checked, id];
    setChecked(newChecked);
    localStorage.setItem("mySchedule", JSON.stringify(newChecked));
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📅 Poker Calender</h1>
      {sampleTournaments.map((event) => (
        <div
          key={event.id}
          className="mb-4 p-4 rounded-xl shadow bg-white border border-gray-200"
        >
          <h2 className="text-xl font-semibold mb-1">{event.name}</h2>
          <p className="text-gray-600">
            📅 {event.date} ⏰ {event.startTime}
          </p>
          <p className="text-sm text-gray-500">
            種目: {event.type} ／ 💰{event.entryFee} ／ チップ: {event.chips.toLocaleString()}
          </p>
          <button
            onClick={() => toggleCheck(event.id)}
            className={`mt-3 px-4 py-2 rounded border text-sm transition ${
              checked.includes(event.id)
                ? "bg-green-500 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {checked.includes(event.id) ? "✔️ 参加予定に登録済み" : "＋ 参加予定に追加"}
          </button>
        </div>
      ))}
    </div>
  );
}
