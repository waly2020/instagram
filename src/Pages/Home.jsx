import AllPosts from "../Components/Posts/AllPosts";
import Layout from "./Layout";

const Home = () => {
  return (
    <Layout>
      <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
        <section className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Latest Posts
          </h1>
        </section>
        <AllPosts />
      </main>
    </Layout>
  );
};

export default Home;
