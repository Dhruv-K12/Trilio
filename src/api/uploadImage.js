export const uploadImage = async (uri) => {
  const data = new FormData();
  data.append("file", {
    uri,
    type: "image/jpeg",
    name: "photo.jpg",
  });
  data.append("upload_preset", "Images");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dv5ibj6k9/image/upload",
    {
      method: "POST",
      body: data,
    }
  );

  const json = await res.json();
  return json.url;
};
