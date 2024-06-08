import { useNavigate } from "react-router-dom";
import { env } from "../../env";

export const DeletePostModal = ({
  isOpen,
  onClose,
  singlePost
}) => {

  const navigate = useNavigate()
  const handleOnDeletePost = async () => {
    const info = {
      post_id: singlePost.id,
    };

    console.log(info); // Verifica si la información del post es correcta en la consola del navegador

    try {
      const response = await fetch(`${env.SERVER_URL}/eliminar-post/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
        credentials: "include",
      });

      const data = await response.json();
      if (data.status == "success") {
        
        navigate("/perfil");
        
      }
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
    }
  };


  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-40 bg-black bg-opacity-20">
        <div className="relative p-8 rounded-lg flex flex-col justify-center items-center w-[70%] overflow-hidden">
          <div className=" w-full max-w-md bg-white rounded-lg overflow-y-auto">
            <div className="flex justify-between bg-gray-200 text-gray-700 px-6 py-4">
              <h3 className="font-semibold text-lg">¿Eliminar publicación?</h3>
              <button className="text-white p-1 rounded-lg" onClick={onClose}>
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 1024 1024"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000000"
                >
                  <path
                    fill="#000000"
                    d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full flex justify-end py-4 px-10 gap-5">
              <button className="py-1 px-8 bg-red-500 rounded-lg text-white " onClick={handleOnDeletePost}>
                Si
              </button>
              <button className="py-1 px-8 bg-black rounded-lg text-white " onClick={onClose}>
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
