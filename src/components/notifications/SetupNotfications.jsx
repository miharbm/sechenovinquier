import { useEffect } from 'react';
import urlBase64ToUint8Array from "../../util/urlBase64ToUint8Array.js";
import {useSubscribeMutation} from "../../api/notificationsApi.js";
const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY


const NotificationSetup = () => {
    const [subscribe] = useSubscribeMutation();

    useEffect(() => {


        const setupPushNotifications = async () => {
            if ('serviceWorker' in navigator && 'PushManager' in window) {
                // console.log(navigator.serviceWorker)
                const registration = await navigator.serviceWorker.ready
                // const registration = await navigator.serviceWorker.ready.then(
                //     (registration) => {
                //         console.log(registration)
                //     }
                // ).catch(e => console.error(e));
                // console.log("navigator.serviceWorker")

                // console.log(navigator.serviceWorker)


                // Notification.requestPermission().then(permission => {
                //     if (permission === 'granted') {
                //         console.log('Разрешение предоставлено');
                //     } else {
                //         console.log('Разрешение отклонено');
                //     }
                // });

                // Запрос разрешения и подписка
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    const subscription = await registration.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
                    });

                    // Отправка подписки на сервер
                    await subscribe(subscription);
                }
            }
        };

        setupPushNotifications();
    }, [subscribe]);

    return null;
};

export default NotificationSetup;