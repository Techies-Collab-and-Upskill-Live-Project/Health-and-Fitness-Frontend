/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ProfileContext } from "../../contexts/Profile";
import { DOBInput } from "../../components/input-fields/DOBInput";

export default function DOBScreen() {
  const { date, setDate } = useContext(ProfileContext);

  return (
    <div className="flex items-center justify-center w-full gap-1">
      <DOBInput
        placeholder="DD"
        name="Day"
        value={date.day}
        onChange={(e) => setDate((date) => ({ ...date, day: e.target.value }))}
        maxDigit={2}
      />
      <DOBInput
        placeholder="MM"
        name="Month"
        value={date.month}
        onChange={(e) =>
          setDate((date) => ({ ...date, month: e.target.value }))
        }
        maxDigit={2}
      />
      <DOBInput
        placeholder="YYYY"
        name="Year"
        value={date.year}
        onChange={(e) => setDate((date) => ({ ...date, year: e.target.value }))}
        maxDigit={4}
      />
    </div>
  );
}
