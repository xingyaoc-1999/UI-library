import { fileJudgement } from "../components/upload/utils/fileJudgement";

export const fileViewer = async (file: File) => {
  const type = await fileJudgement(file);
  if (type === "png") {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
    });
  }
};
