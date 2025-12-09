import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from '../feature/auth/auth.reducer';
import { callReducer } from '../feature/calls/call.reducer';
import { chatReducer } from '../feature/chat/chat.reducer';
import { roomReducer } from '../feature/rooms/room.reducer';
import { presenceReducer } from '../feature/presence/presence.reducer';

export const appReducer = {
  auth: authReducer,
  calls: callReducer,
  chat: chatReducer,
  rooms: roomReducer,
  presence: presenceReducer,
};
