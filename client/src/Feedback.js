import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Layout from "./Layout/Layout";

const Feedback = () => {
  const [values, setvalues] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    uploadedFiles: [],
    buttonText: "Submit",
    uploadPhotoButtonText: "Upload Files",
  });

  const {
    name,
    email,
    message,
    phone,
    uploadedFiles,
    buttonText,
    uploadPhotoButtonText,
  } = values;

  const {
    REACT_APP_API,
    REACT_APP_CLOUDINARY_CLOUD_NAME,
    REACT_APP_CLOUNDINARY_UPLOAD_SECRET,
  } = process.env;

  const handleChange = (name) => (event) => {
    setvalues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setvalues({ ...values, buttonText: "...sending" });
    // //backend
    // console.table({ name, email, phone, message, uploadedFiles });
    axios({
      method: "POST",
      url: `${REACT_APP_API}/feedback`,
      data: { name, email, phone, message, uploadedFiles },
    })
      .then((response) => {
        //console.log("Feedback submit ", response);
        if (!response.data.success) {
          toast.success("Thanks for your respanse");
        }
        setvalues({
          ...values,
          name: "",
          phone: "",
          email: "",
          message: "",
          uploadedFiles: [],
          buttonText: "Submitted",
          uploadPhotoButtonText: "Uploaded",
        });
      })
      .catch((error) => {
        //console.log("wrong feedback");
        if (error.response.data.error) toast.success("Failed ! Try again");
      });
  };

  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: REACT_APP_CLOUNDINARY_UPLOAD_SECRET,
        tags: ["ebooks"],
      },
      function (error, result) {
        // console.log(result);
        setvalues({
          ...values,
          uploadedFiles: result,
          uploadPhotoButtonText: `${
            result ? result.length : 0
          } Images uploaded`,
        });
      }
    );
  };

  const feebackForm = () => (
    <React.Fragment>
      <div className='form-group'>
        <button
          onClick={() => uploadWidget()}
          className='btn btn-outline-secondary btn-block p-5'
        >
          {uploadPhotoButtonText}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label className='text-muted'>Desciption</label>
          <textarea
            onChange={handleChange("message")}
            type='text'
            className='form-control'
            value={message}
            required
          ></textarea>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Your name</label>
          <input
            className='form-control'
            type='text'
            onChange={handleChange("name")}
            value={name}
            required
          ></input>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Your email</label>
          <input
            className='form-control'
            type='text'
            onChange={handleChange("email")}
            value={email}
            required
          ></input>
        </div>
        <div className='form-group'>
          <label className='text-muted'>Your phone number</label>
          <input
            className='form-control'
            type='number'
            onChange={handleChange("phone")}
            value={phone}
            required
          ></input>
        </div>
        <button className='btn btn-lg btn-outline-primary btn-block'>
          {buttonText}
        </button>
      </form>
    </React.Fragment>
  );

  return (
    <Layout>
      <ToastContainer />
      <div className='container text-centre'>
        <h1 className='p-5'>Feedback Online</h1>
      </div>
      <div className='container col=md-8 offset-md-2'>{feebackForm()}</div>
      <br /> <br /> <br />
    </Layout>
  );
};

export default Feedback;
