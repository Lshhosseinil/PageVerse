// import { useState } from "react";
// import useBooks from "./UseBooks";
// export default function Children({ id }) {
//   const { books } = useBooks("Children", 0, 12);
//   console.log(books.length);
//   const [startIndex, setStartIndex] = useState(0);
//   const visibleCount = 4;
//   function handleNext() {
//     if (startIndex + visibleCount < books.length) {
//       setStartIndex((s) => s + 1);
//     } else {
//       setStartIndex(0);
//     }
//   }
//   function handlePrev() {
//     if (startIndex > 0) {
//       setStartIndex((s) => s - 1);
//     } else if (startIndex === 0) {
//       setStartIndex(books.length - 4);
//     }
//   }
//   const visibleBooks = books.slice(startIndex, startIndex + visibleCount);
//   console.log(visibleBooks);
//   return (
//     <section className="children" style={{ marginTop: "50px" }} id={id}>
//       <div className="children-title">
//         <h2>Children</h2>
//         <button>View All</button>
//       </div>

//       <div className="children-cart">
//         <button
//           className="prevSection"
//           onClick={handlePrev}
//           style={{ flexShrink: "0" }}
//         >
//           <i className="bi bi-chevron-compact-left"></i>
//         </button>
//         {visibleBooks.map((book, i) => (
//           <div key={i} className="children-each-cart">
//             <img
//               src={book.cover_i}
//               alt={book.title}
//               onError={(e) => (e.target.src = "/t5.jpg")}
//             />
//             <div className="children-each-cart-text">
//               <h4>{book.title}</h4>
//               <p>{book.author_name ? book.author_name : "Unknown"}</p>
//               <span>{(Math.random() * 200 + 50).toFixed(2)}$</span>
//             </div>
//           </div>
//         ))}
//         <button
//           className="nextSection"
//           onClick={handleNext}
//           style={{ flexShrink: "0" }}
//         >
//           <i className="bi bi-chevron-compact-right"></i>
//         </button>
//       </div>
//     </section>
//   );
// }

///////////////////////////////////////
import { useState } from "react";
import useBooks from "./UseBooks";
import { Link, useNavigate } from "react-router-dom";

export default function Children({ id }) {
  const { books } = useBooks("Children", 0, 3);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;
  const navigate = useNavigate();
  const handleViewAll = () => {
    navigate("/category/Children");
  };

  return (
    <section className="children" style={{ marginTop: "50px" }} id={id}>
      <div className="children-title">
        <h2>Children</h2>
        <button onClick={handleViewAll}>View All</button>
      </div>

      <div className="children-cart">
        {books.map((book, i) => (
          <Link
            to={`/book/${book.id}`}
            key={book.id}
            style={{ textDecoration: "none" }}
          >
            <div key={i} className="children-each-cart">
              <img
                src={book.cover_i}
                alt={book.title}
                onError={(e) => (e.target.src = "/t5.jpg")}
              />
              <div className="children-each-cart-text">
                <h4>{book.title}</h4>
                <p>{book.author_name ? book.author_name : "Unknown"}</p>
                <span>{book.price} $</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
