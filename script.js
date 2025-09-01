document.addEventListener('DOMContentLoaded', () => {
    const infoContainer = document.getElementById('info-container');
    
    function updateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedTime = now.toLocaleDateString('pt-BR', options);
        
        infoContainer.innerHTML = `<p>${formattedTime}</p>`;
    }

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            infoContainer.innerHTML += "<p>Geolocalização não é suportada por este navegador.</p>";
        }
    }

    function showPosition(position) {
        const lat = position.coords.latitude.toFixed(2);
        const lon = position.coords.longitude.toFixed(2);
        infoContainer.innerHTML += `<p>Latitude: ${lat}°</p>`;
        infoContainer.innerHTML += `<p>Longitude: ${lon}°</p>`;
    }

    function showError(error) {
        let errorMessage = "Erro de localização.";
        switch(error.code) {
            case error.PERMISSION_DENIED:
                errorMessage = "Usuário negou a solicitação de Geolocalização.";
                break;
            case error.POSITION_UNAVAILABLE:
                errorMessage = "Informações de localização não estão disponíveis.";
                break;
            case error.TIMEOUT:
                errorMessage = "A solicitação de localização expirou.";
                break;
            case error.UNKNOWN_ERROR:
                errorMessage = "Ocorreu um erro desconhecido.";
                break;
        }
        console.error(errorMessage);
        infoContainer.innerHTML += `<p>Localização não disponível.</p>`;
    }

    setInterval(updateTime, 1000);
    getLocation();
});