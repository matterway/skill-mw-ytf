export type Resolver<T> = (value: T) => void;

// Export types used across your skills here
export interface SkillData {
  // Example data
  id: number;
}

export interface Entry {
  projectName: string;
  startDate?: string;
  targetEndDate?: string;
  budget?: string;
}
