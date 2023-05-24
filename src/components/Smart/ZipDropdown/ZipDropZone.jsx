import { useEffect } from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useDropzone } from "react-dropzone";
import Zip_Icon from "../../../images/zip_icon.jpeg";
import "./ZipDropZone.scss";


// import UploadBtn from "../../../images/upload-icon.svg";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const ZipDropZone = ({
  setSelectedImage,
  selectedImage,
  imageType,
  imgSrc=selectedImage?.length && Zip_Icon,
  isUploading,
}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/zip": [".zip"],
    },
    onDrop: (acceptedFiles) =>
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
  });
  const constantData = imageType === "small" ? 
  {
    heading: "Small Image",
  }
  : imageType === "large" ?
  {
    heading: "Large Image",
  }
  : imageType === "banner" ?
  {
    heading: "Upload Banner Image",
  }
  : imageType === "zip" ?
  {
    heading: "Upload Zip File",
  }
  :null;
  
  const { heading } = constantData;
  const dropzoneOptions =
    selectedImage?.length || imgSrc
      ? "Uploadoptions hideOptions"
      : "Uploadoptions";

  useEffect(() => {
    if (acceptedFiles && acceptedFiles?.length) {
      setSelectedImage(acceptedFiles);
    }
  }, [acceptedFiles]);
  return (
    <section className="dropzone-style">
      {selectedImage && selectedImage.length ? (
        <div className="UploadedImg">
          {isUploading ? (
            <Spin indicator={antIcon} />
          ) : (
            <>
              <div
                className="blurBg"
                style={{ backgroundImage: `url(${selectedImage[0]?.preview})` }}
              />
              <img src={selectedImage?.length && Zip_Icon} alt={'zip_folder'} />
            </>
          )}
        </div>
      ) : selectedImage?.length && Zip_Icon ? (
        <div className="UploadedImg">
          <div
            className="blurBg"
            style={{ backgroundImage: `url(${selectedImage?.length && Zip_Icon})` }}
          />
          <img src={selectedImage?.length && Zip_Icon} alt={'zip_folder'} />
        </div>
      ) : (
        ""
      )}
      <div {...getRootProps()} style={{width:'100%',height:'100%',zIndex:'999',cursor:'pointer'}}>
      <div style={{ zIndex: "550",width:'100%',height:'100%' }} className={dropzoneOptions}>
        {/* <img src={UploadBtn} className="" /> */}
        <p className="heading">
          {heading}
        </p>
        
          <input {...getInputProps()} />
          {/* <Button className="browse-btn">{button}</Button> */}
          {
               <p className="desc">Drag n drop or choose file</p>
          }
        </div>
      </div>
    </section>
  );
};

export default ZipDropZone;
