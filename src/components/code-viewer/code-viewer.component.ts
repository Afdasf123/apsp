import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-code-viewer',
  standalone: true,
  imports: [],
  templateUrl: './code-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeViewerComponent {
  code = input.required<string>();
  isLoading = input.required<boolean>();
  hasError = input.required<boolean>();
  errorMessage = input<string>('');
  
  copyButtonText = signal<'Copy Code' | 'Copied!'>('Copy Code');

  copyCode() {
    if (this.code()) {
      navigator.clipboard.writeText(this.code()).then(() => {
        this.copyButtonText.set('Copied!');
        setTimeout(() => this.copyButtonText.set('Copy Code'), 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy code to clipboard.');
      });
    }
  }

  runCode() {
    alert('"Run Code" button clicked. In a real application, this would execute the code in a sandboxed environment.');
  }

  saveSnippet() {
    alert('"Save Snippet" button clicked. This would save the code to your personal library.');
  }
}