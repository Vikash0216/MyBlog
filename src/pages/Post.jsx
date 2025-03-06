import React, { useEffect, useState } from "react";
import { Button, Container } from "../components/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import parser from "html-react-parser";
import service from "../appwrite/configure";
import { fetchPost, resetPost } from "../store/postSlice";

function Post() {
  const post = useSelector((state)=> state.posts.post)
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (slug) {
      dispatch(resetPost());
      dispatch(fetchPost(slug))
    } else {
      navigate("/");
    }
  }, [slug, navigate,dispatch]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const download = () => {
    try {
      const fileUrl = service.downloadFile(post.featuredImage); // Get the download URL
  
      if (!fileUrl) throw new Error("File URL not found");

      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "my-file"); // Change filename if needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } 
    catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  
  if (!post) return null;

  const isAuthor = userData && post.userId === userData.$id; // Moved inside conditional block

  return (
    <div className="py-8 bg-gray-100">
      <Container>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          {/* Post Image */}
          {post.featuredImage && (
            <div className="mb-6">
              <img
                src={service.previewFile(post.featuredImage)}
                alt={post.title}
                className="w-full h-64 object-contain rounded-lg shadow bg-gray-200"
              />
            </div>
          )}

          {/* Post Title */}
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h2>

          {/* Post Body */}
          <div className="prose max-w-none text-gray-700">{parser(String(post.content))}</div>

          {/* Action Buttons for Author */}
          {isAuthor && (
            <div className="mt-6 flex gap-4">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Edit
                </Button>
              </Link>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
          {/* Download Button */}
          <Button type="button" onClick={download} className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Download
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Post;