import { CategoryType } from '@/constants/colors';

export interface Artist {
  id: string;
  name: string;
  username: string;
  avatar: string;
  banner: string;
  category: CategoryType;
  subcategory: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  collaborations: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isAvailable: boolean;
  isLive: boolean;
  tags: string[];
  services: Service[];
  portfolio: PortfolioItem[];
  upcomingEvents: string[]; // event IDs
  mentorshipAvailable: boolean;
  collaborationInterests: string[];
  distance?: number; // km
}

export interface Service {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  category: string;
}

export interface PortfolioItem {
  id: string;
  type: 'image' | 'video';
  uri: string;
  thumbnail: string;
  title: string;
  likes: number;
  views: number;
}

export interface MapEvent {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  category: CategoryType;
  description: string;
  venue: string;
  address: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
  startTime: Date;
  endTime: Date;
  isLive: boolean;
  isHappeningSoon: boolean;
  distance: number; // meters
  ticketPrice: string;
  attendees: number;
  maxAttendees: number;
  imageUri: string;
  tags: string[];
}

export interface FeedPost {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  artistCategory: CategoryType;
  isVerified: boolean;
  type: 'image' | 'video' | 'reel';
  mediaUri: string;
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  views?: number;
  tags: string[];
  location: string;
  postedAt: Date;
  isLiked: boolean;
  isSaved: boolean;
}

export interface Collaboration {
  id: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  artistCategory: CategoryType;
  isVerified: boolean;
  type: CollabType;
  title: string;
  description: string;
  seeking: string[];
  compensation: string;
  location: string;
  date?: string;
  deadline?: string;
  distance: number;
  urgency: 'urgent' | 'soon' | 'flexible';
  tags: string[];
  applicants: number;
  postedAt: Date;
}

export type CollabType =
  | 'collaboration'
  | 'mentorship'
  | 'recruitment'
  | 'session'
  | 'project'
  | 'event';

export interface StoryItem {
  id: string;
  artistId: string;
  artistName: string;
  avatar: string;
  isLive: boolean;
  hasNew: boolean;
}
