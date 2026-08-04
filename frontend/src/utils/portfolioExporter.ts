/**
 * Portfolio Code Exporter Utility
 * Generates production-ready standalone HTML/CSS/JS and React source code bundles.
 */

export interface PortfolioData {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  githubUrl?: string;
  linkedinUrl?: string;
  theme: "developer_terminal" | "executive_serif" | "minimalist_grid" | "creative_gradient";
  accentColor: string;
  projects: Array<{
    title: string;
    description: string;
    tags: string[];
    link?: string;
  }>;
  skills: string[];
}

/**
 * Generate complete standalone HTML5 code bundle for instant web deployment.
 */
export function generateStandaloneHTML(data: PortfolioData): string {
  const skillsBadges = data.skills
    .map((s) => `<span class="skill-badge">${s}</span>`)
    .join(" ");

  const projectsCards = data.projects
    .map(
      (p) => `
      <div class="project-card">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="tags">
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join(" ")}
        </div>
        ${p.link ? `<a href="${p.link}" target="_blank" rel="noopener">View Project →</a>` : ""}
      </div>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name} — ${data.title}</title>
  <meta name="description" content="${data.bio.replace(/"/g, '&quot;')}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&family=Fira+Code:wght@400;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: ${data.accentColor || "#2563EB"};
      --bg: #0B0F19;
      --card-bg: #111827;
      --text: #F9FAFB;
      --text-muted: #9CA3AF;
      --border: #1F2937;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      padding: 2rem 1rem;
    }
    .container { max-width: 900px; margin: 0 auto; }
    header { padding: 4rem 0 3rem; border-bottom: 1px solid var(--border); }
    h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text); }
    .subtitle { font-size: 1.2rem; color: var(--primary); font-weight: 600; margin-bottom: 1rem; }
    .bio { font-size: 1rem; color: var(--text-muted); max-width: 650px; margin-bottom: 1.5rem; }
    .contact-links { display: flex; gap: 1rem; flex-wrap: wrap; }
    .contact-links a { color: var(--text); background: var(--card-bg); border: 1px solid var(--border); padding: 0.5rem 1rem; border-radius: 8px; text-decoration: none; font-size: 0.875rem; font-weight: 600; transition: all 0.2s; }
    .contact-links a:hover { border-color: var(--primary); color: var(--primary); }
    section { padding: 3rem 0; border-bottom: 1px solid var(--border); }
    h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 1.5rem; color: var(--text); }
    .skills-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .skill-badge { background: var(--card-bg); border: 1px solid var(--border); color: var(--primary); font-size: 0.8rem; font-weight: 600; padding: 0.4rem 0.8rem; border-radius: 6px; }
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
    .project-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; transition: transform 0.2s; }
    .project-card:hover { transform: translateY(-4px); border-color: var(--primary); }
    .project-card h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; }
    .project-card p { font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem; }
    .tags { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1rem; }
    .tag { font-size: 0.7rem; font-family: 'Fira Code', monospace; background: var(--bg); border: 1px solid var(--border); color: var(--text-muted); padding: 0.2rem 0.5rem; border-radius: 4px; }
    .project-card a { color: var(--primary); font-size: 0.85rem; font-weight: 700; text-decoration: none; }
    footer { padding: 3rem 0; text-align: center; color: var(--text-muted); font-size: 0.85rem; }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>${data.name}</h1>
      <div class="subtitle">${data.title}</div>
      <p class="bio">${data.bio}</p>
      <div class="contact-links">
        <a href="mailto:${data.email}">✉ ${data.email}</a>
        ${data.githubUrl ? `<a href="${data.githubUrl}" target="_blank" rel="noopener">GitHub</a>` : ""}
        ${data.linkedinUrl ? `<a href="${data.linkedinUrl}" target="_blank" rel="noopener">LinkedIn</a>` : ""}
      </div>
    </header>

    <section>
      <h2>Core Technical Skills</h2>
      <div class="skills-grid">
        ${skillsBadges}
      </div>
    </section>

    <section>
      <h2>Featured Engineering Projects</h2>
      <div class="projects-grid">
        ${projectsCards}
      </div>
    </section>

    <footer>
      <p>© ${new Date().getFullYear()} ${data.name}. Built with ResumeFlow AI Portfolio Engine.</p>
    </footer>
  </div>
</body>
</html>`;
}

/**
 * Trigger client-side file download of standalone HTML file.
 */
export function downloadPortfolioHTML(data: PortfolioData) {
  const htmlContent = generateStandaloneHTML(data);
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${data.name.toLowerCase().replace(/\s+/g, "_")}_portfolio.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
