import axios from "axios";
import getBlobDuration from "get-blob-duration";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyMzQyYjZmLTc5MmYtNGIxMy1hZDAzLTYyYjUxNTg4NjBmOCIsInJvbGUiOjEsImVtYWlsIjoiaGFuYWZlZTQxNEBnbWFpbC5jb20iLCJpc190dXRvciI6ZmFsc2UsInR5cGUiOjIsImlhdCI6MTU4MTU2ODIzMSwiZXhwIjoxNTgyODY0MjMxfQ.i_Qvh_VLAKIEqWveFlyZucQ1RahvDV8739rpYSx-jBzdC32r8s_JwrZ5b-PrqwCMCrOrG25Zpk-JODEDoDb_JI2BKDdoFyzJSQSH_70vOjUVOOm5Oa_oLk0ObrXCJqXoYrzT9B6crrQnN2lKmIzhBD8ZnLGByqEmUeYz2je5KNM";

export const imageUploadFlow = async (
  file,
  onUploadProgress,
  signal,
  callback
) => {
  console.log("go uploadFiles");
  let formData = new FormData();
  formData.append("file", file);
  formData.append("type", "file");
  formData.append("type_file", file.type);
  try {
    const res = await axios.post(
      "http://192.168.1.58:3000/api/v2/media",
      formData,
      {
        cancelToken: signal.token,
        onUploadProgress,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest"
        }
      }
    );
    const { result, code } = res.data;
    console.log("data :: ", result, "code ", code);
    callback({ result, code });
  } catch (error) {
    console.log("Error :: ", error);
    callback({
      code: 500,
      result: error
    });
  }
};

export const videoUploadFlow = async (file, signal, callback) => {
  console.log(file);
  let formData = new FormData();
  formData.append("title", file.name);
  formData.append("type", file.type.split("/")[0]);
  formData.append("type_file", file.type);
  try {
    const res = await axios.post(
      "http://192.168.1.58:3000/api/v2/media",
      formData,
      {
        cancelToken: signal.token,
        onUploadProgress: function(progressEvent) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          // console.log(`progressEvent : index == ${index}`, percentCompleted);
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest"
        }
      }
    );
    const { result, code } = res.data;
    console.log("data :: ", result, "code ", code);
    callback({ result, code });
  } catch (error) {
    console.log("Error :: ", error);
    callback({
      code: 500,
      result: error
    });
  }
  return;
};

export const uploadToCipher = (
  data,
  file,
  signal,
  onUploadProgress,
  callback
) => {
  console.log("go uploadToCipher");
  console.log(data);
  console.log("file ==> ", file);
  const credential = data["x-amz-credential"];
  const signature = data["x-amz-signature"];
  const algorithm = data["x-amz-algorithm"];
  const date = data["x-amz-date"];
  const urlUpload = data["uploadLink"];
  const policy = data["policy"];
  const key = data["key"];

  let formfile = new FormData();
  formfile.append("x-amz-credential", credential);
  formfile.append("x-amz-algorithm", algorithm);
  formfile.append("x-amz-date ", date);
  formfile.append("x-amz-signature", signature);
  formfile.append("key", key);
  formfile.append("policy", policy);
  formfile.append("success_action_status", 201);
  formfile.append("success_action_redirect", "");
  formfile.append("file", file);

  axios
    .post(urlUpload, formfile, {
      cancelToken: signal.token,
      onUploadProgress,
      headers: { "X-Requested-With": "XMLHttpRequest" }
    })
    .then(res => {
      callback(res);
      console.log(res);
    })
    .catch(err => {
      callback(err);
      console.log(err);
    });
};

export const checkStatus = (id, signal, callback) => {
  console.log("id ==> ", id);
  axios
    .post(
      "http://192.168.1.58:3000/api/v2/media/update",
      { video_id: id },
      {
        cancelToken: signal.token,
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Requested-With": "XMLHttpRequest"
        }
      }
    )
    .then(res => {
      callback(res);
    })
    .catch(err => {
      callback(err);
    });
};
