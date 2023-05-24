
export const uploadNft = async (selectedImage,collectionId) => {
    const data = new FormData();
    data.append("file", selectedImage);
    const res = await fetch(
      `https://nftdepot-api.azurewebsites.net/collections/${collectionId}/upload_nft_zip`,
      {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        maxRedirects: 0,
      }
    );
    const resKey = await res.json();
    return resKey;
  };
  