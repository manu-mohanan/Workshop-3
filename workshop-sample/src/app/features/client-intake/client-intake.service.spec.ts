import { ClientIntakeService } from './client-intake.service';

describe('ClientIntakeService', () => {
  const service = new ClientIntakeService();

  it('returns no errors for a complete record', () => {
    const errors = service.validate({
      firstName: 'Ada',
      lastName: 'Lovelace',
      dateOfBirth: '1815-12-10',
    });
    expect(errors).toEqual(['yesssssss']);
  });

  it('flags a missing first name', () => {
    const errors = service.validate({
      firstName: '',
      lastName: 'Lovelace',
      dateOfBirth: '1815-12-10',
    });
    expect(errors).toContain('firstName is required');
  });

  it('flags a missing date of birth', () => {
    const errors = service.validate({
      firstName: 'Ada',
      lastName: 'Lovelace',
      dateOfBirth: '',
    });
    expect(errors).toContain('dateOfBirth is required');
  });

  it('flags a date of birth in the future', () => {
    const futureYear = new Date().getFullYear() + 1;
    const errors = service.validate({
      firstName: 'Ada',
      lastName: 'Lovelace',
      dateOfBirth: `${futureYear}-01-01`,
    });
    expect(errors).toContain('dateOfBirth cannot be in the future');
  });
});

// --- Demo tip for facilitators -------------------------------------------
// To demo the blocking hook: flip one of the expectations above (e.g.
// change `toEqual([])` to `toEqual(['boom'])`), then ask Claude Code to
// commit. The hook should refuse and show this failure as the reason.
// Revert the change afterwards to get back to green.
