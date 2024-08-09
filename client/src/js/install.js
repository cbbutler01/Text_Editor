const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
if (butInstall) {
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();

        window.deferredPrompt = event;

        butInstall.classList.toggle('hidden', false);
    });

// TODO: Implement a click event handler on the `butInstall` element
    butInstall.addEventListener('click', async () => {
        const promptEvent = window.deferredPrompt;

        if(!promptEvent) {
            return;
        }

        promptEvent.prompt();
        const { outcome } = await prompt.userChoice;

        window.deferredPrompt = null;

        if (outcome === 'accepted') {
            console.log('User accepted A2HS prompt');
        } else {
            console.log('User dismissed A2HS prompt');
        }

        butInstall.classList.toggle('hidden', true);
    });

// TODO: Add an handler for the `appinstalled` event
    window.addEventListener('appinstalled', (event) => {
        window.deferredPrompt = null;

        console.log('PWA installed!');
    });
} else (
    console.log('Install button not found')
);