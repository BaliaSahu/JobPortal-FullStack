import Header from "../../components/Header/Header.jsx";
import Trusted from "../../components/Trusted/Trusted.jsx";

const Home=()=>{
    return(
        <div  className="d-flex justify-center " style={{ flexDirection: "column", alignItems: "center" }}>
            <Header></Header>
            <div><a
                href="https://jobcrackr.netlify.app"
                className="btn btn-warning fw-semibold"
                target="_blank"
                rel="noopener noreferrer"
            >
                Recruiter
            </a>
            </div>
            <Trusted></Trusted>
        </div>
    )
}
export default Home;
