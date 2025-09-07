import { useEffect } from "react";

export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `Grocery2Go | ${title}`;
  }, [title]);
}
