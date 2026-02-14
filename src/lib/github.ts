/**
 * GitHub API utilities for fetching public repos
 */

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: 'data' | 'web' | 'fullstack';
  technologies: string[];
  liveUrl: string | null;
  githubUrl: string;
  featured: boolean;
  year: string;
}

// Display name overrides for known repos
const DISPLAY_NAMES: Record<string, string> = {
  'FidOS': 'FidOS - macOS-Inspired Portfolio',
  'Regional-Bank-Cloud-Data-Platform': 'End-to-End Cloud Data Platform - Regional Development Bank',
  'IMF-CD-Dashboard': 'IMF Capacity Development Dashboard',
  'PaidIn-App': 'PaidIn - Full-Stack SaaS Platform',
  'PaidIn-Website': 'PaidIn - Marketing Website',
};

// Featured repos (shown in Featured section)
const FEATURED_REPOS = new Set([
  'FidOS',
  'Regional-Bank-Cloud-Data-Platform',
  'IMF-CD-Dashboard',
  'PaidIn-App',
]);

// Tech hints from repo name/description for categorization
function inferTechnologies(repo: GitHubRepo): string[] {
  const techs: Set<string> = new Set();
  const desc = (repo.description || '').toLowerCase();
  const name = repo.name.toLowerCase();

  if (repo.language) techs.add(repo.language);

  // Data & ETL
  if (desc.includes('aws') || desc.includes('glue') || desc.includes('redshift') || desc.includes('s3') || name.includes('data')) techs.add('AWS');
  if (desc.includes('airflow') || desc.includes('orchestration')) techs.add('Apache Airflow');
  if (desc.includes('spark')) techs.add('Apache Spark');
  if (desc.includes('dbt')) techs.add('dbt');
  if (desc.includes('python') || repo.language === 'Python') techs.add('Python');
  if (desc.includes('sql') || desc.includes('etl') || desc.includes('pipeline')) techs.add('SQL');
  if (desc.includes('terraform')) techs.add('Terraform');
  if (desc.includes('power bi') || desc.includes('powerbi')) techs.add('Power BI');
  if (desc.includes('pandas')) techs.add('Pandas');

  // Web
  if (desc.includes('next.js') || desc.includes('nextjs')) techs.add('Next.js');
  if (desc.includes('react')) techs.add('React');
  if (desc.includes('typescript') || repo.language === 'TypeScript') techs.add('TypeScript');
  if (desc.includes('tailwind')) techs.add('Tailwind CSS');
  if (desc.includes('flask')) techs.add('Flask');
  if (desc.includes('fastapi')) techs.add('FastAPI');
  if (desc.includes('postgresql') || desc.includes('postgres')) techs.add('PostgreSQL');
  if (desc.includes('sqlalchemy')) techs.add('SQLAlchemy');
  if (desc.includes('vite')) techs.add('Vite');

  return Array.from(techs);
}

function inferCategory(repo: GitHubRepo): 'data' | 'web' | 'fullstack' {
  const desc = (repo.description || '').toLowerCase();
  const name = repo.name.toLowerCase();

  if (
    desc.includes('data platform') ||
    desc.includes('data pipeline') ||
    desc.includes('etl') ||
    desc.includes('dashboard') ||
    desc.includes('analytics') ||
    name.includes('data') ||
    name.includes('dashboard')
  ) {
    return 'data';
  }

  if (
    desc.includes('full-stack') ||
    desc.includes('fullstack') ||
    desc.includes('saas') ||
    desc.includes('backend') && desc.includes('frontend')
  ) {
    return 'fullstack';
  }

  return 'web';
}

function formatRepoName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function transformRepoToProject(repo: GitHubRepo): Project {
  const title = DISPLAY_NAMES[repo.name] || formatRepoName(repo.name);
  const description = repo.description || `A ${formatRepoName(repo.name)} project.`;
  const year = new Date(repo.updated_at).getFullYear().toString();
  const technologies = inferTechnologies(repo);
  if (technologies.length === 0 && repo.language) technologies.push(repo.language);

  return {
    id: repo.id,
    title,
    description,
    longDescription: description,
    category: inferCategory(repo),
    technologies,
    liveUrl: repo.homepage || null,
    githubUrl: repo.html_url,
    featured: FEATURED_REPOS.has(repo.name),
    year,
  };
}

const GITHUB_API = 'https://api.github.com';

export async function fetchPublicRepos(username: string): Promise<Project[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${username}/repos?per_page=100&sort=updated&type=owner`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const repos: GitHubRepo[] = await res.json();
  const projects = repos
    .filter((r) => !r.fork && !r.archived)
    .map(transformRepoToProject)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); // Featured first

  return projects;
}
