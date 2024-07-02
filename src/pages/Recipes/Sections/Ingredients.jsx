export function Ingredients({ children }) {
  return <div className="p-4 space-y-2">{children}</div>;
}
export function Ingredient({ item }) {
  return (
    <div className="flex font-normal text-grey-4 text-base items-center">
      <p className="h-1/2 w-6 flex items-end justify-center">
        <span className="rounded-full w-1 h-1 bg-grey-4"></span>
      </p>
      <p>{item}</p>
    </div>
  );
}
export function Instructions({ children }) {
  return <div className="p-4 space-y-2">{children}</div>;
}
export function Instruction({ number, item }) {
  return (
    <div className="flex font-normal text-grey-4 text-base items-center">
      <p>
        {number}. {item}
      </p>
    </div>
  );
}
