import { ChangeDetectionStrategy, Component, EventEmitter, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prompt-editor',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './prompt-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromptEditorComponent {
  isLoading = input.required<boolean>();
  generate = output<string>();
  
  prompt = signal<string>('Create a simple HTML page with a blue button that says "Click Me!". When the button is clicked, it shows an alert that says "Hello World!". Include some modern CSS for styling the button and centering the content.');

  onGenerateClick(): void {
    if (this.prompt().trim() && !this.isLoading()) {
      this.generate.emit(this.prompt());
    }
  }
}