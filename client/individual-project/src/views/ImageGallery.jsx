import React, { useState, useEffect } from "react";
import cocUrl from "../utils/axios";
import { useNavigate } from "react-router-dom";

function ImageGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await cocUrl.get("/get-image", {
          headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
        });
        setImages(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Gagal mengambil gambar:", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleImageChange = (event) => {
    setSelectedImages(Array.from(event.target.files));
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      selectedImages.forEach((image) => formData.append("images", image));
      const response = await cocUrl.patch("/add-images", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      console.log("Gambar berhasil diunggah:", response.data);
      setImages([...images, ...response.data]);
      setSelectedImages([]);
    } catch (error) {
      console.log("Gagal mengunggah gambar:", error);
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      await cocUrl.delete(`/delete-image/${imageId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` },
      });
      setImages(images.filter((image) => image.id !== imageId));
    } catch (error) {
      console.log("Gagal menghapus gambar:", error);
    }
  };

  return (
    <div>
      <h2>Image Gallery</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          {images.map((image) => (
            <div key={image.id} className="col-md-4 mb-4">
              <div className="card">
                <img src={image.imgUrl} className="card-img-top" alt={`Image ${image.id}`} />
                <div className="card-body">
                  <button onClick={() => handleImageDelete(image.id)} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <h2>Add Images</h2>
      <input type="file" multiple onChange={handleImageChange} />
      <button onClick={handleImageUpload} className="btn btn-primary mt-2">
        Upload Image
      </button>
    </div>
  );
}

export default ImageGallery;
