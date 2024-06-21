/* eslint-disable react/prop-types */
export function InlineSpinner({ type }) {
  return (
    <img src="/Loader.png" alt={type} className="w-12 h-12 animate-spin" />
  );
}
