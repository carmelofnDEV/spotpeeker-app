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
    <form onSubmit={handleFormSubmit}>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="pic_input"
      >
        Sube tu foto de perfil
      </label>
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="pic_input"
        type="file"
        onChange={handleFileChange}
      />
      {selectedFile && <input type="submit" value="Guardar" />}
    </form>
  );
};
