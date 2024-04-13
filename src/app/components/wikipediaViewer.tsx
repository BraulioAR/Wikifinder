import { useEffect, useState } from 'react';

const WikipediaViewer: React.FC = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin === 'https://es.wikipedia.org') {
                const iframeUrl = event.data;
                if (typeof iframeUrl === 'string' && iframeUrl.includes('Lionel_Messi')) {
                    setShowSuccessMessage(true);
                    console.log('¡Éxito! ¡Felicidades!');
                }
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const handleIframeLoad = () => {
        const iframe = document.getElementById('wikipedia-iframe') as HTMLIFrameElement;
        iframe.contentWindow?.postMessage('get-url', 'https://es.wikipedia.org');
    };

    return (
        <div id="wikipedia-viewport">
            <iframe id="wikipedia-iframe" src="https://es.wikipedia.org/wiki/Wikipedia:Portada" onLoad={handleIframeLoad}></iframe>
            {showSuccessMessage && <p>¡Éxito! ¡Felicidades!</p>}
        </div>
    );
};

export default WikipediaViewer;