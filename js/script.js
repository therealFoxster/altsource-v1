$.getJSON("apps.json", function (json) { 
    json.apps.sort((a, b) => { 
        // If a < b
        return (new Date(a.versionDate)).getTime() - (new Date(b.versionDate)).getTime();
    });
    
    json.apps.forEach(app => {
        const versionDate = new Date(app.versionDate),
            today = new Date(),
            timeDifference = Math.abs(today - versionDate),
            daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); 
        let newApp = (daysDifference < 14 ? true : false);
        
        let month = versionDate.toUTCString().split(" ")[2],
            date = versionDate.getDate();
        const dateStr = `${month} ${date}, ${versionDate.getFullYear()}`

        document.querySelector("#apps").insertAdjacentHTML("afterbegin", appContainer(app.name, app.subtitle, 
            // (app.localizedDescription.includes(".") ? app.localizedDescription.split(".")[0] + "..." : app.localizedDescription)
            app.localizedDescription
            // app.versionDescription.split("\n \n")[0]
            , app.version, dateStr, app.iconURL, newApp)
        );
    });

    document.querySelector(".app-text p span").classList.add("badge", "new"); // Add "New" badge to first app by default

    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", e => {
            e.target.blur();
            btn.classList.add("focus");
            setTimeout(() => {
                btn.classList.remove("focus");
            }, 100);
        });
    });
});

document.querySelector("#add").addEventListener("click", () => {
    location.href = "altstore://source?url=https://foxster-mp4.github.io/AltSource/apps.json";
});

function appContainer(name, shortDesc, longDesc, version = "N/A", versionDate = "N/A", iconURL="apps/blank-app-icon.jpeq", 
    newApp = false, buttonLink = null, buttonText = "Info") {
    
    const rand = Math.floor(Math.random() * 10000),
        randName = name.toLowerCase().replaceAll(" ", "").split("+")[0] + rand;
    newApp = (newApp ? "New" : "");
    
    return `
        <div class="d-flex justify-content-center m-2">
            <div class="app blur-bg d-flex flex-column">
                <div class="app d-flex align-items-center p-3">
                    <img src="${iconURL}" alt="${name.toLowerCase()}-app-icon" class="app-icon" onerror="this.onerror=null;this.src='apps/blank-app-icon.jpeg';">
                    <div class="app-text p-2 flex-grow-1">
                        <p class="text-adaptive2 fs-6">
                            ${name} <span class="${(newApp ? "badge new " : "")}text-bg-danger text-uppercase">${newApp}</span>
                        </p>
                        <p class="fs-7 app-desc-short">${shortDesc}</p>

                    </div>
                    <button type="button" class="btn btn-primary btn-sm rounded-pill bold text-uppercase fw-semibold" ` +
                    (buttonLink ?
                        `onclick="location.href='${buttonLink}';"`
                        :
                        `data-bs-toggle="collapse" data-bs-target="#${randName}Desc" aria-expanded="false" aria-controls="${randName}Desc"`
                    ) + `>${buttonText}</button>
                </div>
                <div class="app-text flex-grow-1" style="margin: 0 12px; padding: 0 8px;">
                    <p class="fs-7 text-adaptive2 app-desc-long " id="${randName}Desc" style="margin-top: -8px;">
                        ${(longDesc ? longDesc.replaceAll("\n", "<br>") : "")}
                        <br><span class="app-version fw-normal text-end" id="${randName}Version" style="display: block; text-align: end!important; margin-top: 8px">v${version} (${versionDate})</span><br>
                    </p>
                </div>
            </div>
        </div>
    `;
}