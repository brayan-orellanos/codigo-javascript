export function Post(props) {
  let { title, content, date } = props;
  let dateFormate = new Date(date).toLocaleDateString();

  return `
    <section class="post-page">
      <aside>
        <h2>${title.rendered}</h2>
        <time datetime="${date}">${dateFormate}</time>
      </aside>
      <hr>
      <article>${content.rendered}</article>
    </section>
  `;
}
