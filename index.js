console.log(Notification.permission);


function notif(){
  Notification.requestPermission().then(function(result){

  console.log("permission donnee");
  });
}

function sendthreadnotification(){

if(Notification.permission === 'granted'){

   var options = {

         body:"premiere notification",
         requireInteraction: 'true'
         
   };

   new Notification("hello from index.js", options);
   } else {

    console.log("notification non permise");
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