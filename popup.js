let currentDate = "";
let savedDate = "";

document.addEventListener("DOMContentLoaded", function () {
  setDate();
  setContent();
  saveDate();
});

function getDataFromStorage(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (data) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(data[key]);
      }
    });
  });
}

function setContent() {
  getDataFromStorage("savedDate")
    .then((savedDate) => {
      if (currentDate === savedDate) {
        setLastJokeOfTheDay();
        setLastWordOfTheDay();
        setLastFactOfTheDay();
        setLastQuestionOfTheDay();
      } else {
        setNewJokeOfTheDay();
        setNewWordOfTheDay();
        setNewFactOfTheDay();
        setNewQuestionOfTheDay();
      }
    })
    .catch((error) => {
      console.error("Error retrieving data:", error);
    });
}

function setDate() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dayName = days[date.getDay()];
  let monthName = months[date.getMonth()];

  document.getElementById(
    "date"
  ).innerHTML = `${dayName}, ${monthName} ${day}, ${year}`;
  currentDate = month + "-" + day + "-" + year;
}

function saveDate() {
  chrome.storage.local.set({ savedDate: currentDate }, function () {
    chrome.storage.local.get(function (result) {});
  });
}

function setNewJokeOfTheDay() {
  fetch("json/jokeOfTheDay.json")
    .then((response) => response.json())
    .then((data) => {
      let randomNumber = Math.floor(Math.random() * Object.keys(data).length);
      let joke = data[randomNumber];

      chrome.storage.local.get({ usedJokeIds: [] }, function (result) {
        if (!result.usedJokeIds) {
          let usedJokeIds = [];
          usedJokeIds.push(joke.id);
          chrome.storage.local.set(
            { usedJokeIds: usedJokeIds },
            function () {}
          );
        } else {
          let usedJokeIds = result.usedJokeIds;
          if (usedJokeIds.includes(joke.id)) {
            setNewJokeOfTheDay();
          } else {
            usedJokeIds.push(joke.id);
            chrome.storage.local.set(
              { usedJokeIds: usedJokeIds },
              function () {}
            );
          }
        }
      });
      document.getElementById("line1").innerHTML = joke.line1;
      document.getElementById("line2").innerHTML = joke.line2;
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

function setLastJokeOfTheDay() {
  fetch("json/jokeOfTheDay.json")
    .then((response) => response.json())
    .then((data) => {
      chrome.storage.local.get({ usedJokeIds: [] }, function (result) {
        let usedJokeIds = result.usedJokeIds;
        let lastUsedJokeId = usedJokeIds[usedJokeIds.length - 1];
        let joke = data[lastUsedJokeId - 1];
        document.getElementById("line1").innerHTML = joke.line1;
        document.getElementById("line2").innerHTML = joke.line2;
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

function setNewWordOfTheDay() {
  fetch("json/wordOfTheDay.json")
    .then((response) => response.json())
    .then((data) => {
      let randomNumber = Math.floor(Math.random() * Object.keys(data).length);
      let word = data[randomNumber];

      chrome.storage.local.get({ usedWordIds: [] }, function (result) {
        if (!result.usedWordIds) {
          let usedWordIds = [];
          usedWordIds.push(word.id);
          chrome.storage.local.set(
            { usedWordIds: usedWordIds },
            function () {}
          );
        } else {
          let usedWordIds = result.usedWordIds;
          if (usedWordIds.includes(word.id)) {
            setNewWordOfTheDay();
          } else {
            usedWordIds.push(word.id);
            chrome.storage.local.set(
              { usedWordIds: usedWordIds },
              function () {}
            );
          }
        }
      });
      document.getElementById("wordOfTheDay").innerHTML = word.word;
      document.getElementById("partOfSpeech").innerHTML = word.part_of_speech;
      document.getElementById("definition").innerHTML = word.definition;
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

function setLastWordOfTheDay() {
  fetch("json/wordOfTheDay.json")
    .then((response) => response.json())
    .then((data) => {
      chrome.storage.local.get({ usedWordIds: [] }, function (result) {
        let usedWordIds = result.usedWordIds;
        let lastUsedWordId = usedWordIds[usedWordIds.length - 1];
        let word = data[lastUsedWordId - 1];
        document.getElementById("wordOfTheDay").innerHTML = word.word;
        document.getElementById("partOfSpeech").innerHTML = word.part_of_speech;
        document.getElementById("definition").innerHTML = word.definition;
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

function setNewWordOfTheDay() {
  fetch("json/wordOfTheDay.json")
    .then((response) => response.json())
    .then((data) => {
      let randomNumber = Math.floor(Math.random() * Object.keys(data).length);
      let word = data[randomNumber];

      chrome.storage.local.get({ usedWordIds: [] }, function (result) {
        if (!result.usedWordIds) {
          let usedWordIds = [];
          usedWordIds.push(word.id);
          chrome.storage.local.set(
            { usedWordIds: usedWordIds },
            function () {}
          );
        } else {
          let usedWordIds = result.usedWordIds;
          if (usedWordIds.includes(word.id)) {
            setNewWordOfTheDay();
          } else {
            usedWordIds.push(word.id);
            chrome.storage.local.set(
              { usedWordIds: usedWordIds },
              function () {}
            );
          }
        }
      });
      document.getElementById("wordOfTheDay").innerHTML = word.word;
      document.getElementById("partOfSpeech").innerHTML = word.part_of_speech;
      document.getElementById("definition").innerHTML = word.definition;
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

function setLastWordOfTheDay() {
  fetch("json/wordOfTheDay.json")
    .then((response) => response.json())
    .then((data) => {
      chrome.storage.local.get({ usedWordIds: [] }, function (result) {
        let usedWordIds = result.usedWordIds;
        let lastUsedWordId = usedWordIds[usedWordIds.length - 1];
        let word = data[lastUsedWordId - 1];
        document.getElementById("wordOfTheDay").innerHTML = word.word;
        document.getElementById("partOfSpeech").innerHTML = word.part_of_speech;
        document.getElementById("definition").innerHTML = word.definition;
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

function setNewFactOfTheDay() {
  fetch("json/factOfTheDay.json")
    .then((response) => response.json())
    .then((data) => {
      let randomNumber = Math.floor(Math.random() * Object.keys(data).length);
      let fact = data[randomNumber];

      chrome.storage.local.get({ usedFactIds: [] }, function (result) {
        if (!result.usedFactIds) {
          let usedFactIds = [];
          usedFactIds.push(fact.id);
          chrome.storage.local.set(
            { usedFactIds: usedFactIds },
            function () {}
          );
        } else {
          let usedFactIds = result.usedFactIds;
          if (usedFactIds.includes(fact.id)) {
            setNewFactOfTheDay();
          } else {
            usedFactIds.push(fact.id);
            chrome.storage.local.set(
              { usedFactIds: usedFactIds },
              function () {}
            );
          }
        }
      });
      document.getElementById("factOfTheDay").innerHTML = fact.fact;
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

function setLastFactOfTheDay() {
  fetch("json/factOfTheDay.json")
    .then((response) => response.json())
    .then((data) => {
      chrome.storage.local.get({ usedFactIds: [] }, function (result) {
        let usedFactIds = result.usedFactIds;
        let lastUsedFactId = usedFactIds[usedFactIds.length - 1];
        let fact = data[lastUsedFactId - 1];
        document.getElementById("factOfTheDay").innerHTML = fact.fact;
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

function setNewQuestionOfTheDay() {
  fetch("json/questionOfTheDay.json")
    .then((response) => response.json())
    .then((data) => {
      let randomNumber = Math.floor(Math.random() * Object.keys(data).length);
      let question = data[randomNumber];

      chrome.storage.local.get({ usedQuestionIds: [] }, function (result) {
        if (!result.usedQuestionIds) {
          let usedQuestionIds = [];
          usedQuestionIds.push(question.id);
          chrome.storage.local.set(
            { usedQuestionIds: usedQuestionIds },
            function () {}
          );
        } else {
          let usedQuestionIds = result.usedQuestionIds;
          if (usedQuestionIds.includes(question.id)) {
            setNewQuestionOfTheDay();
          } else {
            usedQuestionIds.push(question.id);
            chrome.storage.local.set(
              { usedQuestionIds: usedQuestionIds },
              function () {}
            );
          }
        }
      });
      document.getElementById("questionOfTheDay").innerHTML = question.question;
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}

function setLastQuestionOfTheDay() {
  fetch("json/questionOfTheDay.json")
    .then((response) => response.json())
    .then((data) => {
      chrome.storage.local.get({ usedQuestionIds: [] }, function (result) {
        let usedQuestionIds = result.usedQuestionIds;
        let lastUsedQuestionId = usedQuestionIds[usedQuestionIds.length - 1];
        let question = data[lastUsedQuestionId - 1];
        document.getElementById("questionOfTheDay").innerHTML =
          question.question;
      });
    })
    .catch((error) => console.error("Error fetching JSON:", error));
}
