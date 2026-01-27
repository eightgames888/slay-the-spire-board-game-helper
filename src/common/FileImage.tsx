import { useState, useEffect, type FC, type ImgHTMLAttributes } from "react";

interface IFileImage extends ImgHTMLAttributes<HTMLImageElement> {
  file: File;
}

export const FileImage: FC<IFileImage> = ({ file, ...props }) => {
  const [src, setSrc] = useState<string>();
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file);
    setSrc(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  return src ? <img src={src} {...props} /> : null;
};
