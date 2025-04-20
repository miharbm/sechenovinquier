const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '[::1]' ||
    /^127(?:\.(?:25[0-5]|2[0-4]\d|[01]?\d\d?)){3}$/.test(window.location.hostname)
);

let waitingWorker = null;

export function registerSW(onUpdateAvailable) {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const swUrl = '/sw.js';

            if (isLocalhost) {
                checkValidServiceWorker(swUrl, onUpdateAvailable);
                navigator.serviceWorker.ready.then(() => {
                    console.log('Service worker is ready (localhost)');
                });
            } else {
                registerValidSW(swUrl, onUpdateAvailable);
            }
        });
    }
}

function registerValidSW(swUrl, onUpdateAvailable) {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;

                if (installingWorker) {
                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                waitingWorker = registration.waiting;
                                if (onUpdateAvailable) onUpdateAvailable();
                            } else {
                                console.log('App is cached for offline use.');
                            }
                        }
                    };
                }
            };
        })
        .catch(error => {
            console.error('Error during service worker registration:', error);
        });
}

function checkValidServiceWorker(swUrl, onUpdateAvailable) {
    fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
        .then(response => {
            const contentType = response.headers.get('content-type');
            if (
                response.status === 404 ||
                (contentType && !contentType.includes('javascript'))
            ) {
                navigator.serviceWorker.ready.then(registration => {
                    registration.unregister().then(() => {
                        window.location.reload();
                    });
                });
            } else {
                registerValidSW(swUrl, onUpdateAvailable);
            }
        })
        .catch(() => {
            console.log('No internet connection. App is running in offline mode.');
        });
}

// Программно применить обновление (можно использовать в кнопке "Обновить")
export function applyUpdate() {
    if (waitingWorker) {
        waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
}
