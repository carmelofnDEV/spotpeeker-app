import { useState, useEffect } from "react";
import { env } from "../env";
import { TagInput } from "./Components/TagInput";
import { GMap } from "./Components/GMap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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

    const remainingSpace = 4 - photos.length;
    const newPhotos = imageFiles.slice(0, remainingSpace);

    setPhotos([...photos, ...newPhotos]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log(photos);
  }, [photos]);

  return (
    <>
      <div className="flex justify-center items-center  w-[100%] p-5 ">
        <div className="w-1/2 flex flex-col shadow-2xl bg-[#dddddd] p-5 rounded-xl gap-5">
          <div className="w-full ">
            <Link to="/perfil">
              <svg
                width="40px"
                height="40px"
                viewBox="0 0 1024 1024"
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#000000"
                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                  />
                  <path
                    fill="#000000"
                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                  />
                </g>
              </svg>
            </Link>
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col  px-10 py-5 rounded-xl gap-5"
          >
            <div className="w-full ">Fotos:</div>
            <div className="grid grid-cols-4 gap-3">
              {photos.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Foto ${index}`}
                    className="rounded-lg h-[12em] w-full object-cover bg-[#ffffff]"
                  />
                  <button
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5 text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              {photos.length < 4 ? (
                <label
                  htmlFor="dropzone-file"
                  className="h-[12em] w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-5 h-50">
              <div>
                <div className="w-full">Descripción:</div>
                <textarea
                  id="message"
                  rows="4"
                  name="description"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descripción del post"
                  onChange={handleDescription}
                ></textarea>
              </div>
              <div>
                <div className="w-full">Etiquetar colaboradores:</div>

                <div className="flex justify-center w">
                  <TagInput setPostTags={setTags} />
                </div>
              </div>
            </div>
            <div className="w-full h-[300px] ">
              <div className="w-full">Ubicación:</div>

              <GMap setCoords={setCoords} />
            </div>

            <div className="w-full flex justify-end items-end mt-10">
              <input
                className="px-8 py-2 bg-[#fafafafa] rounded-lg"
                type="submit"
                value="Publicar"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
