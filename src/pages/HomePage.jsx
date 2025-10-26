import Header from "../component/Header";
import Sliders from "../component/Slider";
import Main from "../component/Main";
import Loader from "../component/Loader";
import BestSeller from "../component/BestSeller";
import Children from "../component/Children";
import Classic from "../component/Classic";
import ErrorMessage from "../component/ErrorMessage";
import Footer from "../component/Footer";
import supabase from "../supabaseClient";
import { useEffect, useState } from "react";

function HomePage({
  current,
  setCurent,
  onGoToSlide,
  onHandlePrev,
  onHandleNext,
  isLoading,
  error,
  books,
}) {
  const [lowStockMessage, setLowStockMessage] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(function () {
    async function checkLowStock() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user:", user);
      if (!user) return;
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      console.log("profile:", profile.role);
      if (profile?.role !== "admin") {
        setLoading(false);
        return;
      }
      const { data: lowStockBooks } = await supabase
        .from("books")
        .select("title, stock")
        .lt("stock", 5);
      if (lowStockBooks.length > 0) {
        const titles = lowStockBooks.map((b) => `"${b.title}"`).join(", ");
        setLowStockMessage(
          `⚠️ Low stock alert: The following books have less than 5 copies available: ${titles}`
        );
      }

      setLoading(false);
    }

    checkLowStock();
  }, []);
  function handleScrool(e) {
    const bestSeller = document.getElementById("bestseller");

    bestSeller.scrollIntoView({ behavior: "smooth" });
  }
  function handleScroolClassic() {
    const classic = document.getElementById("classic");
    if (classic) classic.scrollIntoView({ behavior: "smooth" });
  }
  function handleScroolChildren() {
    const children = document.getElementById("children");
    if (children) children.scrollIntoView({ behavior: "smooth" });
  }
  function handleScroolHeader() {
    const slider = document.getElementById("slider");
    slider.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <div>
      <Header />
      {!loading && lowStockMessage && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "1rem",
            borderRadius: "8px",
            marginTop: "150px ",
            textAlign: "center",
            border: "1px solid #f5c6cb",
            fontWeight: "bold",
          }}
        >
          {lowStockMessage}
        </div>
      )}
      <Sliders
        current={current}
        setCurent={setCurent}
        onGoToSlide={onGoToSlide}
        onHandlePrev={onHandlePrev}
        onHandleNext={onHandleNext}
        id={"slider"}
      />

      <Main>
        <>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <BestSeller books={books} id={"bestseller"} />
          )}
          {error && <ErrorMessage message={error} />}

          {isLoading && <Loader top={50} />}
          {!isLoading && !error && <Classic books={books} id={"classic"} />}
          {error && <ErrorMessage message={error} top={50} />}
          {isLoading && <Loader top={50} />}
          {!isLoading && !error && <Children books={books} id={"children"} />}
          {error && <ErrorMessage message={error} top={50} />}
        </>
      </Main>
      <Footer
        onScrool={handleScrool}
        onClassic={handleScroolClassic}
        onChildren={handleScroolChildren}
        onHome={handleScroolHeader}
      />
    </div>
  );
}

export default HomePage;
