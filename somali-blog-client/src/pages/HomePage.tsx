import { listPostFn } from "@/redux/slices/posts/listPostSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const HomePage = () => {
  const listPostState = useSelector((state: RootState) => state.ListPostSlice);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(listPostFn());
  }, [dispatch]);

  if (listPostState.loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (listPostState.error) {
    toast.error(listPostState.error);
    return null;
  }

  const posts = listPostState?.data?.listPosts || [];

  if (posts.length === 0) {
    return <p className="text-center">No posts available.</p>;
  }

  return (
    <div className="w-full max-w-2xl my-4 mx-auto px-4">

      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className=" rounded-md shadow-md overflow-hidden"
          >
            {/* User Info */}
            <div className="flex items-center p-4 border-b">
              <span className="bg-blue-600 text-white font-bold rounded-full h-9 w-9 flex items-center justify-center"              >
                {post.user?.fullname[0]?.toUpperCase()}
              </span>
              <div className="grid">
              <div className="ml-3 flex gap-2">
                <h1 className="font-bold">{post.user?.fullname}</h1>
                <p className="text-sm text-gray-500 ">
                <strong>&#x2022;</strong>   {dayjs(post.updated_at).fromNow()}
                </p>
              </div>
              <div className="flex items-center mx-3">
              <h2 className="text-sm mb-2">{post.title}</h2>
              </div>
              </div>
             
            </div>

            {/* Post Content */}
            <div className="p-4">
              
              <div
                className="text-gray-700 mb-4"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="flex gap-1">
              <h1 className="font-bold text-blue-800">
                {post.user?.fullname}
              </h1>
              <p className="text-gray-600">{post.desc}</p>
              </div>
            
            </div>
          </div>
          
        ))}
       
      </div>
      
    </div>
  );
};

export default HomePage;
