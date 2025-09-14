"use client";
import { FC, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FileUploader } from "react-drag-drop-files";
import { removeImage, uploadFile } from "@/app/actions/file";
import { useImages } from "../context/ImageProvider";
import GalleryImage from "../GalleryImage";

interface Props {
  visible: boolean;
  onClose(state: boolean): void;
  onSelect?(src: string): void;
}

const ImageGallery: FC<Props> = ({ visible, onSelect, onClose }) => {
  const [isUploading, setIsUploading] = useState(false);
  const image = useImages();
  const images = image?.images;
  const updateImages = image?.updateImages;
  const removeOldImage = image?.removeOldImage;

  const handleClose = () => {
    onClose(!visible);
  };

  const handleSelection = (image: string) => {
    onSelect && onSelect(image);
    handleClose();
  };

  if (!visible) return null;

  return (
    <div
      tabIndex={-1}
      onKeyDown={({ key }) => {
        if (key === "Escape") handleClose();
      }}
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="relative md:w-[760px] w-[80%] h-[80%] bg-white rounded-md p-4 overflow-y-auto">
        <div className="absolute right-4 top-4 p-2 z-50">
          <button onClick={handleClose}>
            <IoMdClose size={24} />
          </button>
        </div>
        <FileUploader
          handleChange={async (file: File | File[]) => {
            setIsUploading(true);
            try {
              const files = Array.isArray(file) ? file : [file];
              for (const f of files) {
                const formData = new FormData();
                formData.append("file", f);
                const res = await uploadFile(formData);
                if (res && updateImages) {
                  updateImages([res.secure_url]);
                }
              }
            } catch (error) {
              console.log(error);
            }
            setIsUploading(false);
          }}
          name="file"
          types={["png", "jpg", "jpeg", "webp"]}
        />

        {!images?.length ? (
          <p className="p-4 text-center text-2xl font-semibold opacity-45">
            No Images to Render...
          </p>
        ) : null}

        <div className="grid gap-4 md:grid-cols-4 grid-cols-2 mt-4">
          {isUploading && (
            <div className="w-full aspect-square rounded animate-pulse bg-gray-200"></div>
          )}
          {images?.map((item) => {
            return (
              <GalleryImage
                key={item}
                onSelectClick={() => handleSelection(item)}
                onDeleteClick={async () => {
                  if (confirm("Are you sure?")) {
                    const id = item
                      .split("/")
                      .slice(-2)
                      .join("/")
                      .split(".")[0];
                    await removeImage(id);
                    if (removeOldImage) {
                      removeOldImage(item);
                    }
                  }
                }}
                src={item}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
