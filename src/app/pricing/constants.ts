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
  icon: LucideIcon
}

export const PRODUCTS = [
	{
		id: 'free',
		name: 'Starter',
		price: {
			id: 'free',
			amount: 0,
		},
		features: ['Up to 10 active todos', 'Up to 2 projects'],
    icon: Turtle,
	},
	{
    id: 'prod_RkDnyMTkEtYTRn',
		name: 'Mover',
		price: {
      id: 'price_1QqjLv09C6B25vuljauuuCRh',
			amount: 300,
      freq: '/mo'
		},
		features: ['Up to 100 active todos', 'Up to 10 projects'],
    icon: Squirrel,
	},
	{
    id: 'prod_RkDnxPUsaC3ddQ',
		name: 'Shaker',
		price: {
      id: 'price_1QqjMI09C6B25vulgb1ONh6c',
			amount: 500,
      freq: '/mo'
		},
		features: ['Up to 500 active todos', 'Up to 25 projects'],
    icon: Rabbit,
	},
];