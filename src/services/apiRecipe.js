import toast from "react-hot-toast";

export async function loadMore(
  next,
  setRecipes,
  setIsLoadingMore,
  setPagination
) {
  setIsLoadingMore(true);
  try {
    const res = await fetch(next);

    setIsLoadingMore(false);
    if (!res.ok)
      throw new Error(
        "Something went wrong with fetching recipes, try back later"
      );

    const data = await res.json();
    setPagination({
      count: data.count,
      currentPage: data.to,
      next: data?._links?.next?.href,
    });

    setRecipes((prev) => [...prev, ...data.hits]);
  } catch (err) {
    setIsLoadingMore(false);
    toast.error(err.message);
  }
}
