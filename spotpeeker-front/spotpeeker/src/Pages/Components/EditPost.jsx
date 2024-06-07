import { useNavigate } from "react-router-dom";



export const EditPost = ({singlePost}) => {
    const navigate = useNavigate()
  
    const handleEditClick = () => {
        navigate('/editar-post', { state: { singlePost: singlePost } });
      };

    return(
        <>
              <button
                onClick={handleEditClick}
                className="text-lg px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
              Editar
              </button>
        </>

    )
}