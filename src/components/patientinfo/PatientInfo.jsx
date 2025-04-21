import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useState } from 'react';
import LightBox from "../lightbox/LightBox.jsx";
import PatientInfoSkeleton from "./PatientInfoSkeleton.jsx";
import defaultAvatar from "../../assets/default_avatar.png";
import {useGetPatientInfoQuery} from "../../api/adminApi.js";
import Box from "@mui/material/Box";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import {enqueueSnackbar} from "notistack";
import ErrorBlock from "../badstatuses/ErrorBlock.jsx";


const PatientInfo = ({ patientId }) => {
    const { data: patient, isLoading, isError } = useGetPatientInfoQuery({ userId: patientId });

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


    if (isError) return  <ErrorBlock message={"Ошибка при загрузке данных пациента"}/>;

    return (
        <>
            {isLoading && <PatientInfoSkeleton/>}
            {patient && (
                <Card>
                    <CardMedia
                        component="img"
                        height="150"
                        image={avatarSrc || patient.avatarUrl}
                        alt={`${patient.firstName} ${patient.lastName} Avatar`}
                        onClick={() => handleClickOpen(avatarSrc || patient.avatarUrl)}
                        sx={{ cursor: 'pointer' }}
                        onError={() => setAvatarSrc(defaultAvatar)}
                    />
                    <CardContent>
                        <Typography variant="h6">{patient.lastName}</Typography>
                        <Typography variant="h6" sx={{marginTop: 0}}>
                            {`${patient.firstName} ${patient.lastName}`}
                        </Typography>
                        <Box height={10}/>
                        {patient?.email && (
                            <Typography variant="body2" color="text.secondary">
                                <strong>Email:</strong> {patient.email}
                            </Typography>
                        )}
                        <Typography variant="body2" color="text.secondary" sx={{display: "inline"}}>
                            <strong>Телефон: </strong>
                        </Typography>
                        {patient.phone && <>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                component="a"
                                href={`tel:${patient.phone}`}
                                sx={{textDecoration: "none", userSelect: "all"}}
                            >
                                {patient.phone}
                            </Typography>
                            <Tooltip title="Скопировать">
                                <IconButton onClick={() => handleCopy(patient.phone)}
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
