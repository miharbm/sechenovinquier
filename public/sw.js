self.addEventListener('push', (event) => {
    console.log('Push event: ', event);
    // const data = event.data.json(); // Получаем данные из push-уведомления

    // const title = data.title || 'Новое уведомление'; // Заголовок уведомления
    const title = 'Новое уведомление'; // Заголовок уведомления
    const options = {
        body: 'Проверьте ваше приложение', // Текст уведомления
        // body: data.body || 'Проверьте ваше приложение', // Текст уведомления
        icon: './favicon/android-chrome-192x192.png', // Иконка уведомления (укажите путь к иконке)
        badge: './favicon/android-chrome-512x512.png', // Маленькая иконка для уведомления
        vibrate: [200, 100, 200], // Вибрация устройства
        // data: {
        //     url: data.url || '/', // URL, куда перенаправит при клике
        // },
    };

    event.waitUntil(
        self.registration.showNotification(title, options) // Показываем уведомление
    );
});

self.addEventListener('install', (event) => {
    console.log('Service Worker установлен');
    event.waitUntil(self.skipWaiting()); // Принудительно активируем новый Service Worker
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker активирован');
    event.waitUntil(self.clients.claim()); // Принимаем контроль над всеми клиентами
});

self.addEventListener('notificationclick', function(event) {
    console.log('Notification clicked');
    event.notification.close(); // Закрыть уведомление

    event.waitUntil(
        self.clients.openWindow(event.notification.data?.url || '/')
    );
});

