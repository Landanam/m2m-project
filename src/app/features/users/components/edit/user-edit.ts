import { Component, inject, DestroyRef, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UserBusinessService } from '../../services/user-business.service';
import { CreateUserRequest, User } from '../../models/user.model';
import { LoggerService } from '../../../../core/services/logger.service';

@Component({
  selector: 'app-user-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.html',
  styleUrl: './user-edit.scss',
})
export class UserEditComponent {
  private fb = inject(FormBuilder);
  private destroyRef = inject(DestroyRef);
  private userBusinessService = inject(UserBusinessService);
  private logger = inject(LoggerService);

  visible = input.required<boolean>();
  user = input<User | null>(null);

  close = output<void>();
  userUpdated = output<User>();

  userForm: FormGroup = this.fb.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/)
      ]
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+([ '-][a-zA-Z]+)*$/)
      ]
    ],
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],
  });

  constructor() {
    effect(() => {
      const user = this.user();
      if (user) {
        this.userForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          password: user.password,
        });
      }
    });
  }

  protected onClose(): void {
    this.userForm.reset();
    this.close.emit();
  }

  protected onSave(): void {
    const currentUser = this.user();

    if (this.userForm.valid && currentUser) {
      this.userBusinessService
        .processUserUpdate(currentUser, this.userForm.value as CreateUserRequest)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (updatedUser) => {
            this.userUpdated.emit(updatedUser);
            this.onClose();
          },
          error: (error: unknown) => {
            this.logger.error('Failed to update user', error);
          },
        });
    }
  }
}
