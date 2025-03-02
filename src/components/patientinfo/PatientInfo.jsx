import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useGetUserInfoQuery } from "../../api/api.js";
import { useState } from 'react';
import LightBox from "../../lightbox/LightBox.jsx";
import PatientInfoSkeleton from "./PatientInfoSkeleton.jsx";

const PatientInfo = ({ patientId }) => {
    const { data, isLoading, isError } = useGetUserInfoQuery({ userId: patientId });

    const [openLightbox, setOpenLightbox] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

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

    const avatarUrl = avatar ? `http://185.72.145.208:8080/public/avatars/${avatar}` : '';

    return (
        <>
            {isLoading && <PatientInfoSkeleton/>}
            {data && (
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        height="150"
                        image={avatarUrl}
                        alt={`${first_name} ${last_name} Avatar`}
                        onClick={() => handleClickOpen(avatarUrl)}
                        sx={{ cursor: 'pointer' }}
                    />
                    <CardContent>
                        <Typography variant="h6">{`${first_name} ${middle_name} ${last_name}`}</Typography>
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
