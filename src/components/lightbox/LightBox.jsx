import {Button, Dialog, DialogActions, DialogContent} from "@mui/material";

const LightBox = ({open, handleClose, selectedImage}) => {


    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogContent>
                <img
                    src={selectedImage}
                    alt="Patient Avatar"
                    style={{ width: '100%', height: 'auto' }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Закрыть
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default LightBox