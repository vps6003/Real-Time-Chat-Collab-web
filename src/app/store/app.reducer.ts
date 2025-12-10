import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from '../features/auth/auth.reducer';
import { callReducer } from '../features/calls/call.reducer';
import { chatReducer } from '../features/chat/chat.reducer';
import { roomReducer } from '../features/rooms/room.reducer';
import { presenceReducer } from '../features/presence/presence.reducer';

export const appReducer = {
  auth: authReducer,
  calls: callReducer,
  chat: chatReducer,
  rooms: roomReducer,
  presence: presenceReducer,
};
