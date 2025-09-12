"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";
import { UserDetails } from "../schemas/user-details";
import { CreditCard, EligibilityResult } from "../../../types/credit-card";

interface EligibilityState {
  userDetails: UserDetails | null;
  eligibleCards: EligibilityResult[];
  allCards: CreditCard[];
  selectedCards: Set<string>;
  isLoading: boolean;
  error: string | null;
}

export type EligibilitySnapshot = Omit<EligibilityState, "selectedCards"> & {
  selectedCards: string[];
};

// Action types
type EligibilityAction =
  | { type: "SET_USER_DETAILS"; payload: UserDetails }
  | { type: "SET_ELIGIBLE_CARDS"; payload: EligibilityResult[] }
  | { type: "SET_ALL_CARDS"; payload: CreditCard[] }
  | { type: "SET_SELECTED_CARDS"; payload: Set<string> }
  | { type: "TOGGLE_CARD_SELECTION"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_ERROR" }
  | { type: "RESET_STATE" }
  | { type: "HYDRATE"; payload: EligibilitySnapshot };

// Initial state
const initialState: EligibilityState = {
  userDetails: null,
  eligibleCards: [],
  allCards: [],
  selectedCards: new Set(),
  isLoading: false,
  error: null,
};

// Reducer
function eligibilityReducer(
  state: EligibilityState,
  action: EligibilityAction
): EligibilityState {
  switch (action.type) {
    case "SET_USER_DETAILS":
      return {
        ...state,
        userDetails: action.payload,
        error: null,
      };

    case "SET_ELIGIBLE_CARDS":
      return {
        ...state,
        eligibleCards: action.payload,
        selectedCards: new Set(), // Reset selections when new cards are loaded
        error: null,
      };

    case "SET_ALL_CARDS":
      return {
        ...state,
        allCards: action.payload,
        error: null,
      };

    case "SET_SELECTED_CARDS":
      return {
        ...state,
        selectedCards: action.payload,
      };

    case "TOGGLE_CARD_SELECTION": {
      const newSelection = new Set(state.selectedCards);
      if (newSelection.has(action.payload)) {
        newSelection.delete(action.payload);
      } else {
        newSelection.add(action.payload);
      }
      return {
        ...state,
        selectedCards: newSelection,
      };
    }

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "RESET_STATE":
      return initialState;

    case "HYDRATE": {
      const {
        userDetails,
        eligibleCards,
        allCards,
        selectedCards,
        isLoading,
        error,
      } = action.payload;
      return {
        userDetails: userDetails ?? null,
        eligibleCards: eligibleCards ?? [],
        allCards: allCards ?? [],
        selectedCards: new Set(selectedCards ?? []),
        isLoading: !!isLoading,
        error: error ?? null,
      };
    }

    default:
      return state;
  }
}

// Context
interface EligibilityContextType {
  state: EligibilityState;
  dispatch: React.Dispatch<EligibilityAction>;
  // Helper functions
  setUserDetails: (details: UserDetails) => void;
  setEligibleCards: (cards: EligibilityResult[]) => void;
  setAllCards: (cards: CreditCard[]) => void;
  toggleCardSelection: (cardId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  resetState: () => void;
  hydrate: (snapshot: EligibilitySnapshot) => void;
  // Computed values
  selectedCardsData: EligibilityResult[];
  totalSelectedCredit: number;
  hasUserDetails: boolean;
  hasEligibleCards: boolean;
}

const EligibilityContext = createContext<EligibilityContextType | undefined>(
  undefined
);

// Provider component
interface EligibilityProviderProps {
  children: ReactNode;
  initialCards?: CreditCard[]; // Server-fetched cards
}

export const EligibilityProvider = ({
  children,
  initialCards,
}: EligibilityProviderProps) => {
  const [state, dispatch] = useReducer(eligibilityReducer, initialState);

  // Add this to see if provider is unmounting
  React.useEffect(() => {
    console.log("EligibilityProvider MOUNTED");
    return () => {
      console.log("EligibilityProvider UNMOUNTED - THIS SHOULD NOT HAPPEN!");
    };
  }, []);

  // Helper functions - memoized to prevent infinite re-renders
  const setUserDetails = useCallback((details: UserDetails) => {
    dispatch({ type: "SET_USER_DETAILS", payload: details });
  }, []);

  const setEligibleCards = useCallback((cards: EligibilityResult[]) => {
    dispatch({ type: "SET_ELIGIBLE_CARDS", payload: cards });
  }, []);

  const setAllCards = useCallback((cards: CreditCard[]) => {
    dispatch({ type: "SET_ALL_CARDS", payload: cards });
  }, []);

  // Hydrate with initial data on mount
  React.useEffect(() => {
    if (initialCards && initialCards.length > 0) {
      setAllCards(initialCards);
    }
  }, [initialCards, setAllCards]);

  const toggleCardSelection = useCallback((cardId: string) => {
    dispatch({ type: "TOGGLE_CARD_SELECTION", payload: cardId });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, []);

  const setError = useCallback((error: string | null) => {
    dispatch({ type: "SET_ERROR", payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "CLEAR_ERROR" });
  }, []);

  const resetState = useCallback(() => {
    dispatch({ type: "RESET_STATE" });
  }, []);

  const hydrate = useCallback((snapshot: EligibilitySnapshot) => {
    dispatch({ type: "HYDRATE", payload: snapshot });
  }, []);

  // Computed values
  const selectedCardsData = state.eligibleCards.filter((result) =>
    state.selectedCards.has(result.card.id)
  );

  const totalSelectedCredit = selectedCardsData.reduce(
    (total, result) => total + result.card.creditLimit,
    0
  );

  const hasUserDetails = state.userDetails !== null;
  const hasEligibleCards = state.eligibleCards.length > 0;

  const value: EligibilityContextType = {
    state,
    dispatch,
    setUserDetails,
    setEligibleCards,
    setAllCards,
    toggleCardSelection,
    setLoading,
    setError,
    clearError,
    resetState,
    hydrate,
    selectedCardsData,
    totalSelectedCredit,
    hasUserDetails,
    hasEligibleCards,
  };

  return (
    <EligibilityContext.Provider value={value}>
      {children}
    </EligibilityContext.Provider>
  );
};

// Hook to use the context
export const useEligibility = () => {
  const context = useContext(EligibilityContext);
  if (context === undefined) {
    throw new Error(
      "useEligibility must be used within an EligibilityProvider"
    );
  }
  return context;
};
