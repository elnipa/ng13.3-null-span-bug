import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProblemComponent<T extends Record<string, unknown>> {
  a?: string;
  b?: string;

  constructor() {}
}
