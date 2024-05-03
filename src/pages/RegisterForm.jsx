import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import HeadingBox from "../components/HeadingBox";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ForwardedTextInput from "../components/StyledTextfield";
import {
  analyticsOptions,
  coursesData,
  educationOptions,
  genderOptions,
} from "../Constant";
import ConfirmationModal from "../components/Modal";
import ControlledRadioButtonsGroup from "../components/StyledRadioBtn";
import InputFile from "../components/InputFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StyledButton from "../components/StyledButton";

const RegisterForm = () => {
  const [currentSection, setCurrentSection] = useState(1);
  const [formdata, setFormData] = useState([]);
  const [permanentAddress, setPermanentAddress] = useState(false);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState(false);
  const methods = useForm();
  const { handleSubmit, register, watch, formState, setValue, getValues } =
    methods;
  const errors = formState?.errors;
  const handleNextButton = (e) => {
    e.preventDefault();
    setCurrentSection(currentSection + 1);
  };
  const handlePrevButton = (e) => {
    e.preventDefault();
    setCurrentSection(currentSection - 1);
  };
  const getData = () => {
    fetch(`http://localhost:8080/studentsData`, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const handleData = handleSubmit((data) => {
    if (Object.keys(errors).length === 0 && currentSection < 4) {
      // If there are no errors, proceed to the next section
      setCurrentSection(currentSection + 1);
    }

    if (!confirmation && currentSection === 4) {
      alert("first agree to terms and conditions");
    }
    if (currentSection === 4 && confirmation) {
      const password = PasswordGenerator();
      data.password = password;

      setFormData(data);
      fetch(`http://localhost:8080/student/submit`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => console.log(res))
        .catch((err) => console.error("Error:", err));
    }
  });
  console.log(password);
  console.log(formdata, "58");
  const values = getValues();
  const handleAddress = () => {
    setPermanentAddress((prev) => !prev);
  };
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  console.log(watch(), "135");
  console.log(methods.watch(), "136");

  function PasswordGenerator() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let newPassword = "";
    const passwordLength = 10; // You can adjust the length of the password here

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newPassword += characters[randomIndex];
    }

    return newPassword;
  }

  useEffect(() => {
    if (permanentAddress === true) {
      setValue("permanentAddress", values?.localAddress);
    } else {
      setValue("permanentAddress", "");
    }
  }, [permanentAddress]);
  useEffect(() => {
    methods.setValue("eduDesignation", educationOptions[0].value);
    methods.setValue("analytics", analyticsOptions[0].value);
    // methods.setValue("gender" , )
  }, []);
  useEffect(() => {
    confirmation && setOpen(false);
  }, [open]);
  console.log(permanentAddress, "137");
  return (
    <FormProvider {...methods}>
      <Box
        sx={{
          // display: "flex",
          // justifyContent: "center",
          // flexDirection: "column",
          height: "fit-content",
          // padding: "10px",
        }}
      >
        <form onSubmit={handleSubmit(handleData)} noValidate>
          {currentSection === 1 && (
            <>
              <HeadingBox heading={"Personal Details"} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    // flexDirection: "column",
                    gap: "16px",
                    // border: "1px solid black",
                    padding: "10px",
                    margin: "0 30px",
                    flexWrap: "wrap",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      // justifyContent: "space-evenly",
                      // width: "100%",
                      gap: "4rem",
                      margin: "20px",
                    }}
                  >
                    <Box>
                      <ForwardedTextInput
                        label="Name"
                        type="text"
                        error={errors?.name ? true : false}
                        helperText={errors?.name?.message}
                        placeholder="name"
                        width="40rem"
                        isRequired
                        {...register("name", {
                          required: "Name is Required",
                        })}
                      />
                    </Box>
                    <Box>
                      <ForwardedTextInput
                        label="Email"
                        type="text"
                        error={errors?.email ? true : false}
                        helperText={errors?.email?.message}
                        placeholder="email"
                        width="40rem"
                        isRequired
                        {...register("email", {
                          required: "Email is Required",
                          validate: {
                            matchPatern: (value) =>
                              /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(
                                value
                              ) || "Email address must be a valid address",
                          },
                        })}
                      />
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", gap: "4rem" }}>
                    <Box>
                      <ForwardedTextInput
                        width="40rem"
                        label="Phone No"
                        type="number"
                        error={errors?.phoneNo ? true : false}
                        helperText={errors?.phoneNo?.message}
                        placeholder="phoneNo"
                        isRequired
                        {...register("phoneNo", {
                          required: "PhoneNo is Required",
                          validate: {
                            matchPatern: (value) =>
                              /^\d{10}$|^(\+\d{1,3}[- ]?)?\d{10}$/.test(
                                value
                              ) || "PhoneNo must be a valid number",
                          },
                        })}
                      />
                    </Box>
                    {/* <Box>
                <ControlledRadioButtonsGroup
                  label="Gender"
                  name="gender"
                  defaultValue=""
                  data={genderOptions}
                  isRequired={true}
                  rules={{ required: "Please select an option" }}
                />
                </Box> */}
                    <Box>
                      <ForwardedTextInput
                        width="40rem"
                        label="DOB"
                        type="date"
                        error={errors?.dob ? true : false}
                        helperText={errors?.dob?.message}
                        placeholder="dob"
                        isRequired
                        {...register("dob", {
                          required: "dob is Required",
                        })}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    marginRight: "4.4rem",
                  }}
                >
                  <Box sx={{ marginTop: "1rem" }}>
                    <ControlledRadioButtonsGroup
                      label="Gender"
                      name="gender"
                      defaultValue=""
                      data={genderOptions}
                      isRequired={true}
                      rules={{ required: "Please select an option" }}
                    />
                  </Box>

                  <InputFile />
                  <Button
                    sx={{ border: "1px solid black" }}
                    onClick={handleNextButton}
                  >
                    Next{" "}
                  </Button>
                  <Box
                    sx={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <StyledButton
                      label={"Save and next"}
                      onClick={handleData}
                      type={"submit"}
                    />
                  </Box>
                </Box>
                {/* </Box> */}
              </Box>
            </>
          )}
          {/* //Residental Detail */}
          {currentSection === 2 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
                gap: "10px",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              <HeadingBox
                onClick={handlePrevButton}
                prevIcon
                heading={"Parent / Guardian Details"}
              />
              <ForwardedTextInput
                label="Parent / Guardian / Spouse Name"
                type="text"
                error={errors?.parentName ? true : false}
                helperText={errors?.parentName?.message}
                placeholder="Parent / Guardian / Spouse Name"
                isRequired
                {...register("parentName", {
                  required: "parentName is Required",
                })}
              />
              <ForwardedTextInput
                label="Parent / Guardian / Spouse Phone number"
                type="number"
                error={errors?.parentNo ? true : false}
                helperText={errors?.parentNo?.message}
                placeholder="Parent / Guardian / Spouse Phone number"
                isRequired
                {...register("parentNo", {
                  required: "parentNo is Required",
                })}
              />

              <Button
                sx={{ border: "1px solid black" }}
                onClick={handleNextButton}
              >
                Next{" "}
              </Button>

              <StyledButton
                label={"Save and next"}
                onClick={handleData}
                type={"submit"}
              />
            </Box>
          )}
          {/* educational detail */}
          {currentSection === 3 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  gap: "10px",
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                <HeadingBox
                  onClick={handlePrevButton}
                  prevIcon
                  heading={"Residential Details"}
                />
                <ForwardedTextInput
                  label="Local Address"
                  type="text"
                  error={errors?.localAddress ? true : false}
                  helperText={errors?.localAddress?.message}
                  placeholder="LocalAddress"
                  disabled={
                    watch("localAddress")?.length > 0 &&
                    watch("localAddress") === watch("permanentAddress")
                  }
                  isRequired
                  {...register("localAddress", {
                    required: "localAddress is Required",
                  })}
                />
                <FormControlLabel
                  defaultValue={false}
                  disabled={!watch("localAddress")}
                  control={<Switch checked={permanentAddress} />}
                  label="same as local"
                  onChange={handleAddress}
                />
                <ForwardedTextInput
                  label="Permanent Address"
                  type="text"
                  error={errors?.permanentAddress ? true : false}
                  helperText={errors?.permanentAddress?.message}
                  placeholder="Permanent Address"
                  isRequired
                  {...register("permanentAddress", {
                    required: "permanentAddress is Required",
                  })}
                />
                <Button
                  sx={{ border: "1px solid black" }}
                  onClick={handleNextButton}
                >
                  Next{" "}
                </Button>
                <StyledButton
                  label={"Save and next"}
                  onClick={handleData}
                  type={"submit"}
                />
              </Box>
            </>
          )}
          {currentSection === 4 && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  gap: "10px",
                  border: "1px solid black",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <HeadingBox
                  onClick={handlePrevButton}
                  prevIcon
                  heading={"Educational Details"}
                />
                <ControlledRadioButtonsGroup
                  label="Are You a"
                  name="eduDesignation"
                  defaultValue={educationOptions[0].value}
                  data={educationOptions}
                />
                {methods.watch("eduDesignation") === "student" && (
                  <>
                    <ForwardedTextInput
                      label="Last Attained Qualification"
                      type="text"
                      error={errors?.qualification ? true : false}
                      helperText={errors?.qualification?.message}
                      placeholder="Your latest educational degree / diploma"
                      isRequired
                      {...register("qualification", {
                        required: "qualification is Required",
                      })}
                    />
                    <ForwardedTextInput
                      label="Year"
                      type="text"
                      error={errors?.year ? true : false}
                      helperText={errors?.year?.message}
                      placeholder="Completion year"
                      isRequired
                      {...register("year", {
                        required: "year is Required",
                      })}
                    />
                    <ForwardedTextInput
                      label="College / University"
                      type="text"
                      error={errors?.college ? true : false}
                      helperText={errors?.college?.message}
                      placeholder="College / University"
                      isRequired
                      {...register("college", {
                        required: "college is Required",
                      })}
                    />
                  </>
                )}
                {methods.watch("eduDesignation") === "workingProfessional" && (
                  <>
                    <ForwardedTextInput
                      label="Designation"
                      type="text"
                      error={errors?.designation ? true : false}
                      helperText={errors?.designation?.message}
                      placeholder="Designation"
                      isRequired
                      {...register("designation", {
                        required: "designation is Required",
                      })}
                    />
                    <ForwardedTextInput
                      label="Company"
                      type="text"
                      error={errors?.company ? true : false}
                      helperText={errors?.company?.message}
                      placeholder="Company"
                      isRequired
                      {...register("company", {
                        required: "company is Required",
                      })}
                    />
                  </>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  gap: "10px",
                  border: "1px solid black",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <HeadingBox heading={"Course Details"} />
                {/* <ForwardedTextInput
                label="Course"
                type="text"
                error={errors?.course ? true : false}
                helperText={errors?.course?.message}
                placeholder="course"
                isRequired
                {...register("course", {
                  required: "course is Required",
                })}
              /> */}
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-required-label">
                    Select a Course
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-required-label"
                    // id="demo-simple-select-required"
                    placeholder="Select a Course"
                    {...register("coursedetail", {
                      required: "coursedetail is Required",
                    })}
                    // error={errors?.coursedetail ? true : false}
                    // helperText={errors?.coursedetail?.message}
                    value={watch("coursedetail") || ""}
                    label="Select a Course"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {coursesData?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item?.value}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {watch("coursedetail") === "otherCourse" && (
                  <ForwardedTextInput
                    type="text"
                    error={errors?.otherCourse ? true : false}
                    helperText={errors?.otherCourse?.message}
                    placeholder="add a course"
                    isRequired
                    {...register("otherCourse", {
                      required: "coursedetail is Required",
                    })}
                  />
                )}
                <ControlledRadioButtonsGroup
                  label="How you came to know about us?"
                  name="analytics"
                  defaultValue={analyticsOptions[0].value}
                  data={analyticsOptions}
                />
                {methods.watch("analytics") === "friend" && (
                  <ForwardedTextInput
                    label="Friend Name"
                    type="text"
                    error={errors?.friendName ? true : false}
                    helperText={errors?.friendName?.message}
                    placeholder="your friend name"
                    isRequired
                    {...register("friendName", {
                      required: "friendName is Required",
                    })}
                  />
                )}
              </Box>
              <FormControlLabel
                defaultValue={false}
                aria-readonly
                control={<Switch checked={confirmation} />}
                disabled={!confirmation}
                // label="same as local"
              />{" "}
              By clicking submit, you agree to our{" "}
              <a
                style={{ color: "blue", cursor: "pointer" }}
                onClick={handleOpen}
              >
                Terms & Conditions
              </a>
              <Box className="flex flex-col justify-start items-center w-full gap-4 p-3">
                <StyledButton
                  label={"Save and next"}
                  onClick={handleData}
                  type={"submit"}
                  width={"100%"}
                />
                <StyledButton
                  onClick={getData}
                  type="submit"
                  label={"Get Data"}
                  width={"100%"}
                />
              </Box>
            </>
          )}
        </form>
        <ConfirmationModal
          open={open}
          setOpen={setOpen}
          setConfirmation={setConfirmation}
          confirmation={confirmation}
        />
      </Box>
    </FormProvider>
  );
};

export default RegisterForm;
