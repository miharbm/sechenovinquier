import {Card, CardContent, Skeleton} from "@mui/material";

const PatientInfoSkeleton = () => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <Skeleton variant="rectangular" width="100%" height={140} />
            <CardContent>
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width="80%" />
                <Skeleton variant="text" width="50%" />
            </CardContent>
        </Card>
    )
}

export default PatientInfoSkeleton