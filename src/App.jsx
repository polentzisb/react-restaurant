import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Intro from "./components/Intro";
import Portfolio from "./components/Portfolio";
import Timeline from "./components/Timeline";

function App() {
  return (
    <>
      <div className="dark:bg-stone-900 text-stone-900 min-h-screen font-inter">
        <div className="max-w-5xl w-11/12 mx-auto">
          <Intro />
          <Portfolio />
          <Timeline />
          <Contact />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
