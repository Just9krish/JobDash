import { forwardRef, useMemo, useState } from "react";
import { Input } from "../ui/input";
import { City, Country } from "country-state-city";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [searchInput, setSearchInput] = useState("");
    const [hasFocus, setHasFocus] = useState(false);

    const cities = useMemo(() => {
      if (!searchInput.trim()) {
        return [];
      }

      return City.getAllCities()
        .map((city) => city.name)
        .filter((city) =>
          city.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()),
        )
        .slice(0, 5);
    }, [searchInput]);

    console.log(cities);

    return (
      <div>
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          placeholder="Search city...?"
          type="search"
          ref={ref}
          {...props}
        />
        {searchInput && hasFocus && (
          <div className="divided-y absolute z-20 rounded-b-lg border-x border-b bg-background shadow-xl">
            {!cities.length && <p>No result found</p>}
            {cities.map((city) => (
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  onLocationSelected(city);
                  setSearchInput("");
                }}
                key={city}
                className="w-full p-2 text-start"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
