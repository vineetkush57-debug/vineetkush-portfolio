import { useState, useEffect } from 'react';

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  size: number;
}

export interface GithubProfile {
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  login: string;
  name: string | null;
  html_url: string;
}

export const useGithubData = (username: string) => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch Profile
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        if (!profileRes.ok) {
          throw new Error(`GitHub Profile fetch failed: ${profileRes.statusText}`);
        }
        const profileData = await profileRes.json();
        setProfile({
          avatar_url: profileData.avatar_url,
          bio: profileData.bio,
          followers: profileData.followers,
          following: profileData.following,
          public_repos: profileData.public_repos,
          login: profileData.login,
          name: profileData.name,
          html_url: profileData.html_url
        });

        // Fetch Repos
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!reposRes.ok) {
          throw new Error(`GitHub Repos fetch failed: ${reposRes.statusText}`);
        }
        const reposData: GithubRepo[] = await reposRes.json();
        
        // Filter out fork repositories or empty repositories if any, sort by stars and updates
        const filteredRepos = reposData
          .filter(repo => !repo.name.startsWith('.')) // Filter dotfiles
          .sort((a, b) => {
            // Sort by stars first, then size, then update date
            if (b.stargazers_count !== a.stargazers_count) {
              return b.stargazers_count - a.stargazers_count;
            }
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          });
          
        setRepos(filteredRepos);
      } catch (err: any) {
        console.error("Error fetching GitHub data:", err);
        setError(err.message || "Failed to load GitHub data");
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  return { profile, repos, loading, error };
};
