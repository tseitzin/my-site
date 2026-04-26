export const site = {
  name: "Tim Seitzinger",
  shortName: "Tim",
  domain: "timseitzinger.me",
  url: "https://timseitzinger.me",
  email: "tseitzinger@gmail.com",
  tagline:
    "Engineering leader scaling teams, modernizing SaaS platforms, and embedding AI into the SDLC.",
  description:
    "Tim Seitzinger — Director of Software Engineering. 20+ years scaling teams, modernizing cloud platforms, and embedding AI into the SDLC.",
  location: "Harrisburg, PA",
  social: {
    github: "https://github.com/", // TODO: add username
    linkedin: "https://www.linkedin.com/in/tim-seitzinger/",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export type Project = {
  name: string;
  description: string;
  url?: string;
  repo?: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "Project One",
    description:
      "A short description of what this project does and why it matters. Replace with your real apps.",
    url: "https://app1.timseitzinger.me",
    tags: ["Heroku", "Node.js"],
  },
  {
    name: "Project Two",
    description:
      "Another project. Add a one or two sentence summary plus the tech stack.",
    url: "https://app2.timseitzinger.me",
    tags: ["Heroku", "Python"],
  },
  {
    name: "Project Three",
    description: "A third example. You can add as many of these as you'd like.",
    tags: ["Side project"],
  },
];
