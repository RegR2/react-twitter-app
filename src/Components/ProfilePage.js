import React from "react";
import { TextField, Button } from "@mui/material";
import { useState, useContext, useEffect } from "react";
import { InputAdornment } from "@mui/material";
import { AppContext } from "../Context/AppContext";
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";

function ProfilePage(props) {
  const { setUserName, userName, user } = useContext(AppContext);
  const [nameState, setNameState] = useState(userName);
  const [path, setPath] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    retrieveImg();
  }, [path]);

  const handleChange = (e) => {
    setNameState(e.target.value);
    e.preventDefault();
  };

  const handleClick = (e) => {
    e.preventDefault();
    setUserName(nameState);
    setNameState("");
  };

  const handleImgChange = (e) => {
    e.preventDefault();
    setImage(e.target.files[0]);
    handleImgUpload(image);
  };

  const handleImgUpload = (image) => {
    const storage = getStorage();
    const uploadImage = ref(storage, `userImage/${user.uid}`);
    const upload = uploadBytes(uploadImage, image);

    upload.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        const downloadURL = getDownloadURL(upload.snapshot.ref);
        downloadURL && setPath(downloadURL);
      }
    );
  };

  const retrieveImg = async () => {
    try {
      const storage = getStorage();
      const url = await getDownloadURL(ref(storage, `userImage/${user.uid}`));
      url && setPath(url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <h1>Pick Yourself A Groovy Username</h1>
        <TextField
          fullWidth
          id="outlined-name"
          placeholder="Choose your user name"
          value={nameState}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  onClick={handleClick}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignSelf: "center",
                    width: "60px",
                  }}
                >
                  Save
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div
        style={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <h1>Show Us Your Best You</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={path} />
          <input
            accept="image"
            style={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center",
            }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleImgChange}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              onClick={handleImgUpload}
              style={{
                display: "flex",
                justifyContent: "center",
                alignSelf: "center",
                width: "70ipx",
              }}
            >
              Upload
            </Button>
          </label>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
