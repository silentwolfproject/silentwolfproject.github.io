(function () {
  const grid = document.getElementById('projectsGrid');
  const preview = document.getElementById('projectsPreview');

  function cardHTML(r) {
    return `
      <a href="${r.url}" target="_blank" rel="noopener" class="project-card">
        <div class="project-card-head">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M4 4h6l2 3h8v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/></svg>
          <span>${r.name}</span>
        </div>
        <p>${r.description || 'Belum ada deskripsi.'}</p>
        <div class="project-card-foot">
          ${r.language ? `<span class="lang">${r.language}</span>` : ''}
          <span class="stars">
            <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ${r.stars || 0}
          </span>
        </div>
      </a>
    `;
  }

  function emptyHTML() {
    return `
      <div class="project-empty">
        <p>Belum ada project yang dirilis. Update akan dipublikasikan melalui TikTok.</p>
        <a href="https://tiktok.com/@silentwolfproject" target="_blank" rel="noopener" class="btn btn-ghost">TikTok</a>
      </div>
    `;
  }

  async function load(target, limit) {
    if (!target) return;
    try {
      const res = await fetch('data/projects.json');
      if (!res.ok) throw new Error('no data');
      const data = await res.json();
      let repos = data.repos || [];
      repos = repos.sort((a, b) => new Date(b.updated) - new Date(a.updated));
      if (limit) repos = repos.slice(0, limit);
      if (!repos.length) throw new Error('empty');
      target.innerHTML = repos.map(cardHTML).join('');
      target.querySelectorAll('.project-card').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.6s cubic-bezier(0.65,0,0.35,1), transform 0.6s cubic-bezier(0.65,0,0.35,1)';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 80);
      });
    } catch (e) {
      target.innerHTML = emptyHTML();
    }
  }

  load(grid, null);
  load(preview, 3);
})();