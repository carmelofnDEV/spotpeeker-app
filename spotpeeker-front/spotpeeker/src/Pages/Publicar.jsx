import { useState, useEffect } from "react";
import { env } from "../env";
import { TagInput } from "./Components/TagInput";
import { GMap } from "./Components/GMap";
import { useNavigate } from "react-router-dom";

export const Publicar = () => {
  const SERVER_URL = env.SERVER_URL;
  const navigate = useNavigate();

  const [coords, setCoords] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState([]);

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!photos) {
      console.error("No se ha seleccionado ningún archivo.");
      return;
    }

    const formData = new FormData();

    photos.forEach((file) => {
      formData.append("photos", file);
    });

    formData.append("tags", JSON.stringify(tags));
    formData.append("coords", JSON.stringify(coords));
    formData.append("description", description);

    for (const pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await fetch(`${SERVER_URL}/publicar-post/`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await response.json();
      if (data.status == "success") {
        navigate("/perfil");
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
  };

  const addPhoto = (e) => {
    const files = Array.from(e.target.files);

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    setPhotos([...photos, ...imageFiles]);
  };

  return (
    <>
      <div className="flex justify-center items-center  w-[100%] p-5 ">
        <form
          onSubmit={handleFormSubmit}
          className="w-1/2 flex flex-col shadow-2xl bg-[#dddddd] px-8 py-5 rounded-xl gap-5"
        >
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Añadir imagen</span>
                </p>
              </div>
              <input
                multiple
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={addPhoto}
                accept="image/*"
              />
            </label>
          </div>
          <div className="flex h-[10em]">
            {photos.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt={`Foto ${index}`}
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  marginRight: "10px",
                }}
              />
            ))}
          </div>
          <div>
            <textarea
              id="message"
              rows="4"
              name="description"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Descripción del post"
              onChange={handleDescription}
            ></textarea>
          </div>
          <div className="grid grid-cols-2">
            <div>
              <TagInput setPostTags={setTags} />
            </div>

            <div>
              <div className="w-full h-[300px] borderborder-[1px]">
                <GMap setCoords={setCoords} />
              </div>
            </div>
          </div>
          <input type="submit" value="Publicar" />
        </form>
      </div>

      
    </>
  );
};
