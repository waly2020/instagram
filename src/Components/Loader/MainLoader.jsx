import Loader from "react-js-loader";
const MainLoader = ({size = 20,display = true}) => {
    return (
            display ? <Loader type="spinner-default" bgColor={"blue"} size={size} /> : null
    );
}

export default MainLoader;
