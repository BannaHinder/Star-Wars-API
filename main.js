
//var starwars = require('starwars'); WHY U NO WORK?????????
//console.log(starwars)
//jag behöver en JS länk men fattar inte var man får tag på den jäveln

class Character {
  constructor(name, gender, height, mass, hairColor, pictureUrl) {
    this.Name = name;
    this.Gender = gender;
    this.Height = height;
    this.Mass = mass;
    this.HairColor = hairColor;
    this.PictureUrl = pictureUrl;
  }
  //metoder för jämförelse;
  compareHeight(char) {
    if (parseInt(this.Height) === parseInt(char.Height)) {
      return `${char.Name} is the same length as I am!`;
    } else if (parseInt(this.Height) < parseInt(char.Height)) {
      return `${char.Name} is ${
        parseInt(char.Height) - parseInt(this.Height)
      }cm taller than me!`;
    } else {
      return `I'm ${
        parseInt(this.Height) - parseInt(char.Height)
      }cm taller than ${char.Name}!`;
    }
  }
  compareWeight(char) {
    let mass1 = parseInt(this.Mass.split(",").join(""));
    let mass2 = parseInt(char.Mass.split(",").join(""));
    if (mass1 === mass2) {
      return `${char.Name} is just as heavy as I am!`;
    } else if (mass1 < mass2) {
      return `${char.Name} is ${mass2 - mass1}kg heavier than me!`;
    } else {
      return `I wheigh ${mass1 - mass2}kg more than ${char.Name}!`;
    }
  }
  //DONE
  compareHairColor(char) {
    if (this.HairColor === "n/a") {
      if (char.HairColor === "n/a") {
        return `${char.Name} has no hair just like me!`;
      } else {
        return `Unlike me, ${char.Name} has got hair! And its ${char.HairColor}!`;
      }
    } else {
      if (this.HairColor === char.HairColor) {
        return `${char.Name} has got ${char.HairColor}-hair, just like me!`;
      } else if (char.HairColor === "n/a") {
        return `Unlike me, ${char.Name} hasn't got any hair!`;
      } else {
        return `Unlike me, ${char.Name} has got ${char.HairColor}-hair!`;
      }
    }
  }
  compareGender(char) {
    if (this.Gender === char.Gender) {
      return `${char.Name} and I have the same gender, weird huh!`;
    } else {
      return `${char.Name} and I do not have the same gender!`;
    }
  }
}

//hade tänkt lägga in en loading-screen i väntan på SWAPI-response
//men allt verkar krånligt utan react så :(
document.querySelector(".form").addEventListener("submit", (x) => {
  x.preventDefault();
  x.target.lastElementChild.disabled = true;
  (async () => {
    const char1Select = document.querySelector("#select1").value;
    let char1 = await fetchCharacter(char1Select, 1);
    console.log(char1);
    const char2Select = document.querySelector("#select2").value;
    let char2 = await fetchCharacter(char2Select, 2);
    console.log(char2);
    drawCharacter(char1, char2, 1);
    drawCharacter(char2, char1, 2);
  })();
});

const fetchCharacter = async (value) => {
  //console.log(value);
  try {
    const {
      data: {
        results: {
          0: { name, gender, height, mass, hair_color },
        },
      },
    } = await axios.get(`https://swapi.dev/api/people`, {
      params: {
        search: value,
      },
    });
    const pictureURL = getThatPicture(value);
    const character = new Character(
      name,
      gender,
      height,
      mass,
      hair_color,
      pictureURL
    );
    return character;
  } catch (error) {
    console.log(error);
  }
};

function drawCharacter(character1, character2, index) {
  document.querySelector(`.name${index}`).innerHTML = character1.Name;
  document.querySelector(
    `.img${index}`
  ).innerHTML = `<img  src=${character1.PictureUrl} alt="">`;
  const para = document.createElement("p");
  para.classList.add("action");
  document.querySelector(`.char${index}`).appendChild(para);
  let buttonsDiv = document.querySelector(`.buttons${index}`);
  addButtonEvent(character1, character2, buttonsDiv);
}

//hade detta kunnat göras smidigare? Säkert! kom jag på ngt bättre? NEJ.
function addButtonEvent(char1, char2, buttonsDiv) {
  const weightBtn = document.createElement("button");
  weightBtn.classList = "button";
  weightBtn.innerHTML = "COMPARE WIEGHT";
  weightBtn.addEventListener("click", (x) => {
    console.log(x.target.parentElement.parentElement.lastElementChild);
    x.target.parentElement.parentElement.lastElementChild.innerHTML =
      char1.compareWeight(char2);
  });
  const heightBtn = document.createElement("button");
  heightBtn.classList = "button";
  heightBtn.innerHTML = "COMPARE HEIGHT";
  heightBtn.addEventListener("click", (x) => {
    console.log(x.target.parentElement.parentElement.lastElementChild);
    x.target.parentElement.parentElement.lastElementChild.innerHTML =
      char1.compareHeight(char2);
  });
  const hairColorBtn = document.createElement("button");
  hairColorBtn.classList = "button";
  hairColorBtn.innerHTML = "COMPARE HAIR";
  hairColorBtn.addEventListener("click", (x) => {
    console.log(x.target.parentElement.parentElement.lastElementChild);
    x.target.parentElement.parentElement.lastElementChild.innerHTML =
      char1.compareHairColor(char2);
  });
  const genderBtn = document.createElement("button");
  genderBtn.classList = "button";
  genderBtn.innerHTML = "COMPARE GENDER";
  genderBtn.addEventListener("click", (x) => {
    console.log(x.target.parentElement.parentElement.lastElementChild);
    x.target.parentElement.parentElement.lastElementChild.innerHTML =
      char1.compareGender(char2);
  });
  buttonsDiv.append(weightBtn, heightBtn, hairColorBtn, genderBtn);
}

function getThatPicture(value) {
  //Är det såhär man gör? det verkade svårt att göra en automatiserad bildgoogling
  switch (value) {
    case "Luke Skywalker":
      return "./img/LUKE.jpg";
    case "Yoda":
      return "./img/YODA.jpg";
    case "R2-D2":
      return "./img/R2D2.jpg";
    case "Darth Vader":
      return "./img/DARTH.jpg";
    case "Leia Organa":
      return "./img/LEIA.jpg";
    case "Obi-Wan Kenobi":
      return "./img/OBI.jpg";
    case "Han Solo":
      return "./img/HAN_SOLO.jpg";
    case "Jabba":
      return "./img/JABBA.jpg";
    default:
      return "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bbyoda-1575303784.jpeg?crop=1xw:0.8888888888888888xh;center,top&resize=1200:*";
  }
}
