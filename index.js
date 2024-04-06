const copyButton = document.querySelector(".copy-btn");
const outputUrl = document.querySelector(".output-url");
const addForm = document.querySelector("#form");
const task = document.querySelector("#task");
const tasks = document.querySelector("#link-shortener");
const linkContainer = document.querySelector("#link-contain");
const formValidateMessage = document.querySelector("#validator");
const button = document.querySelector("#button");

const STORAGE_KEY = "storedLinks";

addCopyFunctionality();

addForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const value = addForm.task.value.trim();

  if (value === "") {
    formValidateMessage.innerText = "Please Enter Something";
    input.classList.toggle("border-red");
  } else {
    try {
      const shortenedLink = await shortenUrl(value);
      console.log(value);
      displayShortenedLink(shortenedLink, value);
      addForm.reset();
      show();
    } catch (error) {
      console.error("Error shortening link:", error);
      // Handle error appropriately, e.g., display an error message to the user
    }
  }
});

function truncateString(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  } else {
    return str;
  }
}

async function shortenUrl(url) {
  const response = await fetch(
    "https://url-shortener-service.p.rapidapi.com/shorten",
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "d1c14cb7bemsh000183cc99cdb8cp13a882jsn1ba718eaa60e",
        "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
      },
      body: new URLSearchParams({ url }),
    }
  );
  const result = await response.text();
  const pack = await JSON.parse(result);
  return pack["result_url"];
}

function renderItems(items) {
  items.forEach((item) => {
    displayShortenedLink(
      truncateString(item.shortUrl),
      truncateString(item.longUrl, 40)
    ); // Use retrieved data to create links
  });
}

function displayShortenedLink(link, value) {
  // ... (construct and display the link element
  if (value.length) {
    function truncateString(str, maxLength) {
      if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
      } else {
        return str;
      }
    }

    createLinkInfo(value, link);

    function createLinkInfo(longUrl, shortUrl) {
      // Create the container element
      const linkContainer = document.createElement("div");
      linkContainer.classList.add(
        "flex",
        "flex-col",
        "items-center",
        "justify-between",
        "w-full",
        "p-6",
        "mb-5",
        "bg-white",
        "rounded-lg",
        "md:flex-row"
      );

      // Create the long URL paragraph
      const longUrlElement = document.createElement("p");
      longUrlElement.classList.add(
        "font-bold",
        "text-center",
        "text-veryDarkViolet",
        "md:text-left"
      );
      longUrlElement.textContent = truncateString(longUrl, 40); // Placeholder for actual long URL

      // Create the short URL paragraph
      const shortUrlElement = document.createElement("p");
      shortUrlElement.classList.add("font-bold", "text-cyan", "output-url");
      shortUrlElement.textContent = shortUrl; // Placeholder for actual short URL

      // Create the copy button (structure only, functionality not included)
      const copyButton = document.createElement("button");
      copyButton.classList.add(
        "group",
        "hover:opacity-70",
        "relative",
        "bg-darkViolet",
        "rounded",
        "text-neutral-50",
        "duration-500",
        "font-bold",
        "flex",
        "justify-start",
        "gap-2",
        "items-center",
        "p-2",
        "pr-6",
        "focus:outline-none",
        "capitalize",
        "copy-btn"
      );

      // SVG element for copy icon (structure only)
      const copyButtonSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      copyButtonSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      copyButtonSvg.setAttribute("fill", "none");
      copyButtonSvg.setAttribute("viewBox", "0 0 24 24");
      copyButtonSvg.setAttribute("stroke-width", "1.5");
      copyButtonSvg.setAttribute("stroke", "currentColor");
      copyButtonSvg.classList.add("w-6", "h-6");

      const copyButtonPath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      copyButtonPath.setAttribute("stroke-linecap", "round");
      copyButtonPath.setAttribute("stroke-linejoin", "round");
      copyButtonPath.setAttribute(
        "d",
        "M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
      );

      // Complete the copy button path (structure only)
      copyButtonPath.textContent = "..."; // Replace with actual path definition

      // Append the path to the SVG element
      copyButtonSvg.appendChild(copyButtonPath);

      // Append the SVG element to the copy button
      copyButton.appendChild(copyButtonSvg);

      // Text content for the "copy" span (can be customized)
      const copySpan = document.createElement("span");
      copySpan.classList.add("border-l-2", "px-1");
      copySpan.textContent = "copy";

      // Append the "copy" span to the copy button
      copyButton.appendChild(copySpan);

      // Create the inner container for the short URL and copy button
      const innerContainer = document.createElement("div");
      innerContainer.classList.add(
        "flex",
        "flex-col",
        "items-center",
        "justify-end",
        "flex-1",
        "space-x-4",
        "space-y-2",
        "md:flex-row",
        "md:space-y-0"
      );

      // Append the short URL paragraph and copy button to the inner container
      innerContainer.appendChild(shortUrlElement);
      innerContainer.appendChild(copyButton);

      // Append the long URL paragraph and inner container to the link container
      linkContainer.appendChild(longUrlElement);
      linkContainer.appendChild(innerContainer);

      // (Optional) Append the generated link container to a specific element in HTML file
      const targetElement = document.getElementById("link-contain");
      if (targetElement) {
        targetElement.appendChild(linkContainer);

        // Add click event listener to the copy button
        copyButton.addEventListener("click", function () {
          navigator.clipboard
            .writeText(shortUrl)
            .then(() => {
              copyButton.innerHTML = `<svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z"
                    clip-rule="evenodd"
                  />
                  <path
                    d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z"
                  />
                  <path
                    d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z"
                  />
                </svg>

                <span class="border-l-2 px-1">Copied!</span>`;
              console.log("Short URL copied to clipboard!");
              // Optional: Add visual feedback (e.g., change button color for a moment)
            })
            .catch((err) => {
              console.error("Failed to copy short URL:", err);
            });

          storeLinkInLocalStorage(longUrl, shortUrl);
        });
      } else {
        console.error("Target element for link container not found!");
      }
    }
  }
}

