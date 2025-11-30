async function loadWeather() {
    const res = await fetch("weather.json");
    const data = await res.json();

    const container = document.querySelector(".forecast-container");
    container.innerHTML = ""; // clear old cards

    data.forEach((day, index) => {

        // day label: Today, Tomorrow, or weekday
        let title = day.label;
        if (!title) {
            const date = new Date();
            date.setDate(date.getDate() + index);
            title = date.toLocaleDateString("en-US", { weekday: "short" });
        }

        // choose icon
        let icon = "bx bx-sun";
        if (day.condition === "Clouds") { icon = "bx bx-cloud"; color = "text-gray-500"; }
        if (day.condition === "Rain") { icon = "bx bx-cloud-rain"; color = "text-blue-600"; }
        if (day.condition === "Clear") { icon = "bx bx-sun"; color = "text-orange-500"; }

        const card = `
            <div data-aos="flip-left" class="weather-card gap-2 bg-white backdrop-blur-sm rounded-lg p-5 flex flex-col items-center text-center shadow">
                <h2>${title}</h2>
                <i class="${icon} ${color} text-5xl max-sm:text-3xl"></i>
                <div class="flex items-baseline">
                    <span class="font-semibold text-4xl max-sm:text-xl">${day.temperature}</span>
                    <span class="text-xl sm:text-2xl md:text-3xl">°C</span>
                </div>
                <p class="text-gray-500 text-sm sm:text-base mt-2">${day.description}</p>
            </div>
        `;

        container.innerHTML += card;
    });
}

loadWeather();
