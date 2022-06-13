/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateReataurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createRestaurant
// ====================================================

export interface createRestaurant_createReataurant {
  __typename: "CreateReataurantOutput";
  error: string | null;
  ok: boolean;
  restaurantId: number;
}

export interface createRestaurant {
  createReataurant: createRestaurant_createReataurant;
}

export interface createRestaurantVariables {
  input: CreateReataurantInput;
}
