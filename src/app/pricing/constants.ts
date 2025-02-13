import { type LucideIcon, Rabbit, Squirrel, Turtle } from 'lucide-react';

export interface Price {
  id: string;
  amount: number;
  freq?: string;
}

export interface Product {
  id: string;
  name: string;
  price: Price;
  features: string[];
  limits: ResourceLimit[];
  icon: LucideIcon;
  color: string;
}

export const FREE_TIER_ID = 'free';

export interface Limit {
  name: string;
}

type Resource = 'activeTodos' | 'projects'

interface ResourceMeta {
  name: Resource;
  label: string;
}

export const RESOURCES: Record<Resource, ResourceMeta> = {
  activeTodos: { name: 'activeTodos', label: 'active todos' },
  projects: { name: 'projects', label: 'projects' }
}

export interface ResourceLimit {
  resource: Resource;
  amount: number;
}

export const PRODUCTS: Product[] = [
  {
    id: FREE_TIER_ID,
    name: 'Starter',
    price: {
      id: FREE_TIER_ID,
      amount: 0,
    },
    limits: [{
      resource: 'activeTodos',
      amount: 4,
    },
    {
      resource: 'projects', amount: 2,
    }],
    features: ['Up to 10 active todos', 'Up to 2 projects'],
    icon: Turtle,
    color: 'text-green-600'
  },
  {
    id: 'prod_RkDnyMTkEtYTRn',
    name: 'Mover',
    price: {
      id: 'price_1QqjLv09C6B25vuljauuuCRh',
      amount: 300,
      freq: '/mo'
    },
    limits: [{
      resource: 'activeTodos',
      amount: 20,
    },
    {
      resource: 'projects',
      amount: 3,
    }],
    features: ['Up to 100 active todos', 'Up to 10 projects'],
    icon: Squirrel,
    color: 'text-orange-600/75'
  },
  {
    id: 'prod_RkDnxPUsaC3ddQ',
    name: 'Shaker',
    price: {
      id: 'price_1QqjMI09C6B25vulgb1ONh6c',
      amount: 500,
      freq: '/mo'
    },
    limits: [{
      resource: 'activeTodos',
      amount: 100,
    },
    {
      resource: 'projects',
      amount: 6,
    }],
    features: ['Up to 500 active todos', 'Up to 25 projects'],
    icon: Rabbit,
    color: 'text-slate-400'
  },
];