export function SearchCard(props) {
  let { id, title, _embedded } = props;
  let slug = _embedded.self[0].slug;
  let img = _embedded.self[0].jetpack_featured_media_url;

  return `
    <article class="post-card">
      <img src="${img}" alt="${title}">
      <h2>${title}</h2>
      <p>
        <a href="#/${slug}" id='${id}'>Ver publicacion</a>
      </p>
    </article>
  `;
}
