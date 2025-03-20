import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useState } from 'react';
import LightBox from "../lightbox/LightBox.jsx";
import PatientInfoSkeleton from "./PatientInfoSkeleton.jsx";
import defaultAvatar from "../../assets/default_avatar.png";
import {useGetPatientInfoQuery} from "../../api/adminApi.js";
import Box from "@mui/material/Box";
const apiUrl = import.meta.env.VITE_API_URL
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {enqueueSnackbar} from "notistack";


const PatientInfo = ({ patientId }) => {
    const { data, isLoading, isError } = useGetPatientInfoQuery({ userId: patientId });

    const [openLightbox, setOpenLightbox] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [avatarSrc, setAvatarSrc] = useState(null);

    const handleClickOpen = (image) => {
        setSelectedImage(image);
        setOpenLightbox(true);
    };

    const handleClose = () => {
        setOpenLightbox(false);
    };

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            enqueueSnackbar("Номер скопирован", { variant: "success" });
        } catch (err) {
            console.error("Ошибка копирования", err);
        }
    };

    if (isError) return <Typography>Ошибка при загрузке данных пациента.</Typography>;

    const {
        first_name,
        middle_name,
        last_name,
        email,
        phone,
        avatar
    } = data || {};

    const avatarUrl = avatar ? `${apiUrl}/static/public/avatars/${avatar}` : defaultAvatar;

    return (
        <>
            {isLoading && <PatientInfoSkeleton/>}
            {data && (
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="150"
                        image={avatarSrc || avatarUrl}
                        alt={`${first_name} ${last_name} Avatar`}
                        onClick={() => handleClickOpen(avatarSrc || avatarUrl)}
                        sx={{ cursor: 'pointer' }}
                        onError={() => setAvatarSrc(defaultAvatar)}
                    />
                    <CardContent>
                        <Typography variant="h6">{last_name}</Typography>
                        <Typography variant="h6" sx={{marginTop: 0}}>
                            {`${first_name} ${middle_name}`}
                        </Typography>
                        <Box height={10}/>
                        {email && (
                            <Typography variant="body2" color="text.secondary">
                                <strong>Email:</strong> {email}
                            </Typography>
                        )}
                        <Typography variant="body2" color="text.secondary" sx={{display: "inline"}}>
                            <strong>Телефон: </strong>
                        </Typography>
                        {phone && <>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                component="a"
                                href={`tel:${phone}`}
                                sx={{textDecoration: "none", userSelect: "all"}}
                            >
                                {phone}
                            </Typography>
                            <Tooltip title="Скопировать">
                                <IconButton onClick={() => handleCopy(phone)}
                                            size="small"
                                            sx={{ padding: "0.3 0.5" }}
                                >
                                    <ContentCopyIcon fontSize="small" sx={{ fontSize: 13 }} />
                                </IconButton>
                            </Tooltip>
                        </>}
                    </CardContent>
                </Card>
            )}

            <LightBox open={openLightbox} handleClose={handleClose} selectedImage={selectedImage}/>
        </>
    );
};

export default PatientInfo;
