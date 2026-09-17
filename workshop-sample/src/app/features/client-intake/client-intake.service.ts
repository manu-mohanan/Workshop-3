export interface IntakeData {
  firstName: string;
  lastName: string;
  dateOfBirth: string; // ISO date, e.g. "1990-05-12"
}

/**
 * Validates a new client intake record.
 *
 * Pattern to follow (see CLAUDE.md): one class, one responsibility, pure
 * function in -> errors out, no hidden state.
 */
export class ClientIntakeService {
  validate(data: IntakeData): string[] {
    const errors: string[] = [];

    if (!data.firstName?.trim()) {
      errors.push('firstName is required');
    }
    if (!data.lastName?.trim()) {
      errors.push('lastName is required');
    }
    if (!data.dateOfBirth?.trim()) {
      errors.push('dateOfBirth is required');
    }

    return errors;
  }
}
