import { BlobServiceClient } from "@azure/storage-blob";

function getServiceSasUrl() {
    return (document.getElementById("serviceSasUrl") as HTMLInputElement).value;
}

function showContainerList(containers) {
    const outputEl = document.getElementById("output");
    // empty previous output
    outputEl.textContent = "";
    for (const container of containers) {
        const containerDiv = document.createElement("div");
        containerDiv.textContent = container.name;
        outputEl.appendChild(containerDiv);
    }
}

async function listContainers() {
    const blobServiceClient = new BlobServiceClient(getServiceSasUrl());
    const containers = [];
    for await (const container of  blobServiceClient.listContainers()) {
        containers.push(container);
    }
    showContainerList(containers);

}

window.addEventListener("DOMContentLoaded", () => {
    const listContainersButton = document.getElementById("listContainers");
    listContainersButton.addEventListener("click", () => listContainers());
});