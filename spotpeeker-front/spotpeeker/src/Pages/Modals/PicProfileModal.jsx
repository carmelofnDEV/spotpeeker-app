import { useState } from "react";
import { env } from "../../env";

export const PicProfileModal = ({ onClose, onSuccess }) => {
  const SERVER_URL = env.SERVER_URL;

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.error("No se ha seleccionado ningún archivo.");
      return;
    }

    const formData = new FormData();
    formData.append("pic", selectedFile);

    try {
      const response = await fetch(`${SERVER_URL}/upload-pic_profile/`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);

      if (data.status == "success") {
        onSuccess();
      }

      onClose();
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  return (
    <form className=" flex flex-col items-center justify-center w-full" onSubmit={handleFormSubmit}>
      <div className=" flex flex-col items-center justify-center w-[50%] bg-white p-10 gap-10 rounded-xl">
      <p className="text-[30px]">Cambiar foto de perfil </p>
      <input
        className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="pic_input"
        type="file"
        onChange={handleFileChange}
      />
      {selectedFile && <input type="submit" value="Guardar" />}

      </div>

    </form>
  );
};
