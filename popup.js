document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('showTitle');
    button.addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var pageTitle = tabs[0].title;
            alert("Tytuł strony: " + pageTitle);
        });
    });

    var playButton = document.getElementById('playSound');
    playButton.addEventListener('click', function() {
        var playCount = 0; // Licznik odtworzeń dźwięku
        var interval = setInterval(function() {
            var audio = new Audio('alarm.mp3');
            audio.play();
            playCount++;

            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icon.png', // Ikona powiadomienia
                title: 'Powiadomienie', // Tytuł powiadomienia
                message: 'Dźwięk alarmu został odtworzony.' // Treść powiadomienia
            });
            // Po odtworzeniu dźwięku 2 razy, zatrzymaj setInterval
            if (playCount === 2) {
                clearInterval(interval);
            }
        }, 2000); // Wywołaj co 2 sekund (10000 milisekund)
    });
});
