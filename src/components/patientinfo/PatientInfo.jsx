import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useState } from 'react';
import LightBox from "../lightbox/LightBox.jsx";
import PatientInfoSkeleton from "./PatientInfoSkeleton.jsx";
import defaultAvatar from "../../assets/default_avatar.png";
import {useGetPatientInfoQuery} from "../../api/adminApi.js";
const apiUrl = import.meta.env.VITE_API_URL


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

    if (isError) return <Typography>Ошибка при загрузке данных пациента.</Typography>;

    const {
        first_name,
        middle_name,
        last_name,
        snils,
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
                        <Typography variant="h6">{`${last_name} ${first_name} ${middle_name}`}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>СНИЛС:</strong> {snils}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Email:</strong> {email}
                        </Typography>
                        {phone && (
                            <Typography variant="body2" color="text.secondary">
                                <strong>Телефон:</strong> {phone}
                            </Typography>
                        )}
                    </CardContent>
                </Card>
            )}

            <LightBox open={openLightbox} handleClose={handleClose} selectedImage={selectedImage}/>
        </>
    );
};

export default PatientInfo;
