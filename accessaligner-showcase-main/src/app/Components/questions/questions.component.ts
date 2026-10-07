import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: "app-questions",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./questions.component.html",
  styleUrl: "./questions.component.css",
})
export class QuestionsComponent {
  questions1 = [
    {
      question: "Les aligneurs sont-ils vraiment invisibles ?",
      responce: "Placeholder content for this question, which is intended to",
      id: "question1",
    },
    {
      question: "Quelle est la durée moyenne du traitement ?",
      responce: "Placeholder content for this question, which is intended to",
      id: "question2",
    },
    {
      question: "Les aligneurs Access Aligner sont-ils adaptés à mon cas ?",
      responce: "Placeholder content for this question, which is intended to",
      id: "question3",
    },
    {
      question: "Que se passe-t-il si je perds un aligneur ?",
      responce: "Placeholder content for this question, which is intended to",
      id: "question4",
    },
    {
      question: "Puis-je manger et boire avec mes aligneurs ?",
      responce: "Placeholder content for this question, which is intended to",
      id: "question5",
    },
    {
      question: "Est-ce que les aligneurs sont confortables à porter ?",
      responce: "Placeholder content for this question, which is intended to",
      id: "question6",
    },
  ];
  questions2 = [
    {
      question: "Dois-je porter les aligneurs toute la journée ?",
      responce: "Placeholder content for this question, which is intended to",
      id: "question7",
    },
    {
      question: "Comment nettoyer mes aligneurs ?",
      responce: "Placeholder content for this question, which is intended to",
      id: "question8",
    },
    {
      question: "Les aligneurs affectent-ils ma parole ?",
      responce: "Placeholder content for this question, which is intended to",
      id: "question9",
    },
    {
      question: "Puis-je pratiquer des sports avec mes aligneurs ?",
      responce: "Placeholder content for this question, which is intended to",
      id: "question10",
    },
    {
      question: "Les aligneurs peuvent-ils endommager mes dents ?",
      responce: "Placeholder content for this question, which is intended to",
      id: "question11",
    },
    {
      question: "Que faire si mes aligneurs ne s'ajustent pas correctement ?",
      responce: "Placeholder content for this question, which is intended to",
      id: "question12",
    },
  ];
}
