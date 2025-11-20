import { Injectable, inject } from '@angular/core';

import { User } from '../models/user.model';
import { DateUtilsService } from '../../../shared/services/date-utils.service';

@Injectable({
  providedIn: 'root',
})
export class UserPresentationService {
  private dateUtils = inject(DateUtilsService);

  isNewUser(user: User): boolean {
    return this.dateUtils.isCurrentMonth(user.createdAt);
  }

  formatDate(dateString: string): string {
    return this.dateUtils.formatDate(dateString);
  }
}
