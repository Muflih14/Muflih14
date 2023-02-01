import { UpdateSearch } from "../../types";

interface TaskSearchProps {
  updateSearch: UpdateSearch;
}

export default function TaskSearch({ updateSearch }: TaskSearchProps) {
  const onUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    updateSearch(text);
  };
  return (
    <div>
      <input
        className="form-control search-input"
        type="text"
        placeholder="search"
        onChange={onUpdate}
      />
    </div>
  );
}
