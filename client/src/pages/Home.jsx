import Search from "../components/Search";
import ChatIcon from "../components/ChatIcon";
import Logout from "../components/Logout";

const Home = () => {
    return (
        <div style={{ position: "relative", maxHeight: "100vh" }}>
            <Logout />
            <Search />
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