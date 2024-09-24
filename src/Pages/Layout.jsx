import Aside from "../Components/Aside/Aside";

const Layout = ({ children }) => {
  return (
    <div className="grid grid-cols-[1fr_300px_300px]">
      {children}
      <Aside />
    </div>
  );
};

export default Layout;
