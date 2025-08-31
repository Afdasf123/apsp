import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeminiService } from './services/gemini.service';
import { PromptEditorComponent } from './components/prompt-editor/prompt-editor.component';
import { CodeViewerComponent } from './components/code-viewer/code-viewer.component';

interface Collaborator {
  id: string;
  name: string;
  avatarUrl: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, PromptEditorComponent, CodeViewerComponent],
  providers: [GeminiService],
})
export class AppComponent {
  generatedCode = signal<string>('');
  isLoading = signal<boolean>(false);
  error = signal<string>('');
  collaborators = signal<Collaborator[]>([
    { id: '1', name: 'Alex', avatarUrl: 'https://i.pravatar.cc/40?u=alex@example.com' },
    { id: '2', name: 'Maria', avatarUrl: 'https://i.pravatar.cc/40?u=maria@example.com' },
    { id: '3', name: 'John', avatarUrl: 'https://i.pravatar.cc/40?u=john@example.com' },
  ]);

  constructor(private geminiService: GeminiService) {}

  inviteCollaborator(): void {
    alert('In a real app, this would open a dialog to invite a team member.');
  }

  async handleGenerate(prompt: string): Promise<void> {
    if (!prompt || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.generatedCode.set('');
    this.error.set('');

    try {
      const result = await this.geminiService.generateCode(prompt);
      this.generatedCode.set(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      this.error.set(`Failed to generate code: ${errorMessage}`);
      console.error(e);
    } finally {
      this.isLoading.set(false);
    }
  }
}