import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Profile state interface
interface ProfileState {
  isProfile: boolean;
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: string | null;
}

const initialState: ProfileState = {
  isProfile: false,
  name: "",
  age: "",
  height: "",
  weight: "",
  gender: null,
};

// Profile slice
const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileComplete: (state, action: PayloadAction<ProfileState>) => {
      return { ...state, ...action.payload, isProfile: true };
    },
    removeProfile: () => initialState,
  },
});

export const { setProfileComplete, removeProfile } = profileSlice.actions;

// Middleware to save state to AsyncStorage
const persistMiddleware = (store: any) => (next: any) => (action: any) => {
  const result = next(action);
  const state = store.getState();
  if (action.type === removeProfile.type) {
    AsyncStorage.removeItem("profileState").catch((error) =>
      console.error("Error removing state:", error)
    );
    AsyncStorage.clear();
  } else {
    AsyncStorage.setItem("profileState", JSON.stringify(state.profile)).catch(
      (error) => console.error("Error saving state:", error)
    );
  }
  return result;
};

// Function to load state from AsyncStorage
const loadState = async (): Promise<ProfileState | undefined> => {
  try {
    const serializedState = await AsyncStorage.getItem("profileState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Create store with loaded state and persistence middleware
export const createStoreWithPersistence = async () => {
  const persistedState = await loadState();
  return configureStore({
    reducer: {
      profile: profileSlice.reducer,
    },
    preloadedState: {
      profile: persistedState || initialState,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(persistMiddleware),
  });
};

// Define the store type
export type AppStore = Awaited<ReturnType<typeof createStoreWithPersistence>>;

// Define RootState and AppDispatch types
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export default createStoreWithPersistence;
