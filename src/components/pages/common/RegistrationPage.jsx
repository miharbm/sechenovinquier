import Register from "../../loginandregister/Register.jsx";
import Container from "@mui/material/Container";

const RegistrationPage = () => {
    return (
        <Container maxWidth="sm" sx={{pt: {md: "10svh", xs: "20px"}}} >
            <Register/>
        </Container>
    )
}

export default RegistrationPage