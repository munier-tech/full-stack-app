import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/">
        <button className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200">
          Go Back Home
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
