import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold">404 - Not Found</h1>
      <Link className="text-blue-500 underline" to="/">
        Go Home
      </Link>
    </div>
  );
}
