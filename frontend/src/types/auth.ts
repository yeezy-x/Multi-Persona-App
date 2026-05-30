export type User = {
  id: string;
  name: string;
}

export type AuthContextType = {
  user: User | null;
  login: (user:User) => void;
  logout: () => void;
};