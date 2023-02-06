import { useRef } from "react";

export const useFileViewer = (file: File) => {
  const fileRef = useRef<FileReader["result"]>();
  const reader = new FileReader();

  reader.readAsArrayBuffer(file.slice(0, 8));
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    fileRef.current = reader.result;
    const uint8Arr = new Uint8Array(fileRef )
  };
};
