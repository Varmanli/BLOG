"use client";

import { readAllImages } from "@/app/actions/file";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface Props {
  children: ReactNode;
}

interface InitialImageContext {
  images: string[];
  updateImages(images: string[]): void;
  removeOldImage(src: string): void;
}

const Context = createContext<InitialImageContext | null>(null);

const ImageProvider: FC<Props> = ({ children }) => {
  const [images, setImages] = useState<string[]>([]);

  const updateImages = (data: string[]) => {
    setImages([...data, ...images]);
  };

  const removeOldImage = (src: string) => {
    setImages((old) => old.filter((img) => src !== img));
  };

  useEffect(() => {
    readAllImages().then(setImages);
  }, []);

  return (
    <Context.Provider value={{ images, updateImages, removeOldImage }}>
      {children}
    </Context.Provider>
  );
};

export const useImages = () => useContext(Context);

export default ImageProvider;
