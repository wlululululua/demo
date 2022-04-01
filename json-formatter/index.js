const inputArea = document.querySelector(".large-area--input");
const outputArea = document.querySelector(".large-area--output");
const btnFormat = document.querySelector(".controls__button--format");
const btnMinify = document.querySelector(".controls__button--minify");

btnFormat.addEventListener("click", () => {
    try {
        const formatted = JSON.stringify(JSON.parse(inputArea.value), null, 4);
        outputArea.value = formatted;
    } catch (error) {
        alert("⚠️ must be in correct JSON format");
    }
});

btnMinify.addEventListener("click", () => {
    const minified = JSON.stringify(JSON.parse(inputArea.value));

    outputArea.value = minified;
});
