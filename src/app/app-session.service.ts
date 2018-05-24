import { Injectable } from '@angular/core';

import { User } from './types/user';

@Injectable()
export class AppSessionService {
  user: User;

  constructor() { }

}
