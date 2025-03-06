import React ,{useEffect , useState} from "react"
import service from "../appwrite/configure"
import {Container,PostCard} from "../components/index"
import { Link } from "react-router-dom"
import { useDispatch ,useSelector } from "react-redux"
import { fetchPosts } from "../store/postSlice"


function Home(){
const posts = useSelector((state)=> state.posts.data.documents)
const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch]);
  

    if (!posts || posts.length === 0) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
          <Container>
            <div className="text-center bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700">Login to see the posts</h3>
              <Link to="/login">
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition">
                  Login
                </button>
              </Link>
            </div>
          </Container>
        </div>
      );
    }
    
    return (
      <div className="py-8 bg-gray-100">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <PostCard {...post} key={post.$id} />
            ))}
          </div>
        </Container>
      </div>
    );
    
    }
    
    export default Home;
    