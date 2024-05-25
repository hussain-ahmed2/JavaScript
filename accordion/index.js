const root = document.getElementById("root");
const data = [
  {
    title: "Section 1",
    content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quis sapiente
    laborum cupiditate possimus labore, hic temporibus velit dicta earum
    suscipit commodi eum enim atque at? Et perspiciatis dolore iure
    voluptatem.`,
  },
  {
    title: "Section 2",
    content: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia veniam
    reprehenderit nam assumenda voluptatem ut. Ipsum eius dicta, officiis
    quaerat iure quos dolorum accusantium ducimus in illum vero commodi
    pariatur? Impedit autem esse nostrum quasi, fugiat a aut error cumque
    quidem maiores doloremque est numquam praesentium eos voluptatem amet!
    Repudiandae, mollitia id reprehenderit a ab odit!`,
  },
  {
    title: "Section 3",
    content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
    quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
    dolor ut sequi minus iste? Quas?`,
  },
  {
    title: "Section 4",
    content: `Sapiente expedita hic obcaecati, laboriosam similique omnis architecto ducimus magnam accusantium corrupti
    quam sint dolore pariatur perspiciatis, necessitatibus rem vel dignissimos
    dolor ut sequi minus iste? Quas?, mollitia id reprehenderit a ab odit!`,
  },
];

const container = document.createElement("div");
container.setAttribute("class", "container");

let multiSelection = false;
let prevIndex = null;

const button = document.createElement("button");
button.setAttribute("class", "btn");
button.textContent = `${multiSelection ? "Disable" : "Enable"} Multi Selection`;
button.onclick = () => {
  multiSelection = multiSelection ? false : true;
  reset(prevIndex);
  button.textContent = `${
    multiSelection ? "Disable" : "Enable"
  } Multi Selection`;
};

container.appendChild(button);

data.forEach((el, index) => {
  const item = document.createElement("div");
  item.setAttribute("class", "item");

  const title = document.createElement("h1");
  title.setAttribute("class", "title");
  title.textContent = el.title;
  title.id = index;

  const content = document.createElement("p");
  content.setAttribute("class", "content");
  content.textContent = el.content;

  item.appendChild(title);

  title.onclick = () => {
    if (multiSelection) {
      if (item.lastChild !== content) {
        item.appendChild(content);
        title.classList.toggle('active');
        prevIndex = index;
      } else {
        item.removeChild(content);
        title.classList.toggle("active");
        prevIndex = null;
      }
    } else {
      handleMultiSelection(index, content);
    }
  };

  container.appendChild(item);
  root.appendChild(container);
});

const title = document.querySelectorAll(".title");
const item = document.querySelectorAll(".item");

const handleMultiSelection = (index, content) => {
  for (let i = 0; i < title.length; i++) {
    if (i == index) {
      if (prevIndex == i) {
        item[i].lastChild.remove();
        title[i].classList.toggle("active");
        prevIndex = null;
      } else {
        item[i].appendChild(content);
        title[i].classList.toggle("active");
        prevIndex = i;
      }
    } else {
      if (item[i].childNodes.length > 1) {
        item[i].lastChild.remove();
        title[i].classList.toggle("active");
      }
    }
  }
};

const reset = (prevIndex) => {
  for (let i = 0; i < title.length; i++) {
    if (item[i].childNodes.length > 1 && i !== prevIndex) {
      item[i].lastChild.remove();
      title[i].classList.toggle("active");
    }
  }
};
