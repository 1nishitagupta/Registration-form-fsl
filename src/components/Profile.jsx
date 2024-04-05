import React, { useEffect, useState } from "react";
import { User } from "../Constant";


function Profile() {
  const keyData = Object.keys(User);
  const valueData = Object.values(User);
  const [editable, setEditable] = useState(false);
  const [personalDetailValues, setPersonalDetailValues] = useState(
    valueData.slice(0, 6)
  );
  const [additionalDetailValues, setAdditionalDetailValues] = useState(
    valueData.slice(6, 13)
  );
  const [instagramLink, setInstagramLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [resume, setResume] = useState();
  const [image, setImage] = useState("");

  function handleChangeImage(e) {
    if (e.target.files.length !== 0) {
      setResume(e?.target?.files[0]);
    }
  }
  console.log(additionalDetailValues, User, "15");
  console.log(resume, image, "34");
  function changeFormat(value) {
    if (typeof value === "string") {
      const formattedText = value.replace(/([a-z])([A-Z])/g, "$1 $2");
      return formattedText.charAt(0).toUpperCase() + formattedText.slice(1);
      // return formattedText
    } else {
      return value;
    }
  }
  const handleChange = (e, index, type) => {
    const newValue = e.target.value;
    if (type === "personal") {
      setPersonalDetailValues((prevVal) => {
        return prevVal.map((item, editIndex) => {
          return editIndex === index ? newValue : item;
        });
      });
      // setAdditionalDetailValues((preVal) => {
      //   console.log(preVal, "p");
      //   return preVal.map((item, editIndex) => {
      //     console.log(index, editIndex, "39");
      //     editIndex === index ? { ...item, item: e.target.value } : item;
      //   });
      // });
      // console.log(newValue, "surbhi");
    } else if (type === "additional") {
      setAdditionalDetailValues((prevVal) => {
        return prevVal.map((item, editIndex) => {
          return editIndex === index ? newValue : item;
        });
      });
      // console.log(item);
    }
  };
  console.log(personalDetailValues);
  console.log(image, "61");
  console.log(editable);
  const handleEdit = () => {
    setEditable(!editable);
  };

  const personalDetailKeys = keyData.slice(0, 6);
  const additionalDetailKeys = keyData.slice(6, 13);
  useEffect(() => {
    if (resume) {
      console.log("first");
      setImage(URL?.createObjectURL(resume));
    }
  }, [resume]);
  return (
    <>
      <div className="bg-gray-200">
        <div className="lg:w-[85%] sm:w-[85%] md:w-auto mx-auto py-4 rounded">
          <div className="bg-[#bf6d4fcc] flex justify-center ">
            <div className="py-3 px-[3rem] flex flex-col items-center">
              <img
                className="w-28 h-28 rounded-full bg-gray-500 shadow-lg shadow-gray-500/50"
                src="./img.webp"
                alt="image"
              />
              <h1 className="text-white text-2xl font-semibold ">Profile</h1>
            </div>
            <div className=" heading text-white m-auto font-semibold text-2xl pl-[3rem]">
              <h1 className="drop-shadow-2xl">Full Stack development</h1>
              <h5>fullstacklearning@.com</h5>
            </div>
          </div>

          <div className="bg-gray-100 pb-8">
            {/* <div className=" grid grid-cols-2    mx-auto justify-between font-bold text-3xl py-5 pl-2 ">
              <h1>Personal Details</h1>
              <h1>Additional Details</h1>
            </div> */}
            <div className=" flex flex-col md:flex-row gap-2   items-center md:items-stretch md:justify-between md:px-[3rem] mx-auto pl-2">
              <div className="flex flex-col">
                <h1 className="font-bold text-3xl py-5  ">Personal Details</h1>
                <div className="flex gap-2 ">
                  <div className=" flex flex-col gap-2  font-semibold  ">
                    {personalDetailKeys.map((userData, index) => (
                      <div className="py-1" key={index}>
                        {changeFormat(userData)}:
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 ">
                    {personalDetailValues.map((userData, index) => (
                      <div className="personal-detail" key={index}>
                        <input
                          className="pl-2 py-1"
                          type="text"
                          value={changeFormat(userData)}
                          readOnly={!editable}
                          onChange={(e) => handleChange(e, index, "personal")}
                          // onBlur={() => {
                          //   setEditable(false);
                          // }}
                          // onClick={() => {
                          //   setEditable(true);
                          // }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:mt-0 mt-[1rem]">
                <h1 className="font-bold text-3xl py-5 ">Additional Details</h1>
                <div className="flex gap-2 ">
                  <div className=" flex flex-col gap-2  font-semibold  ">
                    {additionalDetailKeys.map((userData, index) => (
                      <div className="py-1" key={index}>
                        {changeFormat(userData)}:
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 ">
                    {additionalDetailValues.map((userData, index) => (
                      <div className="personal-detail" key={index}>
                        <input
                          className="pl-2 py-1"
                          type="text"
                          value={changeFormat(userData)}
                          readOnly={!editable}
                          onChange={(e) => handleChange(e, index, "additional")}
                          // onDoubleClick={() => {
                          //   setEditable(true);
                          // }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-5 px-[3rem]">
              <h2 className="font-bold text-2xl my-5">Social Media Links</h2>
              <div className="flex justify-between">
                <div className="flex gap-5">
                  <label htmlFor="" className="font-medium">
                    Linkedian
                  </label>
                  <input
                    className=""
                    type="text"
                    value={linkedinLink}
                    readOnly={!editable}
                    onChange={(e) => setLinkedinLink(e.target.value)}
                  />
                </div>
                <div className="flex gap-5">
                  <label htmlFor="" className="font-medium">
                    Github
                  </label>
                  <input
                    className=""
                    type="text"
                    value={githubLink}
                    readOnly={!editable}
                    onChange={(e) => setGithubLink(e.target.value)}
                  />
                </div>
                <div className="flex gap-5">
                  <label htmlFor="" className="font-medium">
                    Instagram
                  </label>
                  <input
                    className=""
                    type="text"
                    value={instagramLink}
                    readOnly={!editable}
                    onChange={(e) => setInstagramLink(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-[3rem] mb-5 px-[3rem]">
              <h2 className="font-bold text-2xl my-5">Upload Resume</h2>

              <input
                type="file"
                onChange={handleChangeImage}
                disabled={!editable}
              />
              {image && (
                <img
                  // type="image"
                  className="w-[10rem] h-[10rem]"
                  src={image}
                />
              )}
            </div>
            <div className="flex justify-center mt-[1rem]">
              <button
                onClick={handleEdit}
                className=" text-white rounded-2xl py-1 px-5 bg-gradient-to-r from-[#bf6d4fcc] to-red-400"
              >
                {editable} Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
