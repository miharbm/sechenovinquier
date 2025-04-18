import { useState } from 'react';
import {
    Box,
    Typography,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Card,
    CardMedia,
    CardContent
} from '@mui/material';

const QuestionBlockMultiChoice = ({ questionData, onAnswer }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleChange = (event) => {
        const value = Number(event.target.value);
        setSelectedOptions((prev) =>
            event.target.checked
                ? [...prev, value]
                : prev.filter((id) => id !== value)
        );
    };

    const handleSubmit = () => {
        const selectedAnswers = questionData.options.filter((option) =>
            selectedOptions.includes(option.responseId)
        );

        if (selectedOptions.length > 0) {
            onAnswer(selectedOptions, selectedAnswers);
        }
    };

    return (
        <Card sx={{ maxWidth: 600, margin: '0 auto', p: 2 }}>
            {questionData.imgName && (
                <CardMedia
                    component="img"
                    height="200"
                    image={`/images/${questionData.imgName}`}
                    alt="question"
                />
            )}
            <CardContent>
                <FormControl component="fieldset" variant="standard">
                    <FormLabel component="legend">
                        <Typography variant="h6" gutterBottom>
                            {questionData.questionText}
                        </Typography>
                    </FormLabel>
                    <FormGroup>
                        {questionData.options.map((option) => (
                            <FormControlLabel
                                key={option.responseId}
                                control={
                                    <Checkbox
                                        checked={selectedOptions.includes(option.responseId)}
                                        onChange={handleChange}
                                        value={option.responseId}
                                    />
                                }
                                label={option.responseText}
                            />
                        ))}
                    </FormGroup>
                </FormControl>
                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={selectedOptions.length === 0}
                        onClick={handleSubmit}
                    >
                        Ответить
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default QuestionBlockMultiChoice;