function show() {
  if (linkContainer.children.length > 1) {
    button.classList.remove("hidden");
    console.log(linkContainer.children.length);
  } else {
    button.classList.add("hidden");
    console.log(linkContainer.children.length);
  }
}

console.log(linkContainer.children);

function addCopyFunctionality() {
  const copyButton = document.querySelector(".copy-btn");

  copyButton.addEventListener("click", async () => {
    try {
      const textToCopy = document.querySelector(".output-url").textContent;
      await navigator.clipboard.writeText(textToCopy);
      copyButton.innerHTML = `<svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M17.663 3.118c.225.015.45.032.673.05C19.876 3.298 21 4.604 21 6.109v9.642a3 3 0 0 1-3 3V16.5c0-5.922-4.576-10.775-10.384-11.217.324-1.132 1.3-2.01 2.548-2.114.224-.019.448-.036.673-.051A3 3 0 0 1 13.5 1.5H15a3 3 0 0 1 2.663 1.618ZM12 4.5A1.5 1.5 0 0 1 13.5 3H15a1.5 1.5 0 0 1 1.5 1.5H12Z"
                    clip-rule="evenodd"
                  />
                  <path
                    d="M3 8.625c0-1.036.84-1.875 1.875-1.875h.375A3.75 3.75 0 0 1 9 10.5v1.875c0 1.036.84 1.875 1.875 1.875h1.875A3.75 3.75 0 0 1 16.5 18v2.625c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625v-12Z"
                  />
                  <path
                    d="M10.5 10.5a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963 5.23 5.23 0 0 0-3.434-1.279h-1.875a.375.375 0 0 1-.375-.375V10.5Z"
                  />
                </svg>

                <span class="border-l-2 px-1">Copied!</span>`;
      storeLinkInLocalStorage(longUrl, shortUrl);
      console.log("Content copied to clipboard");
      return textToCopy;
      // Optional: Update button text or display success message
    } catch (err) {
      console.error("Error copying to clipboard:", err);
      // Handle errors (e.g., permission denied)
    }
  });
}

button.addEventListener("click", () => {
  clearStoredLinks();
  window.location.reload();
});

function getItemsFromStorage() {
  const storedItemsJson = localStorage.getItem(STORAGE_KEY);
  return storedItemsJson ? JSON.parse(storedItemsJson) : [];
}

function setItemsToStorage(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

function storeLinkInLocalStorage(longUrl, shortUrl) {
  const items = getItemsFromStorage();
  items.push({ longUrl, shortUrl });
  setItemsToStorage(items);
}

// Load items from local storage on page load
window.addEventListener("load", () => {
  const storedItems = getItemsFromStorage();
  renderItems(storedItems);
  show();
});

function clearStoredLinks() {
  localStorage.removeItem(STORAGE_KEY);
  console.log("Stored links cleared from local storage!");
}

function checkUrl() {}
