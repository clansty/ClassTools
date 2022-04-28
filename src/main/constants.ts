import path from 'path';
import { app } from 'electron';

export const STATIC_PATH = path.join(app.getAppPath(), 'static');
