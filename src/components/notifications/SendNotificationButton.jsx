import {useNotifyMutation} from "../../api/notificationsApi.js";

const SendNotificationButton = () => {
    const [notify] = useNotifyMutation();

    const handleSendNotification = async () => {
        try {
            await notify();
            console.log('Уведомления отправлены');
        } catch (error) {
            console.error('Ошибка при отправке уведомлений:', error);
        }
    };

    return (
        <button onClick={handleSendNotification}>
            Отправить уведомление
        </button>
    );
};

export default SendNotificationButton;