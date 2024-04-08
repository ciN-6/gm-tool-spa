import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-character-card-section',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './character-card-simple-list-section.component.html',
  styleUrl: './character-card-simple-list-section.component.scss'
})
export class CharacterCardSimpleListSectionComponent implements OnInit {
  ngOnInit(): void {
  }

  @Input() sectionName!: string;
  @Input() items!: string[];




}
