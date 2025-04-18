import {useSearchParams} from "react-router-dom";

const ProcessInquirerPage = () => {
    const [searchParams] = useSearchParams();
    const quizId = searchParams.get("id");

    return (
        <div>{quizId}</div>
    )
}

export default ProcessInquirerPage