const url = "http://127.0.0.1:3000/movies"

const fetchData = async (url) => {

  try {
    const response = await fetch(url);
    console.log(response)
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const main = async _ => {
const bodyElement = document.body
fetchData(url)
bodyElement.insertAdjacentHTML("beforebegin", "<h1>Sta Ima</h1>")
};



window.addEventListener("load", main);