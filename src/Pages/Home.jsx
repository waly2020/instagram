import AllPosts from '../Components/Posts/AllPosts';
import Layout from './Layout';
 

const Home = () => {
  return (
    <Layout>
      <main className="w-full flex flex-col justify-center p-5">
            <AllPosts/>           
        </main>
    </Layout>
  );
};

export default Home;
