import React, {
  CSSProperties,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { BoxButton } from "../boxButton";
import yuuki from "../../../assets/images/cat.jpeg";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Col } from "../col";

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

  useEffect(() => {
    const loadImageAsFile = async () => {
      // Import the image from the assets folder
      const response = await fetch(yuuki);
      const blob = await response.blob();

      // Create a File object
      const file = new File([blob], "myImage.jpg", { type: "image/jpeg" });

      setImage(file);
    };

    loadImageAsFile();
  }, []);

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
      <Col
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          flexDirection: "row",
        }}
      >
        <MdOutlineAddPhotoAlternate size={16} color={"grey"} />
        <p style={{ fontSize: 12, marginTop: 3, marginLeft: 4 }}>
          Upload Image
        </p>
      </Col>
      <Col
        style={{
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <img
          src={stringImage}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </Col>
    </BoxButton>
  );
}

interface StyleSheet {
  [key: string]: React.CSSProperties;
}

const styles: StyleSheet = {
  imageUploaderButton: {
    display: "flex",
    position: "relative",
    flexDirection: "row",
    backgroundColor: "var(--primary)",
    border: "1px grey dashed",
    borderRadius: "var(--borderRadius)",
    padding: 32,
    width: "100%",
    height: 300,
  },
};
