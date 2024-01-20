import React, {
  CSSProperties,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { BoxButton } from "../boxButton";
import yuuki from "../../../assets/images/yuuki.jpeg";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export function ImageUploader({
  image,
  setImage,
  style,
  className,
}: {
  image: File | null;
  setImage: Dispatch<SetStateAction<File | null>>;
  style?: CSSProperties;
  className?: string;
}) {
  const [stringImage, setStringImage] = useState<string>(yuuki);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setStringImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <BoxButton
      style={{ ...styles.imageUploaderButton, ...style }}
      className={`${className}`}
      onClick={() => {
        fileInputRef.current?.click();
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MdOutlineAddPhotoAlternate size={16} color={"grey"} />
        <p style={{ fontSize: 12, marginTop: 3, marginLeft: 4 }}>
          Upload Image
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <img
          src={stringImage}
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
    </BoxButton>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  imageUploaderButton: {
    position: "relative",
    flexDirection: "row",
    backgroundColor: "var(--primary)",
    border: "1px grey dashed",
    borderRadius: 12,
    padding: 32,
    width: "100%",
    maxWidth: 500,
    height: 300,
  },
};
