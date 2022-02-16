let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';



//demande a l'utilisateur la permission pour des notifications
function displayNotification() {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function(reg) {
            reg.showNotification('Hello world!');
        });
    }
}

function displayNotification() {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function(reg) {
            reg.showNotification('Hello world!');
        });
    }
}



function displayNotification() {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function(reg) {
            var options = {
                body: 'La connexion internet!',
                icon: 'images/happy.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                }
            };
            reg.showNotification('Hello world!', options);
        });
    }
}




window.addEventListener('beforeinstallprompt', (e) => {

    e.preventDefault();

    deferredPrompt = e;

    addBtn.style.display = 'block';

    addBtn.addEventListener('click', (e) => {

        addBtn.style.display = 'none';

        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});