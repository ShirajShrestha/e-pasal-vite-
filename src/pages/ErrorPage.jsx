import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 px-4">
      <div className="p-4 md:p-10 rounded-lg text-center w-full max-w-xl md:max-w-2xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-red-600">
          Page Not Found
        </h2>
        <div className="md:h-[70vh] mb-2">
          <img
            src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?t=st=1731653779~exp=1731657379~hmac=05283de55762b21e1ccc2469b12067660567ed4e08c368bccc26a4ac1954328a&w=740"
            alt="Error illustration"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <button
          onClick={() => handleBack()}
          className="px-6 py-3 text-base md:text-lg bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
