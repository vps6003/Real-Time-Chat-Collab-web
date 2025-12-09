import { AuthEffects } from '../feature/auth/auth.effects';
import { CallEffects } from '../feature/calls/call.effects';
import { ChatEffects } from '../feature/chat/chat.effects';
import { PresenceEffects } from '../feature/presence/presence.effects';
import { RoomEffects } from '../feature/rooms/room.effects';

export const appEffects = [AuthEffects, ChatEffects, CallEffects, RoomEffects, PresenceEffects];
