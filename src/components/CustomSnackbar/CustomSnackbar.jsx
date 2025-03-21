import { forwardRef } from "react";
import { SnackbarContent } from "notistack";

const CustomSnackbar = forwardRef(function CustomSnackbar ({ id, message, color }, ref) {
    return (
        <SnackbarContent
            ref={ref}
            id={id}
            style={{
                backgroundColor: color,
                color: "#fff",
                fontWeight: "bold",
            }}
            message={message}
        />
    )
});

export default CustomSnackbar;