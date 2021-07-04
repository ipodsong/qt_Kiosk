import Billboard from "../components/main/billboard";
import Aboutus from "../components/main/aboutus";

function Main() {
    return (
        <div className="main">
            <Billboard />
            <Aboutus />
            <span>
                "Main page."
            </span>
        </div>
    )
}

export default Main;