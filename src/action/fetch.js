import axios from "axios";
import getBlobDuration from "get-blob-duration";

export const uploadFiles = data => {
  console.log("go uploadFiles");
  let formfile = new FormData();
  data.map(async (file, index) => {
    let duration = await getBlobDuration(file.preview);
    console.log("title => ", file.name);
    formfile.append("file", file);
    // formfile.append("title", file.name);
    // formfile.append("type_file", file.type);
    // formfile.append("duration", parseInt(duration));
    // formfile.append("tage", " ");
    axios
      .post("http://192.168.1.54:9001/testprogress", formfile, {
        onUploadProgress: function(progressEvent) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`progressEvent : index == ${index}`, percentCompleted);
        },
        headers: { "X-Requested-With": "XMLHttpRequest" }
      })
      .then(res => {
        console.log(res);
        // uploadToCipher(res.data.result[0].clientPayload, file, index);
      })
      .catch(err => {
        console.log(err);
      });
  });
};

const uploadToCipher = (data, file, index) => {
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
      onUploadProgress: function(progressEvent) {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`progressEvent : index == ${index}`, percentCompleted);
      },
      headers: { "X-Requested-With": "XMLHttpRequest" }
    })
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};
