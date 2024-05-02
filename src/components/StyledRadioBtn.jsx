import React from "react";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Box,
} from "@mui/material";
import { useController } from "react-hook-form";

const ControlledRadioButtonsGroup = ({
  label,
  name,
  defaultValue,
  control,
  data,
  rules,
  isRequired,
}) => {
  const {
    field: { onChange, value, onBlur },
    fieldState: { error },
  } = useController({ name, control, defaultValue, rules });

  return (
    <FormControl>
      {label && (
        <label
          // htmlFor={id}
          style={{
            fontSize: "24px",
            fontWeight: "500",
            letterSpacing: "0.15px",
          }}
        >
          {label} {<sup style={{ color: "#F44" }}>{isRequired ? "*" : ""}</sup>}
        </label>
      )}
      <RadioGroup
        aria-labelledby={`radio-group-${name}`}
        name={name}
        value={value || ""}
        onChange={onChange}
        onBlur={onBlur}
        sx={{ display: "flex", justifyContent: "flex-start" }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          {data?.map((item, index) => {
            return (
              <FormControlLabel
                key={index}
                value={item?.value}
                control={<Radio />}
                label={item?.name}
              />
            );
          })}
        </Box>
      </RadioGroup>
      <FormHelperText sx={{ color: "#d32f2f" }}>
        {error?.message}
      </FormHelperText>
    </FormControl>
  );
};

export default ControlledRadioButtonsGroup;
