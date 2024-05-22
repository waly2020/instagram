import Navbar from './Components/Common/Navbar';
import PostList from './Components/Post/PostList';
import { useSelector } from 'react-redux';


const Home = () => {
  const data = useSelector(state => state);
  console.log(data);
  return (
    <div>
      <div className='min-h-screen bg-gradient-to-r from-green-400 via-yellow-500 to-blue-500 animate-gradient-x'>
        <Navbar  />
        <main className="mx-auto sm:w-full md:w-[60%] lg:w-[45%] p-5">
            <PostList />            
        </main>
      </div>
    </div>
  );
};

export default Home;
