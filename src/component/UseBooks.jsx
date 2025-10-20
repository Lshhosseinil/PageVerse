import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
export default function useBooks(query, min, max) {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function fetchApi() {
        try {
          setIsLoading(true);
          setError("");
          const { data, error } = await supabase
            .from("books")
            .select("*")
            .eq("category", query)
            .range(min, max);
          if (error) throw new Error(error);
          setBooks(data);
          console.log(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      fetchApi();
    },
    [query, min, max]
  );
  return { books, isLoading, error };
}
// export default function useBooks(query, min, max) {
//   const [books, setBooks] = useState([]);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   useEffect(
//     function () {
//       async function fetchBestSeller() {
//         try {
//           setIsLoading(true);
//           setError("");
//           const res = await fetch(
//             `https://openlibrary.org/search.json?q=${query}`
//           );
//           if (!res.ok)
//             throw new Error("Somthing went wrong with fetching Error");
//           const data = await res.json();

//           setBooks(data.docs.slice(min, max));
//           console.log(data);
//         } catch (err) {
//           setError(err.message);
//         } finally {
//           setIsLoading(false);
//         }
//       }
//       fetchBestSeller();
//     },
//     [query, min, max]
//   );
//   return { books, isLoading, error };
// }
