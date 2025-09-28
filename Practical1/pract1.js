const votes = {
  javascript: 0,
  python: 0,
  java: 0
};

function vote(language) {
  votes[language]++;
  updateVotes();
}

function updateVotes() {
  document.getElementById("jsVotes").textContent = "JavaScript: " + votes.javascript;
  document.getElementById("pyVotes").textContent = "Python: " + votes.python;
  document.getElementById("javaVotes").textContent = "Java: " + votes.java;
}


setInterval(() => {
  const languages = ['javascript', 'python', 'java'];
  const randomLang = languages[Math.floor(Math.random() * languages.length)];
  votes[randomLang]++;
  updateVotes();
}, 2000); 
