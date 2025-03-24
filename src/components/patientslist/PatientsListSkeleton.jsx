import Skeleton from "@mui/material/Skeleton";
import { List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";

const PatientsListSkeleton = () => {
    return (
        <List>
            {Array.from({ length: 5 }).map((_, index) => (
                <ListItem key={index}>
                    <ListItemAvatar>
                        <Skeleton variant="circular">
                            <Avatar />
                        </Skeleton>
                    </ListItemAvatar>
                    <ListItemText
                        primary={<Skeleton width="60%" />}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default PatientsListSkeleton;
