// Project type definitions based on Supabase schema

export type ProjectStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface Project {
  id: string;
  client_id: string;
  title: string;
  description?: string;
  category?: string;
  budget: number;
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectDTO {
  client_id: string;
  title: string;
  description?: string;
  category?: string;
  budget: number;
}

export interface UpdateProjectDTO {
  title?: string;
  description?: string;
  category?: string;
  budget?: number;
  status?: ProjectStatus;
}

export interface ProjectWithClient extends Project {
  client: {
    id: string;
    username: string;
    name?: string;
    reputation_score: number;
  };
}
