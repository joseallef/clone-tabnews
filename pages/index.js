import React from 'react'
import Confetti from 'react-confetti'

function Home() {
  const [windowSize, setWindowSize] = React.useState();

  const useWindowSize = () => {
    if (typeof window !== "undefined") {
      return { width: 1200, height: 800 };
    }


    React.useEffect(() => {
      window.addEventListener("resize", () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      });
    }, []);
  }

  useWindowSize();

  // console.log("window.innerHeight", window.innerHeight)
  // console.log("windowSize", windowSize)



  return (
    <div className="">
      <Confetti
      // width={windowSize.width}
      // height={windowSize.height}      
      >
        <h1>Teste 1 👍</h1>
      </Confetti>
    </div>
  );
}

export default Home;
