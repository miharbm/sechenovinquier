import Typography from '@mui/material/Typography';
import {useGetInquierItemQuery} from "../../api/api.js";

const  InquierItem = ({userId, passNum}) => {
    const {data} = useGetInquierItemQuery({userId, passNum})

    console.log(data)
    // Здесь можно использовать id для получения данных об исследовании из API или другого источника данных
    // Предположим, что investigation является объектом с данными об исследовании
    const investigation = {
        id: 1,
        date: '2024-04-25',
        name: 'Иванов Иван',
        result: 'Положительный',
        answers: [
            { question: 'Вопрос 1', answer: 'Ответ 1' },
            { question: 'Вопрос 2', answer: 'Ответ 2' },
            { question: 'Вопрос 3', answer: 'Ответ 3' },
        ],
    };

    return (
        <div style={{ padding: '16px', marginTop: '2rem', marginLeft: '3rem' }}>
            <Typography variant="h4" gutterBottom>
                Детали исследования №{userId}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Дата: {investigation.date}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Имя пациента: {investigation.name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Результат: {investigation.result}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Ответы на вопросы:
            </Typography>
            <ul>
                {investigation.answers.map((item, index) => (
                    <li key={index}>
                        <Typography variant="subtitle1">
                            <strong>{item.question}</strong>: {item.answer}
                        </Typography>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default InquierItem;
