import { AuthEffects } from '../features/auth/auth.effects';
import { CallEffects } from '../features/calls/call.effects';
import { ChatEffects } from '../features/chat/chat.effects';
import { PresenceEffects } from '../features/presence/presence.effects';
import { RoomEffects } from '../features/rooms/room.effects';

export const appEffects = [
  AuthEffects,
  // ChatEffects,
  // CallEffects,
  // RoomEffects,
  // PresenceEffects
];
