import { useState } from "react";
import { env } from "../../env";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { GMapStatic } from "../Components/GMapStatic";

export const PostModal = ({
  onClose,
  onSuccess,
  singlePost,
  handleOnFollow,
  isFollowed,
  isOwner,
}) => {
  const SERVER_URL = env.SERVER_URL;

  const [isLiking, setIsLiking] = useState(singlePost.liked_by_user);
  const [postComments, setPostComments] = useState(singlePost.comentarios);

  const handleLike = async () => {
    const data = {
      post: singlePost.id,
    };

    try {
      const response = await fetch(`${SERVER_URL}/like-post/`, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status == "success") {
        if (result.action == "liked") {
          setIsLiking(true);
          singlePost.liked_by_user = true;
          singlePost.likes = singlePost.likes + 1;
        } else if (result.action == "unliked") {
          setIsLiking(false);
          singlePost.liked_by_user = false;
          singlePost.likes = singlePost.likes - 1;
        }
      }
    } catch (error) {
      console.error("Error liking the post:", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (formData.get("comentario").length > 0) {
      const data = {
        post: singlePost.id,
        comentario: formData.get("comentario"),
      };
      e.target.reset();
      try {
        const response = await fetch(`${SERVER_URL}/comment-post/`, {
          method: "POST",
          body: JSON.stringify(data),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        if (result.status == "success") {
          console.log("publicado");
          setPostComments([...postComments, result.comment]);
        }
      } catch (error) {
        console.error("Error comment the post:", error);
      }
    }
  };
  return (
    <>
      <div className="flex flex-col w-full items-center justify-center p-10">
        <div className="flex w-full justify-between items-center bg-gray-300 p-3 rounded-t-lg">
          <div className="text-lg font-semibold"># {singlePost.autor}</div>
          <div className="flex items-center space-x-2">
            {isOwner ? (
              <a
                href="#"
                className="text-lg px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Editar
              </a>
            ) : (
              <button
                onClick={handleOnFollow}
                className="text-lg px-4 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {isFollowed ? "Siguiendo" : "Seguir"}
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-3 w-full ">
          <Carousel
            className="col-span-2 flex items-center justify-center  h-full bg-[#dddddddd] bg-opacity-90"
            showThumbs={false}
            showStatus={false}
          >
            {singlePost.imagenes.map((photo, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-full"
              >
                <div className="h-[40em] h-full">
                  <img
                    className="w-full h-full"
                    src={`${SERVER_URL}/media/${photo.imagen}`}
                    alt={`Photo ${index}`}
                  />
                </div>
              </div>
            ))}
            {singlePost.ubicacion !== "[]" ? (
              <GMapStatic position={JSON.parse(singlePost.ubicacion)[0]} />
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <svg
                  width="50%"
                  height="50%"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M14.4126 9.82746C14.4085 9.41327 14.0694 9.08082 13.6553 9.08492C13.2411 9.08902 12.9086 9.42811 12.9127 9.84231L14.4126 9.82746ZM12.9732 11.5923L12.4309 11.0742L12.4309 11.0742L12.9732 11.5923ZM11.2662 11.5849C10.852 11.5892 10.5197 11.9284 10.524 12.3426C10.5282 12.7568 10.8675 13.0891 11.2817 13.0848L11.2662 11.5849ZM4.32782 18.489C4.04454 18.7912 4.05988 19.2658 4.36208 19.5491C4.66428 19.8323 5.1389 19.817 5.42218 19.5148L4.32782 18.489ZM8.58118 16.1448C8.86446 15.8426 8.84912 15.368 8.54692 15.0847C8.24472 14.8014 7.7701 14.8168 7.48682 15.119L8.58118 16.1448ZM19.0719 4.95607C19.3554 4.654 19.3402 4.17937 19.0382 3.89594C18.7361 3.61252 18.2615 3.62763 17.9781 3.9297L19.0719 4.95607ZM15.7356 6.3197C15.4521 6.62176 15.4672 7.0964 15.7693 7.37982C16.0714 7.66324 16.546 7.64813 16.8294 7.34607L15.7356 6.3197ZM16.9193 6.4367C16.7005 6.085 16.238 5.97726 15.8863 6.19606C15.5346 6.41486 15.4269 6.87735 15.6457 7.22906L16.9193 6.4367ZM15.4947 14.6089L16.0355 15.1285L16.0371 15.1269L15.4947 14.6089ZM11.2739 19.0019L10.7333 19.5217C10.8747 19.6688 11.07 19.7519 11.274 19.7519C11.4781 19.7518 11.6734 19.6687 11.8148 19.5215L11.2739 19.0019ZM8.57466 15.1121C8.28759 14.8135 7.81281 14.8041 7.51421 15.0912C7.21561 15.3783 7.20626 15.8531 7.49334 16.1517L8.57466 15.1121ZM16.8306 7.34482C17.1139 7.04263 17.0986 6.568 16.7964 6.28471C16.4942 6.00142 16.0196 6.01675 15.7363 6.31894L16.8306 7.34482ZM7.48683 15.1189C7.20354 15.4211 7.21887 15.8958 7.52106 16.1791C7.82325 16.4623 8.29788 16.447 8.58117 16.1448L7.48683 15.1189ZM6.05895 14.6112C6.3143 14.9374 6.78569 14.9948 7.11184 14.7394C7.43799 14.4841 7.49539 14.0127 7.24005 13.6865L6.05895 14.6112ZM7.05023 5.82188L7.59254 6.33995L7.59282 6.33966L7.05023 5.82188ZM14.4837 5.90251C14.8044 6.1647 15.2769 6.11728 15.5391 5.79661C15.8013 5.47594 15.7539 5.00344 15.4332 4.74125L14.4837 5.90251ZM12.2749 8.45016C12.5932 8.71526 13.0661 8.67216 13.3312 8.35389C13.5963 8.03562 13.5532 7.56271 13.235 7.29761L12.2749 8.45016ZM11.2739 7.33488L11.2738 6.58484L11.2662 6.58492L11.2739 7.33488ZM9.57469 8.07743L9.03243 7.55931L9.03243 7.55931L9.57469 8.07743ZM8.88517 9.83488L9.63523 9.83678L9.63514 9.82746L8.88517 9.83488ZM8.81795 11.8589C9.07033 12.1873 9.54118 12.249 9.86963 11.9966C10.1981 11.7442 10.2597 11.2733 10.0074 10.9449L8.81795 11.8589ZM12.9127 9.84231C12.9173 10.3059 12.7419 10.7487 12.4309 11.0742L13.5154 12.1105C14.1004 11.4983 14.421 10.6767 14.4126 9.82746L12.9127 9.84231ZM12.4309 11.0742C12.1205 11.3991 11.7011 11.5804 11.2662 11.5849L11.2817 13.0848C12.1268 13.0761 12.9299 12.7233 13.5154 12.1105L12.4309 11.0742ZM5.42218 19.5148L8.58118 16.1448L7.48682 15.119L4.32782 18.489L5.42218 19.5148ZM17.9781 3.9297L15.7356 6.3197L16.8294 7.34607L19.0719 4.95607L17.9781 3.9297ZM15.6457 7.22906C16.9993 9.40494 16.7086 12.2518 14.9523 14.0909L16.0371 15.1269C18.2695 12.7892 18.6319 9.18953 16.9193 6.4367L15.6457 7.22906ZM14.9539 14.0893L10.7331 18.4823L11.8148 19.5215L16.0355 15.1285L14.9539 14.0893ZM11.8146 18.4821L8.57466 15.1121L7.49334 16.1517L10.7333 19.5217L11.8146 18.4821ZM15.7363 6.31894L7.48683 15.1189L8.58117 16.1448L16.8306 7.34482L15.7363 6.31894ZM7.24005 13.6865C5.52774 11.4994 5.68115 8.34081 7.59254 6.33995L6.50791 5.30381C4.07978 7.8456 3.88898 11.8395 6.05895 14.6112L7.24005 13.6865ZM7.59282 6.33966C9.44439 4.39935 12.4178 4.21338 14.4837 5.90251L15.4332 4.74125C12.7573 2.55346 8.89768 2.79951 6.50763 5.3041L7.59282 6.33966ZM13.235 7.29761C12.683 6.83784 11.9906 6.58478 11.2738 6.58488L11.274 8.08488C11.636 8.08483 11.9895 8.21242 12.2749 8.45016L13.235 7.29761ZM11.2662 6.58492C10.4211 6.59363 9.618 6.94647 9.03243 7.55931L10.1169 8.59556C10.4274 8.2707 10.8468 8.08932 11.2817 8.08484L11.2662 6.58492ZM9.03243 7.55931C8.44749 8.17149 8.12681 8.99302 8.13521 9.8423L9.63514 9.82746C9.63055 9.36391 9.80592 8.92107 10.1169 8.59556L9.03243 7.55931ZM8.13518 9.83299C8.13333 10.5656 8.37277 11.2795 8.81795 11.8589L10.0074 10.9449C9.76647 10.6314 9.63415 10.241 9.63517 9.83677L8.13518 9.83299Z"
                      fill="#000000"
                    />
                  </g>
                </svg>
                <p>No ubication</p>
              </div>
            )}
          </Carousel>

          <div className="flex flex-col justify-between border-l-[1px] w-full bg-green-600 overflow-hidden">
            <div className="h-[500px] overflow-y-auto scrollbar-hide">
              <ul className="list-none p-5 m-0">
                {postComments.map((comment, index) => (
                  <li
                    key={index}
                    className="flex items-start bg-white p-4 rounded-lg shadow-md mb-4"
                  >
                    <div className="w-12 h-12 overflow-hidden rounded-full">
                      <img
                        className="object-cover w-full h-full"
                        src={`${SERVER_URL}/${comment.pic}`}
                        alt={`comment_pic_${index}`}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-800">
                        {comment.username}
                      </p>
                      <p className="text-gray-600">{comment.content}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <form
              onSubmit={handleComment}
              className="flex w-full p-3 bg-gray-100 rounded"
            >
              <textarea
                name="comentario"
                id="comentario"
                className="w-full p-2 bg-white rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                placeholder="Escribe un comentario..."
              ></textarea>
              <button
                type="submit"
                className="p-2 ml-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:ring-blue-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-send"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="flex w-full  ">
          <div className="bg-gray-300 p-3 rounded-b-lg flex gap-3">
            <button onClick={handleLike} className="text-lg">
              {isLiking ? (
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                      stroke="#000000"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                      stroke="#000000"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M2.68936 6.70456C2.52619 6.32384 2.08528 6.14747 1.70456 6.31064C1.32384 6.47381 1.14747 6.91472 1.31064 7.29544L2.68936 6.70456ZM15.5872 13.3287L15.3125 12.6308L15.5872 13.3287ZM9.04145 13.7377C9.26736 13.3906 9.16904 12.926 8.82185 12.7001C8.47466 12.4742 8.01008 12.5725 7.78417 12.9197L9.04145 13.7377ZM6.37136 15.091C6.14545 15.4381 6.24377 15.9027 6.59096 16.1286C6.93815 16.3545 7.40273 16.2562 7.62864 15.909L6.37136 15.091ZM22.6894 7.29544C22.8525 6.91472 22.6762 6.47381 22.2954 6.31064C21.9147 6.14747 21.4738 6.32384 21.3106 6.70456L22.6894 7.29544ZM19 11.1288L18.4867 10.582V10.582L19 11.1288ZM19.9697 13.1592C20.2626 13.4521 20.7374 13.4521 21.0303 13.1592C21.3232 12.8663 21.3232 12.3914 21.0303 12.0985L19.9697 13.1592ZM11.25 16.5C11.25 16.9142 11.5858 17.25 12 17.25C12.4142 17.25 12.75 16.9142 12.75 16.5H11.25ZM16.3714 15.909C16.5973 16.2562 17.0619 16.3545 17.409 16.1286C17.7562 15.9027 17.8545 15.4381 17.6286 15.091L16.3714 15.909ZM5.53033 11.6592C5.82322 11.3663 5.82322 10.8914 5.53033 10.5985C5.23744 10.3056 4.76256 10.3056 4.46967 10.5985L5.53033 11.6592ZM2.96967 12.0985C2.67678 12.3914 2.67678 12.8663 2.96967 13.1592C3.26256 13.4521 3.73744 13.4521 4.03033 13.1592L2.96967 12.0985ZM12 13.25C8.77611 13.25 6.46133 11.6446 4.9246 9.98966C4.15645 9.16243 3.59325 8.33284 3.22259 7.71014C3.03769 7.3995 2.90187 7.14232 2.8134 6.96537C2.76919 6.87696 2.73689 6.80875 2.71627 6.76411C2.70597 6.7418 2.69859 6.7254 2.69411 6.71533C2.69187 6.7103 2.69036 6.70684 2.68957 6.70503C2.68917 6.70413 2.68896 6.70363 2.68892 6.70355C2.68891 6.70351 2.68893 6.70357 2.68901 6.70374C2.68904 6.70382 2.68913 6.70403 2.68915 6.70407C2.68925 6.7043 2.68936 6.70456 2 7C1.31064 7.29544 1.31077 7.29575 1.31092 7.29609C1.31098 7.29624 1.31114 7.2966 1.31127 7.2969C1.31152 7.29749 1.31183 7.2982 1.31218 7.299C1.31287 7.30062 1.31376 7.30266 1.31483 7.30512C1.31698 7.31003 1.31988 7.31662 1.32353 7.32483C1.33083 7.34125 1.34115 7.36415 1.35453 7.39311C1.38127 7.45102 1.42026 7.5332 1.47176 7.63619C1.57469 7.84206 1.72794 8.13175 1.93366 8.47736C2.34425 9.16716 2.96855 10.0876 3.8254 11.0103C5.53867 12.8554 8.22389 14.75 12 14.75V13.25ZM15.3125 12.6308C14.3421 13.0128 13.2417 13.25 12 13.25V14.75C13.4382 14.75 14.7246 14.4742 15.8619 14.0266L15.3125 12.6308ZM7.78417 12.9197L6.37136 15.091L7.62864 15.909L9.04145 13.7377L7.78417 12.9197ZM22 7C21.3106 6.70456 21.3107 6.70441 21.3108 6.70427C21.3108 6.70423 21.3108 6.7041 21.3109 6.70402C21.3109 6.70388 21.311 6.70376 21.311 6.70368C21.3111 6.70352 21.3111 6.70349 21.3111 6.7036C21.311 6.7038 21.3107 6.70452 21.3101 6.70576C21.309 6.70823 21.307 6.71275 21.3041 6.71924C21.2983 6.73223 21.2889 6.75309 21.2758 6.78125C21.2495 6.83757 21.2086 6.92295 21.1526 7.03267C21.0406 7.25227 20.869 7.56831 20.6354 7.9432C20.1669 8.69516 19.4563 9.67197 18.4867 10.582L19.5133 11.6757C20.6023 10.6535 21.3917 9.56587 21.9085 8.73646C22.1676 8.32068 22.36 7.9668 22.4889 7.71415C22.5533 7.58775 22.602 7.48643 22.6353 7.41507C22.6519 7.37939 22.6647 7.35118 22.6737 7.33104C22.6782 7.32097 22.6818 7.31292 22.6844 7.30696C22.6857 7.30398 22.6867 7.30153 22.6876 7.2996C22.688 7.29864 22.6883 7.29781 22.6886 7.29712C22.6888 7.29677 22.6889 7.29646 22.689 7.29618C22.6891 7.29604 22.6892 7.29585 22.6892 7.29578C22.6893 7.29561 22.6894 7.29544 22 7ZM18.4867 10.582C17.6277 11.3882 16.5739 12.1343 15.3125 12.6308L15.8619 14.0266C17.3355 13.4466 18.5466 12.583 19.5133 11.6757L18.4867 10.582ZM18.4697 11.6592L19.9697 13.1592L21.0303 12.0985L19.5303 10.5985L18.4697 11.6592ZM11.25 14V16.5H12.75V14H11.25ZM14.9586 13.7377L16.3714 15.909L17.6286 15.091L16.2158 12.9197L14.9586 13.7377ZM4.46967 10.5985L2.96967 12.0985L4.03033 13.1592L5.53033 11.6592L4.46967 10.5985Z"
                      fill="#000000"
                    />
                  </g>
                </svg>
              )}
            </button>
    
          </div>
        </div>
      </div>
    </>
  );
};
