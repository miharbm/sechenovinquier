import { useState } from 'react';
import {
    Box,
    Typography,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button,
    Card,
    CardMedia,
    CardContent
} from '@mui/material';

const QuestionBlockSingleChoice = ({ questionData, onAnswer }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleChange = (event) => {
        setSelectedOption(Number(event.target.value));
    };

    const handleSubmit = () => {
        const selectedAnswers = questionData.options.filter(
            (option) => option.responseId === selectedOption
        );

        if (selectedOption) {
            onAnswer([selectedOption], selectedAnswers);
        }
    };

    return (
        <Card sx={{ p: 2 }}>
            {questionData.imgName && (
                <CardMedia
                    component="img"
                    height="200"
                    image={questionData.imgName}
                    alt="question"
                    sx={{ borderRadius: 1 }}
                />
            )}
            <CardContent>
                <FormControl component="fieldset">
                    <FormLabel component="legend">
                        <Typography variant="h6" gutterBottom>
                            {questionData.questionText}
                        </Typography>
                    </FormLabel>
                    <RadioGroup value={selectedOption} onChange={handleChange}>
                        {questionData.options.map((option) => (
                            <FormControlLabel
                                key={option.responseId}
                                value={option.responseId}
                                control={<Radio />}
                                label={option.responseText}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={selectedOption === null}
                        onClick={handleSubmit}
                        fullWidth
                    >
                        Ответить
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default QuestionBlockSingleChoice;
