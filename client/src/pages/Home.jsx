import Search from "../components/Search";
import ChatIcon from "../components/ChatIcon";
import Navbar from "../components/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar />
            <div style={{ marginTop: "200px" }}>
                <Search />
            </div>
            <div
                style={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                }}
            >
                <ChatIcon />
            </div>
        </div>
    );
};

export default Home;
