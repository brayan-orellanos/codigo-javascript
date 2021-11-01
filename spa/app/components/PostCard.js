export function PostCard(props) {
  let { title, date, slug, _embedded, id } = props;
  let dateFormate = new Date(date).toLocaleDateString(),
    urlPoster = _embedded["wp:featuredmedia"]
      ? _embedded["wp:featuredmedia"][0].source_url
      : "app/assets/icons8-share.svg";

  document.addEventListener("click", (e) => {
    if (!e.target.matches(".post-card a")) return false;

    localStorage.setItem("wpPostId", e.target.dataset.id);
  });

  return `
        <article class="post-card">
          <img src="${urlPoster}" alt="${title.rendered}">
          <h2>${title.rendered}</h2>
          <p>
            <time datetime="${dateFormate}">${dateFormate}</time>
            <a href="#/${slug}" data-id="${id}">Ver publicacion</a>
          </p>
        </article>
    `;
}
