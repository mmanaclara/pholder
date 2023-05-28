const tbody = document.querySelector("tbody");
const formAdd = document.querySelector(".form-add");
const postsContainer = document.querySelector(".posts-container");
const formCreatePost = document.querySelector(".create-card");
const baseURL = "https://my-json-server.typicode.com/mmanaclara/pholder/users";
const postsUrl = "https://dev.codeleap.co.uk/careers/";

function createTrTemplate(id, name, email) {
  const trTemplate = `
  <tr id="${id}">
    <td>${name}</td>
    <td>${email}</td>
    <td class="fit">
      <button class="edit" type="button">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
    </td>
    <td class="fit">
      <button class="remove" type="button">
        <i class="fa-regular fa-trash-can"></i>
      </button>
    </td>
  </tr>
`;

  tbody.insertAdjacentHTML("beforeend", trTemplate);
}

async function getUsers() {
  try {
    const { data } = await axios.get(baseURL);

    data.map(({ id, name, email }) => {
      createTrTemplate(id, name, email);
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function getPosts() {
  try {
    const { data } = await axios.get(postsUrl);

    data.results.map((post) => console.log(post));
    data.results.map((post) => {
      const fDate = post.created_datetime;
      const postTemplate = `
      <article class="card" key="${post.id}">
        <header>
          <h2>${post.title}</h2>

          <button class="edit" type="button">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="remove" type="button">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </header>

        <div class="post-content">
          <div class="post-header">
            <strong>@${post.username.toLowerCase()}</strong>
            <span>${fDate}</span>
          </div>

          <p>
            ${post.content}
          </p>
        </div>
      </article>
    `;

      postsContainer.insertAdjacentHTML("beforebegin", postTemplate);
    });
  } catch (error) {
    console.log(error);
  }
}

getUsers();
getPosts();

function addUser(e) {
  e.preventDefault();

  const postId = Math.random();
  const inputNameValue = e.target.name.value;
  const inputEmailValue = e.target.email.value;
  console.log(inputNameValue, inputEmailValue);

  try {
    axios.post(baseURL, {
      id: postId,
      name: inputNameValue,
      email: inputEmailValue,
    });
  } catch (error) {
    console.log(error);
  }
}

formAdd.addEventListener("submit", addUser);

function createPost(e) {
  e.preventDefault();
  const title = e.target.title.value;
  const content = e.target.content.value;

  console.log(title, content);

  try {
    axios.post(postsUrl, {
      title: title,
      content: content,
      username: "London",
    });

    getPosts();
  } catch (error) {
    console.log(error);
  }
}

formCreatePost.addEventListener("submit", createPost);
