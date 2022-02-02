const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/Vgufs5n18vzBAjzxI4Io/scores';

const listScores = () => document.querySelector('#list-scores');

const checkEmpty = () => {
  if (listScores().innerHTML === '') {
    const listItem = document.createElement('li');
    listItem.textContent = 'Recorded No Scores';
    listScores().appendChild(listItem);
  }
};

const scoresDisplay = (scores) => {
  scores.forEach((scoreObject) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${scoreObject.user}: ${scoreObject.score}`;
    listScores().appendChild(listItem);
  });
};

const getScoreObjects = async () => {
  const response = await fetch(url);
  const scores = (await response.json()).result;

  scoresDisplay(scores);
};

const refresh = async () => {
  listScores().innerHTML = '';
  await getScoreObjects();
  checkEmpty();
};

const addRefresh = () => {
  const button = document.querySelector('#refresh');
  button.addEventListener('click', () => {
    refresh();
  });
};

window.addEventListener('load', () => {
  refresh();
});

addRefresh();

const postScore = (scoreObject) => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(scoreObject),
  });
};

const submitAddFunc = () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const userInput = document.querySelector('#user');

    const object = {
      user: userInput.value,
      score: formData.get('score'),
    };

    postScore(object);
    form.reset();
  });
};

submitAddFunc();
