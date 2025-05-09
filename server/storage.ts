import { 
  users, 
  type User, 
  type InsertUser, 
  weatherCache,
  type WeatherCache,
  type InsertWeatherCache,
  searchHistory,
  type SearchHistory,
  type InsertSearchHistory
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Weather cache operations
  getWeatherCache(lat: string, lon: string): Promise<WeatherCache | undefined>;
  addWeatherCache(cache: InsertWeatherCache): Promise<WeatherCache>;
  
  // Search history operations
  getSearchHistory(): Promise<SearchHistory[]>;
  addSearchHistory(search: InsertSearchHistory): Promise<SearchHistory>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private weatherCaches: Map<string, WeatherCache>;
  private searches: SearchHistory[];
  currentUserId: number;
  currentCacheId: number;
  currentSearchId: number;

  constructor() {
    this.users = new Map();
    this.weatherCaches = new Map();
    this.searches = [];
    this.currentUserId = 1;
    this.currentCacheId = 1;
    this.currentSearchId = 1;
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Weather cache operations
  async getWeatherCache(lat: string, lon: string): Promise<WeatherCache | undefined> {
    const cacheKey = `${lat},${lon}`;
    return this.weatherCaches.get(cacheKey);
  }
  
  async addWeatherCache(insertCache: InsertWeatherCache): Promise<WeatherCache> {
    const id = this.currentCacheId++;
    const createdAt = new Date();
    const cache: WeatherCache = { ...insertCache, id, createdAt };
    this.weatherCaches.set(insertCache.location, cache);
    return cache;
  }
  
  // Search history operations
  async getSearchHistory(): Promise<SearchHistory[]> {
    return this.searches;
  }
  
  async addSearchHistory(insertSearch: InsertSearchHistory): Promise<SearchHistory> {
    const id = this.currentSearchId++;
    const createdAt = new Date();
    const search: SearchHistory = { ...insertSearch, id, createdAt };
    this.searches.push(search);
    return search;
  }
}

export const storage = new MemStorage();
