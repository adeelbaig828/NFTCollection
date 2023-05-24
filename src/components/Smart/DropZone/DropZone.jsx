import { useEffect } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useDropzone } from 'react-dropzone';
import './DropZone.scss';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const DropZone = ({ setSelectedImage, selectedImage, imageType, imgSrc, isUploading }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png', '.jpg', '.jpeg', '.gif'],
    },
    onDrop: (acceptedFiles) =>
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
  });
  const constantData =
    imageType === 'small'
      ? {
          heading: 'Small Image',
        }
      : imageType === 'large'
      ? {
          heading: 'Large Image',
        }
      : imageType === 'banner'
      ? {
          heading: 'Banner Image',
        }
      : imageType === 'zip'
      ? {
          heading: 'Upload Zip File',
        }
      : imageType == 'profile'
      ? {
          heading: 'Profile Image',
        }
      : null;

  const { heading } = constantData;
  const dropzoneOptions =
    selectedImage?.length || imgSrc ? 'Uploadoptions hideOptions' : 'Uploadoptions';

  useEffect(() => {
    if (acceptedFiles && acceptedFiles?.length) {
      setSelectedImage(acceptedFiles);
    }
  }, [acceptedFiles]);
  return (
    <section className='dropzone-style'>
      {/* {selectedImage && (
        <>
          <div
            className={imageType == "profile" ? "" : "blurBg"}
            style={
              imageType == "profile"
                ? {}
                : { backgroundImage: `url(${selectedImage})` }
            }
          />
          <img src={selectedImage} alt={"not found"} />
        </>
      )} */}
      {selectedImage && selectedImage.length ? (
        <div className='UploadedImg'>
          {isUploading ? (
            <Spin indicator={antIcon} />
          ) : (
            <>
              <div
                className={imageType == 'profile' ? '' : 'blurBg'}
                style={
                  imageType == 'profile' ? {} : {}
                  // : { backgroundImage: `url(${selectedImage[0]?.preview})` }
                }
              />
              <img src={selectedImage[0].preview} alt={'not found'} />
            </>
          )}
        </div>
      ) : imgSrc ? (
        <div className='UploadedImg'>
          <div
            className={imageType == 'profile' ? '' : 'blurBg'}
            style={imageType == 'profile' ? {} : { backgroundImage: `url(${imgSrc})` }}
          />
          <img src={imgSrc} alt={'not found'} />
        </div>
      ) : (
        ''
      )}
      <div
        {...getRootProps()}
        style={{
          width: '100%',
          height: '100%',
          zIndex: '999',
          cursor: 'pointer',
        }}
      >
        <div style={{ zIndex: '550', width: '100%', height: '100%' }} className={dropzoneOptions}>
          {/* <img src={UploadBtn} className="" /> */}
          <p className='heading'>{heading}</p>

          <input {...getInputProps()} />
          {/* <Button className="browse-btn">{button}</Button> */}
          {<p className='desc'>Drag n drop or choose file</p>}
        </div>
      </div>
    </section>
  );
};

export default DropZone;
