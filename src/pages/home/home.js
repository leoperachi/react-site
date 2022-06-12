import { Link } from "react-router-dom";

function Home() {
  return (
    <>
        <div>
            <nav>
                <Link to="me">Home</Link>
            </nav>
        </div>
     </>
  );
}

export default Home;