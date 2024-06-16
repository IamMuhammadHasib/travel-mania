const searchButton = document.getElementById("submit");

searchButton.addEventListener("click", search);

function getCurrentTime(timezone) {
    let now = new Date();
    let options = {
        timeZone: timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };
    return now.toLocaleTimeString("en-US", options);
}

function search() {
    let searchKey = document.getElementById("searchKey").value;
    searchKey = searchKey.toLowerCase();

    let searchResult = document.getElementById("searchResult");
    searchResult.innerHTML = ""; // Clear previous results

    fetch("data.json")
        .then((response) => response.json())
        .then((data) => {
            let results = [];

            if (searchKey === "beach" || searchKey === "beaches") {
                results = data.beaches;
            } else if (searchKey === "temple" || searchKey === "temples") {
                results = data.temples;
            } else if (searchKey === "australisa") {
            } else if (searchKey === "australia") {
                results = data.countries
                    .filter(
                        (country) => country.name.toLowerCase() === "australia"
                    )
                    .flatMap((country) =>
                        country.cities.map((city) => ({
                            ...city,
                            countryName: country.name,
                        }))
                    );
            } else if (searchKey === "brazil") {
                results = data.countries
                    .filter(
                        (country) => country.name.toLowerCase() === "brazil"
                    )
                    .flatMap((country) =>
                        country.cities.map((city) => ({
                            ...city,
                            countryName: country.name,
                        }))
                    );
            } else if (searchKey === "japan") {
                results = data.countries
                    .filter((country) => country.name.toLowerCase() === "japan")
                    .flatMap((country) =>
                        country.cities.map((city) => ({
                            ...city,
                            countryName: country.name,
                        }))
                    );
            } else if (searchKey === "country" || searchKey === "countries") {
                results = data.countries.flatMap((country) =>
                    country.cities.map((city) => ({
                        ...city,
                        countryName: country.name,
                    }))
                );
            }

            const timeZones = {
                Australia: "Australia/Sydney",
                Japan: "Asia/Tokyo",
                Brazil: "America/Sao_Paulo",
            };

            results.forEach((result) => {
                let resultDiv = document.createElement("div");

                let img = document.createElement("img");
                img.src = "destinations/" + result.imageUrl;
                resultDiv.appendChild(img);

                let name = document.createElement("h3");
                name.textContent = result.name;
                name.style.margin = "10px";
                resultDiv.appendChild(name);

                if (searchKey === "country" || searchKey === "countries" || searchKey === "australia" || searchKey === "japan" || searchKey === "brazil") {
                    let countryTime = getCurrentTime(
                        timeZones[result.countryName]
                    );

                    let time = document.createElement("p");
                    time.textContent = `Current time in ${result.countryName}: ${countryTime}`;
                    time.style.margin = "10px";
                    resultDiv.appendChild(time);
                }

                let description = document.createElement("p");
                description.textContent = result.description;
                description.style.margin = "10px";
                resultDiv.appendChild(description);

                let button = document.createElement("button");
                button.textContent = "Visit";
                resultDiv.appendChild(button);

                searchResult.appendChild(resultDiv);
            });
        });
}

const resetButton = document.getElementById("reset");

resetButton.addEventListener("click", reset);

function reset() {
    document.getElementById("searchKey").value = "";
    document.getElementById("searchResult").innerHTML = "";
}
