import service from "../appwrite/configure";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${String($id)}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
        {/* Image Section */}
        <div className="w-full h-52 overflow-hidden">
          <img
            src={service.previewFile(featuredImage)}
            alt={title}
            className="w-full h-full  object-scale-down mt-1"
          />
        </div>

        {/* Title Section */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
