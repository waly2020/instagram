import Aside from "../Components/Aside/Aside";

const Layout = ({children}) => {
    return (
        <div className='grid grid-cols-[300px_1fr_300px]'>
        <Aside/>
        {children}
    </div>
    );
}

export default Layout;
