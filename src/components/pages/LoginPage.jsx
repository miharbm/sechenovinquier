import Login from "../loginandregister/Login.jsx";
import Container from "@mui/material/Container";

const loginPage = () => {
    return (
        <Container maxWidth="sm" sx={{pt: "25dvh"}}>
            <Login/>
        </Container>
    )
}

export default loginPage