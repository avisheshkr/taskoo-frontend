import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";

export const LoginField = (props: any) => {
  const { control, name, label } = props;
  const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   toast.error(error?.message);
  // }, [error]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            {name === "password" ? (
              <TextField
                type={!isVisible ? "password" : "text"}
                label={label}
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() => setIsVisible(!isVisible)}
                      sx={{ cursor: "pointer" }}
                    >
                      {!isVisible ? <Visibility /> : <VisibilityOff />}
                    </InputAdornment>
                  ),
                }}
                error={error ? true : false}
                helperText={error?.message}
              />
            ) : (
              <TextField
                type={name === "password" ? "password" : "text"}
                label={label}
                {...field}
                error={error ? true : false}
                helperText={error?.message}
              />
            )}
          </>
        );
      }}
    />
  );
};
