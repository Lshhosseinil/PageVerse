import Header from "../component/Header";
import Sliders from "../component/Slider";
import Main from "../component/Main";
import Loader from "../component/Loader";
import BestSeller from "../component/BestSeller";
import Children from "../component/Children";
import Classic from "../component/Classic";
import ErrorMessage from "../component/ErrorMessage";
import Footer from "../component/Footer";

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
//  current = { current };
//  setCurent = { setCurent };
//  onGoToSlide = { goToSlide };
//  onHandlePrev = { handlePrev };
//  onHandleNext = { handleNext };
//  isLoading = { isLoading };
//  error = { error };
//  books = { books };
//  onScrool = { handleScrool };
//  onClassic = { handleScroolClassic };
//  onChildren = { handleScroolChildren };
//  onHome = { handleScroolHeader };
