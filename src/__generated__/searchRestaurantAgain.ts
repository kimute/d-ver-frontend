/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurantAgain
// ====================================================

export interface searchRestaurantAgain_searchRestaurant_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurantAgain_searchRestaurant_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImg: string;
  category: searchRestaurantAgain_searchRestaurant_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface searchRestaurantAgain_searchRestaurant {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: searchRestaurantAgain_searchRestaurant_restaurants[] | null;
}

export interface searchRestaurantAgain {
  searchRestaurant: searchRestaurantAgain_searchRestaurant;
}

export interface searchRestaurantAgainVariables {
  input: SearchRestaurantInput;
}
